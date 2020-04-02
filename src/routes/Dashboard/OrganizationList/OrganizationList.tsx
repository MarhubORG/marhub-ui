import React from 'react';
import { RouteComponentProps, Router, Link } from '@reach/router';
import styled from 'styled-components';

const organizations = [
  { name: 'Irap', path: '/Irap' },
  { name: 'UNHCR', path: '/UNHCR' },
];
export default function OrganizationList(): JSX.Element {
  function createOrganizationList(): JSX.Element[] {
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
  }
  return <div>{createOrganizationList()}</div>;
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
