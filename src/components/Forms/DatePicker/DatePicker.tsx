import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';

export type DatePickerType = Date | Date[];

interface DatePickerProps {
  onChange(date: DatePickerType): void;
  value: DatePickerType;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class MarhubDatePicker extends Component<DatePickerProps> {
  render(): JSX.Element {
    return (
      <StyledDatePicker
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

const StyledDatePicker = styled(DatePicker)`
  margin: 1rem;
  border-radius: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  border: 0px red;
  color: ${({ theme }): string => theme.white};
  input {
    color: ${({ theme }): string => theme.white};
  }
  input::placeholder {
    color: ${({ theme }): string => theme.white};
  }
  padding: 0.5rem 1rem;
  .react-date-picker__wrapper {
    border: 0px;
  }
  svg {
    stroke: ${({ theme }): string => theme.white};
  }
`;
