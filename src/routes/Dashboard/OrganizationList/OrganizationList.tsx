import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  FetchOrganizationsAction,
  fetchOrganizations,
  Organization,
} from '../../../redux/actions/dashboard';
import { RootState } from '../../../types/interfaces';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';

interface Props {
  fetchOrganizations(): void;
  organizations?: Organization[];
  errorMessage: string;
}

export class UnconnectedOrganizationList extends Component<Props> {
  componentDidMount(): void {
    this.props.fetchOrganizations();
  }

  createOrganizationList = (): JSX.Element[] | null => {
    const { organizations } = this.props;
    if (organizations !== undefined) {
      return organizations.map(el => {
        return (
          <StyledLink
            key={el.organisation.name}
            to={`/dashboard/organizations/organization-export-template/${el.organisation.name}`}
          >
            {el.organisation.name}
          </StyledLink>
        );
      });
    }
    return null;
  };

  render(): JSX.Element {
    const { errorMessage } = this.props;
    return (
      <div>
        {errorMessage && (
          <StyledErrorMessage>
            <ErrorMessage message={errorMessage} />
          </StyledErrorMessage>
        )}
        <StyledLinkInverted to="/dashboard/organizations/new">
          Create New Organization
        </StyledLinkInverted>
        {this.createOrganizationList()}
      </div>
    );
  }
}

const StyledErrorMessage = styled.div`
  margin-left: -8rem;
`;

const StyledLink = styled(Link)`
  background-color: ${({ theme }): string => theme.white};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.primaryColor};
  font-weight: 600;
`;

const StyledLinkInverted = styled(Link)`
  background-color: ${({ theme }): string => theme.primaryColor};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.white};
  font-weight: 600;
`;

export interface MapDispatchtoProps {
  fetchOrganizations(): FetchOrganizationsAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchtoProps {
  return {
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
  };
}

export interface MapStateToProps {
  organizations: Organization[];
  errorMessage: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations, errorMessage } = state.dashboardReducer;
  return { organizations, errorMessage };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedOrganizationList);
