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
  irapUuidSearchText: string;
  data: object[];
  emailText: string;
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
      irapUuidSearchText: '',
      data: [],
      emailText: '',
    };
  }

  componentDidMount(): void {
    this.setState({ data: this.props.apiReducer.irapState });
  }

  // static getDerivedStateFromProps(
  //   props: IrapDownloadProps,
  //   state: IrapDownloadState
  // ) {
  //   if (props.apiReducer.irapState !== state.data) {
  //     return {
  //       data: props.apiReducer.irapState,
  //     };
  //   }
  //   return null;
  // }

  componentDidUpdate(
    prevProps: IrapDownloadProps,
    prevState: IrapDownloadState
  ) {
    if (prevProps.apiReducer.irapState !== this.props.apiReducer.irapState) {
      console.log('here');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ data: this.props.apiReducer.irapState });
    }
    console.log('here2');
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

  handleUniqueSearchTextChange = (irapUuidSearchText: string): void => {
    this.setState({ irapUuidSearchText });
  };

  handleEmailTextChange = (emailText: string): void => {
    this.setState({ emailText });
  };

  handleSessionClick = (): void => {
    const { data, irapUuidSearchText } = this.state;
    const updatedData = data.filter(el => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return el.textitSessionId.includes(irapUuidSearchText);
    });
    this.setState({ data: updatedData });
  };

  handleEmailClick = (): void => {
    const { data, emailText } = this.state;
    const updatedData = data.filter(el => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      console.log(el.email_address1);
      console.log(emailText);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return el.email_address1 && el.email_address1.includes(emailText);
    });
    console.log({ updatedData });
    this.setState({ data: updatedData });
  };

  calculateData = () => {
    console.log(this.props.apiReducer.irapState);
    console.log(this.state.data);
  };

  render(): JSX.Element {
    const { startDate, endDate } = this.state;
    this.updateEndDate();
    this.calculateData();
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
          <div>
            <input
              type="text"
              onChange={e => this.handleUniqueSearchTextChange(e.target.value)}
              value={this.state.irapUuidSearchText}
            />
            <button type="button" onClick={this.handleSessionClick}>
              Search Unique ID
            </button>
          </div>
          <div>
            <input
              type="text"
              value={this.state.emailText}
              onChange={e => this.handleEmailTextChange(e.target.value)}
            />
            <button type="button" onClick={this.handleEmailClick}>
              Search Email
            </button>
          </div>
        </div>
        <Table data={this.state.data} />
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
