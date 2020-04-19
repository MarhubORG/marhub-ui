import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../types/interfaces';
import { Organization } from '../../../redux/actions/dashboard';
import TextInput from '../../../components/Forms/TextInput/TextInput';

interface UserEditProps {
  organizations: Organization[];
}

interface UserEditState {
  email: string;
  name: string;
}

class UnconnectedUserNew extends Component<UserEditProps, UserEditState> {
  constructor(props: UserEditProps) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  handleEmailChange = (email: string): void => {
    this.setState({ email });
  };

  handleNameChange = (name: string): void => {
    this.setState({ name });
  };

  createOrganizationOptions = () => {
    return this.props.organizations.map(el => {
      return (
        <option key={el.id} id={`${el.id}`} selected={el.id === 4}>
          {el.organisation.name}
        </option>
      );
    });
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>New User</h1>
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
        <select>{this.createOrganizationOptions()}</select>
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin: 1rem;
`;

export interface MapStateToProps {
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations } = state.dashboardReducer;
  return { organizations };
}

export default connect(mapStateToProps)(UnconnectedUserNew);
