import React, { Component } from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  name: string;
}

interface SelectProps {
  options: Option[];
  labelName: string;
  selected: string;
}
export default class Select extends Component<SelectProps> {
  createOptions = (): JSX.Element[] => {
    return this.props.options.map(el => {
      return (
        <StyledOption
          key={el.value}
          value={`${el.value}`}
          selected={el.value === this.props.selected}
        >
          {el.name}
        </StyledOption>
      );
    });
  };

  render(): JSX.Element {
    return (
      <div>
        <Label htmlFor={this.props.labelName}>{this.props.labelName}</Label>
        <StyledSelect id={this.props.labelName}>
          {this.createOptions()}
        </StyledSelect>
      </div>
    );
  }
}

const Label = styled.label`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;

const StyledSelect = styled.select`
  height: 2rem;
  min-width: 20.2rem;
  max-width: 20.2rem;
  border-radius: 0.2rem;
  font-size: 0.85rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #edf1f7;
`;

const StyledOption = styled.option`
  margin-left: 2rem;
`;
