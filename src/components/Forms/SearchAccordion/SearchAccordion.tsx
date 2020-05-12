import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchAccordionProps {
  children: JSX.Element;
  accordionText: string;
}
export default function SearchAccordion(
  props: SearchAccordionProps
): JSX.Element {
  const [toggle, setToggle] = useState(false);
  return (
    <Layout>
      <Label
        onClick={(): void => setToggle(!toggle)}
        onKeyDown={(): void => setToggle(!toggle)}
      >
        {props.accordionText}
      </Label>
      <div>{toggle && props.children}</div>
    </Layout>
  );
}

const Layout = styled.div`
  margin-left: 1rem;
`;

const Label = styled.span`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;
