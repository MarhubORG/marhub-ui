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

interface Props {
  fetchOrganizations(): void;
  organizations?: Organization[];
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
    return <div>{this.createOrganizationList()}</div>;
  }
}

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
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations } = state.dashboardReducer;
  return { organizations };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedOrganizationList);
