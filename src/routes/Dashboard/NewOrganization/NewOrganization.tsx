import React from 'react';
import styled from 'styled-components';

interface NewOrganizationProps {
  message?: string;
}
export default function NewOrganization(
  props: NewOrganizationProps
): JSX.Element {
  return (
    <Layout>
      <div>{props.message}</div>
      <h1>New Organization</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input
            style={{ height: '1.7rem', width: '30rem', marginLeft: '1rem' }}
            type="text"
            id="name"
            name="name"
          />
        </label>
        <StyledButton type="submit">Submit</StyledButton>
      </form>
    </Layout>
  );
}

const StyledButton = styled.button`
  height: 2rem;
  width: 8rem;
  margin-left: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
`;

const Layout = styled.div`
  padding: 1rem 2rem;
`;
