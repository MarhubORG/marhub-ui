import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { start } from 'repl';
import { FaTruckMonster } from 'react-icons/fa';
import DatePicker, {
  DatePickerType,
} from '../../components/Forms/DatePicker/DatePicker';
import { RootState } from '../../types/interfaces';
import Unauthorized from '../../errorPages/Unauthorized/Unauthorized';
import {
  ExportingIrapDataAction,
  exportingIrapData,
} from '../../redux/actions/api';

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
  exportingIrapData(): ExportingIrapDataAction;
}

interface DashboardState {
  startDate: DatePickerType;
  endDate: DatePickerType;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedDashboard extends Component<
  DashboardProps,
  DashboardState
> {
  /* eslint-enable @typescript-eslint/indent */
  constructor(props: DashboardProps) {
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
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
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
    if (this.props.isLoggedIn !== true) {
      return <Unauthorized />;
    }
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

export interface MapStateToProps {
  isLoggedIn: boolean;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn } = state.registration;
  return { isLoggedIn };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDashboard);
