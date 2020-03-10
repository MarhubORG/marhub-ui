import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';

const CoverDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoverImage = styled.img`
  width: 90%;
`;

const COVER_SOURCE = `${process.env.PUBLIC_URL}cover.jpg`;

export default function Home(props: RouteComponentProps): JSX.Element {
  return (
    <CoverDiv>
      <CoverImage src={COVER_SOURCE} alt="Cover" />
    </CoverDiv>
  );
}
