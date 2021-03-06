import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';

export type DatePickerType = Date | Date[] | undefined;

interface DatePickerProps {
  onChange(date: DatePickerType): void;
  value: DatePickerType;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class MarhubDatePicker extends Component<DatePickerProps> {
  componentDidMount(): void {
    this.props.onChange(undefined);
  }

  render(): JSX.Element {
    return (
      <StyledDatePicker
        value={this.props.value}
        onChange={this.props.onChange}
        showLeadingZeros={true}
      />
    );
  }
}

const StyledDatePicker = styled(DatePicker)`
  margin-left: 1rem;
  margin-top: 0.3rem;
  border-radius: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  padding: 0.2rem 0.5rem;

  input {
    color: ${({ theme }): string => theme.white};
  }
  input::placeholder {
    color: ${({ theme }): string => theme.white};
  }
  .react-date-picker__wrapper {
    border: 0px;
  }
  svg {
    stroke: ${({ theme }): string => theme.white};
  }
`;
