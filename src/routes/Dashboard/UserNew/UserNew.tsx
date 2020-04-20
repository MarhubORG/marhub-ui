import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { RootState } from '../../../types/interfaces';
import {
  FetchOrganizationsAction,
  fetchOrganizations,
  Organization,
} from '../../../redux/actions/dashboard';
import {
  createUser,
  CreateUserAction,
  CreateUserPayload,
} from '../../../redux/actions/users';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import Select, { Option } from '../../../components/Forms/Select/Select';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';

import {
  MARHUB_ADMIN,
  MARHUB_USER,
  ADMIN,
  USER,
} from '../../../auth/permissionTypes';

const roles = [USER, ADMIN, MARHUB_USER, MARHUB_ADMIN];

interface UserNewProps {
  organizations: Organization[];
  fetchOrganizations(): void;
  createUser(action: CreateUserPayload): CreateUserAction;
}

interface UserNewState {
  email: string;
  name: string;
  selectedOrganization: string;
  role: string;
  isDisabled: boolean;
  message: string;
  password: string;
}

class UnconnectedUserNew extends Component<UserNewProps, UserNewState> {
  constructor(props: UserNewProps) {
    super(props);
    this.state = {
      email: '',
      name: '',
      selectedOrganization: '',
      role: '',
      isDisabled: true,
      message: '',
      password: '',
    };
  }

  componentDidMount(): void {
    this.props.fetchOrganizations();
  }

  handleEmailChange = (email: string): void => {
    this.setState({ email });
  };

  handlePasswordChange = (password: string): void => {
    this.setState({ password });
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

  orgOnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ selectedOrganization: event.target.value });
  };

  roleOnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ role: event.target.value });
  };

  isDisabledChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { isDisabled } = this.state;
    this.setState({ isDisabled: !isDisabled });
  };

  handleCreateUser = () => {
    const {
      email,
      name,
      selectedOrganization,
      role,
      password,
      isDisabled,
    } = this.state;
    if (this.requiredFields()) {
      this.props.createUser({
        email,
        name,
        selectedOrganization,
        role,
        password,
        isDisabled,
      });
    }
  };

  requiredFields = (): boolean => {
    const { email, name, selectedOrganization, role, password } = this.state;
    const arr = [];
    if (email === '') {
      arr.push('email');
    }
    if (name === '') {
      arr.push('name');
    }
    if (selectedOrganization === '') {
      arr.push('organization');
    }
    if (role === '') {
      arr.push('role');
    }
    if (password === '') {
      arr.push('password');
    }
    if (arr.length > 0) {
      const message = `Please fill out the following fields: ${arr.join(', ')}`;
      this.setState({ message });
      return false;
    }
    return true;
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>New User</h1>
        <ErrorMessage message={this.state.message} />
        <TextInput
          htmlFor="name"
          labelText="Name: *"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextInput
          htmlFor="email"
          labelText="Email: *"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <TextInput
          htmlFor="password"
          labelText="Password: *"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <Select
          options={this.createOrganizationOptions()}
          labelName="Select Organization: *"
          defaultValue={this.state.selectedOrganization}
          onChange={this.orgOnChange}
        />
        <Select
          options={this.createRolesOptions()}
          labelName="Select Role: *"
          defaultValue={this.state.role}
          onChange={this.roleOnChange}
        />
        <Label htmlFor="isDisabled">
          Account is Disabled:
          <input
            type="checkbox"
            id="isDisabled"
            name="isDisabled"
            onChange={this.isDisabledChange}
            checked={this.state.isDisabled}
          />
        </Label>
        <button type="button" onClick={this.handleCreateUser}>
          Create New User
        </button>
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

export interface MapDispatchtoProps {
  fetchOrganizations(): FetchOrganizationsAction;
  createUser(data: CreateUserPayload): CreateUserAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchtoProps {
  return {
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
    createUser: (data: CreateUserPayload): CreateUserAction =>
      dispatch(createUser(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedUserNew);
