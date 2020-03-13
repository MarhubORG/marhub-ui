import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import DatePicker, {
  DatePickerType,
} from '../../components/Forms/DatePicker/DatePicker';
import { RootState } from '../../types/interfaces';
import Unauthorized from '../../errorPages/Unauthorized';
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

const d = new Date();
d.setFullYear(2020);
d.setMonth(2);
d.setDate(1);

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedDashboard extends Component<
  DashboardProps,
  DashboardState
> {
  /* eslint-enable @typescript-eslint/indent */
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      startDate: d,
      endDate: d,
    };
  }

  handleStartDateChange = (startDate: DatePickerType): void => {
    this.setState({ startDate });
  };

  handleEndDateChange = (endDate: DatePickerType): void => {
    this.setState({ endDate });
  };

  handleClick = (): object | null => {
    return this.props.exportingIrapData !== undefined
      ? this.props.exportingIrapData()
      : null;
  };

  render(): JSX.Element {
    if (this.props.isLoggedIn !== true) {
      return <Unauthorized />;
    }
    const { startDate, endDate } = this.state;
    return (
      <div>
        <div>
          <p>Start date:</p>
          <DatePicker value={startDate} onChange={this.handleStartDateChange} />
        </div>
        <div>
          <p>End date:</p>
          <DatePicker value={endDate} onChange={this.handleEndDateChange} />
        </div>
        <Button onClick={(): object | null => this.handleClick}>
          Download IRAP Data
        </Button>
      </div>
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

const Button = styled.button`
  margin: 1rem;
  width: 12rem;
  height: 3rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: white;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDashboard);
