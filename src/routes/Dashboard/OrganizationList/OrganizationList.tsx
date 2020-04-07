import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  FetchOrganizationsAction,
  fetchOrganizations,
} from '../../../redux/actions/dashboard';

const organizations = [
  { name: 'Irap', path: '/Irap' },
  { name: 'UNHCR', path: '/UNHCR' },
];

interface Props {
  fetchOrganizations(): void;
}

export class UnconnectedOrganizationList extends Component<Props> {
  componentDidMount(): void {
    this.props.fetchOrganizations();
  }

  createOrganizationList = (): JSX.Element[] => {
    return organizations.map(el => {
      return (
        <StyledLink
          key={el.path}
          to={`/dashboard/organizations/organization-export-template${el.path}`}
        >
          {el.name}
        </StyledLink>
      );
    });
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

export default connect(null, mapDispatchToProps)(UnconnectedOrganizationList);
