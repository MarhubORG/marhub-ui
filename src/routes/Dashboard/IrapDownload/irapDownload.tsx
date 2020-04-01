import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import DatePicker, {
  DatePickerType,
} from '../../../components/Forms/DatePicker/DatePicker';
import { RootState } from '../../../types/interfaces';
import {
  ExportingIrapDataAction,
  exportingIrapData,
} from '../../../redux/actions/api';

interface IrapDownloadProps extends RouteComponentProps {
  exportingIrapData(): ExportingIrapDataAction;
}

interface IrapDownloadState {
  startDate: DatePickerType;
  endDate: DatePickerType;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedIrapDownload extends Component<
  IrapDownloadProps,
  IrapDownloadState
> {
  /* eslint-enable @typescript-eslint/indent */
  constructor(props: IrapDownloadProps) {
    super(props);
    this.state = {
      startDate: this.oneWeekAgo(),
      endDate: new Date(),
    };
  }

  handleEndDateChange = (endDate: DatePickerType): void => {
    this.setState({ endDate });
  };

  handleClick = (): object | null => {
    return this.props.exportingIrapData !== undefined
      ? this.props.exportingIrapData()
      : null;
  };

  oneWeekAgo = (): Date => {
    const newDate = new Date();
    const date = newDate.getDate();
    newDate.setDate(date - 7);
    return newDate;
  };

  handleStartDateChange = (startDate: DatePickerType): void => {
    this.setState({ startDate });
  };

  updateEndDate = (): void => {
    const { startDate, endDate } = this.state;
    if (startDate > endDate) {
      const startDateToLocaleString = startDate.toLocaleString();
      const someDate = new Date(startDateToLocaleString);
      this.setState({ endDate: someDate });
    }
  };

  render(): JSX.Element {
    const { startDate, endDate } = this.state;
    this.updateEndDate();
    return (
      <Layout>
        <div>
          <Label>Start date:</Label>
          <DatePicker value={startDate} onChange={this.handleStartDateChange} />
        </div>
        <div>
          <Label>End date:</Label>
          <DatePicker value={endDate} onChange={this.handleEndDateChange} />
        </div>
        <Button onClick={(): object | null => this.handleClick}>
          Download IRAP Data
        </Button>
      </Layout>
    );
  }
}

export interface MapDispatchToProps {
  exportingIrapData(): ExportingIrapDataAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    exportingIrapData: (): ExportingIrapDataAction =>
      dispatch(exportingIrapData()),
  };
}

const Layout = styled.div`
  margin-top: 2rem;
`;

const Button = styled.button`
  margin: 1rem;
  width: 12rem;
  height: 3rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;

const Label = styled.label`
  display: block;
  margin-left: 4.7rem;
`;

export default connect(null, mapDispatchToProps)(UnconnectedIrapDownload);
