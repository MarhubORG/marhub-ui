import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../types/interfaces';
import { Organization } from '../../../redux/actions/dashboard';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import Select, { Option } from '../../../components/Forms/Select/Select';
import {
  MARHUB_ADMIN,
  MARHUB_USER,
  ADMIN,
  USER,
} from '../../../auth/permissionTypes';

const roles = [MARHUB_ADMIN, MARHUB_USER, ADMIN, USER];

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

  createOrganizationOptions = (): Option[] => {
    return this.props.organizations.map(el => {
      return {
        value: `${el.id}`,
        name: el.organisation.name,
      };
    });
  };

  createRolesOptions = (): Option[] => {
    return roles.map(el => {
      return {
        value: el,
        name: el,
      };
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
        <Select
          options={this.createOrganizationOptions()}
          labelName="Select Organization:"
          selected=""
        />
        <Select
          options={this.createRolesOptions()}
          labelName="Select Role:"
          selected=""
        />
        <Label htmlFor="isDisabled">
          Account is Disabled:
          <input type="checkbox" id="isDisabled" name="isDisabled" />
        </Label>
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

const Label = styled.label`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;

export default connect(mapStateToProps)(UnconnectedUserNew);
