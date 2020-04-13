import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import DatePicker, {
  DatePickerType,
} from '../../../components/Forms/DatePicker/DatePicker';
import {
  ExportingIrapDataAction,
  exportingIrapData,
  ExportingIrapDataPayload,
} from '../../../redux/actions/api';
import { ApiState, RootState } from '../../../types/interfaces';
import Table from './Table';

interface IrapDownloadProps extends RouteComponentProps {
  exportingIrapData(data: object): ExportingIrapDataAction;
  apiReducer: ApiState;
}

interface IrapDownloadState {
  startDate: DatePickerType;
  endDate: DatePickerType;
  emailSearchText: string;
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
      emailSearchText: '',
    };
  }

  handleEndDateChange = (endDate: DatePickerType): void => {
    this.setState({ endDate });
  };

  handleClick = (): object | null => {
    const { startDate, endDate } = this.state;
    return this.props.exportingIrapData !== undefined
      ? this.props.exportingIrapData({ startDate, endDate })
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

  handleEmailSearchTextChange = (emailSearchText: string): void => {
    this.setState({ emailSearchText });
  };

  render(): JSX.Element {
    const { startDate, endDate } = this.state;
    this.updateEndDate();
    return (
      <Layout>
        <Label>From:</Label>
        <DatePicker value={startDate} onChange={this.handleStartDateChange} />
        <PullLeft>
          <Label>To:</Label>
        </PullLeft>
        <DatePicker value={endDate} onChange={this.handleEndDateChange} />
        <Button onClick={this.handleClick}>Download IRAP Data</Button>
        <div>
          <h1>Search</h1>
          <input
            type="text"
            onChange={e => this.handleEmailSearchTextChange(e.target.value)}
            value={this.state.emailSearchText}
          />
          <button type="button">Search Email</button>
        </div>
        <Table data={this.props.apiReducer} />
      </Layout>
    );
  }
}

export interface MapStateToProps {
  apiReducer: ApiState;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { apiReducer } = state;
  return {
    apiReducer,
  };
}

export interface MapDispatchToProps {
  exportingIrapData(data: object): ExportingIrapDataAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    exportingIrapData: (
      data: ExportingIrapDataPayload
    ): ExportingIrapDataAction => dispatch(exportingIrapData(data)),
  };
}

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
  margin-left: 1rem;
  font-weight: 700;
`;

const Layout = styled.div`
  margin-top: 2rem;
`;

const PullLeft = styled.span`
  margin-left: -1rem;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedIrapDownload);
