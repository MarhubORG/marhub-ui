import React, { Component } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  CreateOrganizationAction,
  createOrganization,
  createOrganizationRedirect,
  CreateOrganizationRedirectAction,
} from '../../../redux/actions/dashboard';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import { RootState } from '../../../types/interfaces';

interface NewOrganizationProps {
  message?: string;
  createOrganization(name: string): CreateOrganizationAction;
  createOrganizationRedirect(): CreateOrganizationRedirectAction;
  redirectToVisibleFields: string;
}

interface NewOrganizationState {
  name: string;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedNewOrganization extends Component<
  NewOrganizationProps,
  NewOrganizationState
> {
  /* eslint-enable @typescript-eslint/indent */

  constructor(props: NewOrganizationProps) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (name: string): void => {
    this.setState({ name });
  };

  handleClick = (): void => {
    this.props.createOrganization(this.state.name);
  };

  render(): JSX.Element {
    if (this.props.redirectToVisibleFields.length > 0) {
      this.props.createOrganizationRedirect();
      navigate(
        `/dashboard/organizations/organization-export-template/${this.props.redirectToVisibleFields}`
      );
    }
    return (
      <Layout>
        <div>{this.props.message}</div>
        <h1>New Organization</h1>
        <form>
          <TextInput
            htmlFor="name"
            labelText="Name:"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <StyledButton
            type="button"
            disabled={this.state.name.length <= 0}
            onClick={this.handleClick}
          >
            Submit
          </StyledButton>
        </form>
      </Layout>
    );
  }
}

const StyledButton = styled.button`
  height: 2rem;
  width: 8rem;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
`;

const Layout = styled.div`
  padding: 1rem 2rem;
`;

export interface MapDispatchToProps {
  createOrganization(name: string): CreateOrganizationAction;
  createOrganizationRedirect(): CreateOrganizationRedirectAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    createOrganization: (name: string): CreateOrganizationAction =>
      dispatch(createOrganization(name)),
    createOrganizationRedirect: (): CreateOrganizationRedirectAction =>
      dispatch(createOrganizationRedirect()),
  };
}

export interface MapStateToProps {
  redirectToVisibleFields: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { redirectToVisibleFields } = state.dashboardReducer;
  return { redirectToVisibleFields };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedNewOrganization);
