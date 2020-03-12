import React from 'react';
import styled from 'styled-components';

interface Props {
  message?: string;
}

export default function ErrorMessage(props: Props): JSX.Element | null {
  return props.message ? <Layout>{props.message}</Layout> : null;
}

const Layout = styled.div`
  margin-top: 1rem;
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
  height: 2rem;
  min-width: 18rem;
  max-width: 18rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: red;
  border: 1px solid #edf1f7;
`;
