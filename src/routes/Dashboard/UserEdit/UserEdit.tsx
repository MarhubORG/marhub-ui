import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../types/interfaces';
import { User } from '../../../redux/actions/users';
import TextInput from '../../../components/Forms/TextInput/TextInput';

interface UserEditProps {
  users: User[];
  id?: string;
}

interface UserEditState {
  email: string;
  name: string;
}

class UnconnectedUserEdit extends Component<UserEditProps, UserEditState> {
  constructor(props: UserEditProps) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  componentDidMount(): void {
    const user = this.getUserById();
    if (user !== undefined && user !== null) {
      this.setState({ email: user.email });
    }
  }

  getUserById(): User | null {
    const { id, users } = this.props;
    if (id !== undefined) {
      // eslint-disable-next-line consistent-return
      const filtered = users.filter(el => {
        if (el.id === parseInt(id, 10)) return el;
      });
      return filtered[0];
    }
    return null;
  }

  handleEmailChange = (email: string): void => {
    this.setState({ email });
  };

  handleNameChange = (name: string): void => {
    this.setState({ name });
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>Edit {this.state.email}</h1>
        <TextInput
          htmlFor="name"
          labelText="Name:"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextInput
          htmlFor="email"
          labelText="Email:"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin: 1rem;
`;

export interface MapStateToProps {
  users: User[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { users } = state.userReducer;
  return { users };
}

export default connect(mapStateToProps)(UnconnectedUserEdit);
