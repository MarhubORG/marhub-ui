import React from 'react';
import styled from 'styled-components';

interface Props {
  htmlFor: string;
  labelText: string;
  placeholder: string;
  name: string;
  value: string;
  onChange(message: string): void;
  password?: boolean;
}

function TextInput(props: Props): JSX.Element {
  return (
    <div>
      <Label htmlFor={props.htmlFor}>{props.labelText}</Label>
      <TextInputHTML
        type={props.password ? 'password' : 'text'}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={(e): void => props.onChange(e.target.value)}
      />
    </div>
  );
}

const TextInputHTML = styled.input`
  height: 2rem;
  min-width: 18rem;
  max-width: 18rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #edf1f7;
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

export default TextInput;
