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
  User,
  editUser,
  EditUserAction,
  EditUserPayload,
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

interface UserEditProps {
  organizations: Organization[];
  fetchOrganizations(): void;
  users: User[];
  id?: string;
  editUser(data: EditUserPayload): EditUserAction;
  message: string;
}

interface UserEditState {
  email: string;
  name: string;
  password: string;
  selectedOrganization: string;
  role: string;
  isDisabled: boolean;
  id: number;
}

export class UnconnectedUserEdit extends Component<
  UserEditProps,
  UserEditState
> {
  constructor(props: UserEditProps) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      selectedOrganization: '',
      role: '',
      isDisabled: true,
      id: 0,
    };
  }

  componentDidMount(): void {
    this.props.fetchOrganizations();
    const user = this.getUserById();
    if (user !== undefined && user !== null) {
      if (user.profile.role === undefined) {
        this.setState({
          email: user.email,
          name: user.profile.name,
          isDisabled: user.isDisabled,
          selectedOrganization: user.profile.organisation,
          id: user.id,
        });
      } else {
        this.setState({
          email: user.email,
          name: user.profile.name,
          role: user.profile.role,
          isDisabled: user.isDisabled,
          selectedOrganization: user.profile.organisation,
          id: user.id,
        });
      }
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

  handleEmailChange = (email: string): void => {
    this.setState({ email });
  };

  handleNameChange = (name: string): void => {
    this.setState({ name });
  };

  handlePasswordChange = (password: string): void => {
    this.setState({ password });
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

  onButtonClick = () => {
    const {
      email,
      name,
      selectedOrganization,
      role,
      password,
      isDisabled,
      id,
    } = this.state;
    this.props.editUser({
      email,
      name,
      selectedOrganization,
      role,
      password,
      isDisabled,
      id,
    });
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>Edit {this.state.email}</h1>
        <ErrorMessage message={this.props.message} />
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
        <TextInput
          htmlFor="password"
          labelText="Password: *"
          placeholder="Enter a new password here"
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
        <button type="button" onClick={this.onButtonClick}>
          Edit User
        </button>
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin: 1rem;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;

export interface MapStateToProps {
  users: User[];
  organizations: Organization[];
  message: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { users, message } = state.userReducer;
  const { organizations } = state.dashboardReducer;
  return { users, organizations, message };
}

export interface MapDispatchtoProps {
  fetchOrganizations(): FetchOrganizationsAction;
  editUser(data: EditUserPayload): EditUserAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchtoProps {
  return {
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
    editUser: (data: EditUserPayload): EditUserAction =>
      dispatch(editUser(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedUserEdit);
