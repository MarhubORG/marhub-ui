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
  componentDidMount() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.props.onChange(null);
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
  margin: 1rem;
  border-radius: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
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
