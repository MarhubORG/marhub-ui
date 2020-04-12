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
import { getHeaders } from '../../../utils/excel';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyProps {
  arr: string[];
}
function Row(props: React.PropsWithChildren<MyProps>): JSX.Element {
  function stringsToTds(arr: string[]): JSX.Element[] {
    return arr.map(el => {
      return <td key={el}>{el}</td>;
    });
  }
  return <tr>{stringsToTds(props.arr)}</tr>;
}

interface IrapDownloadProps extends RouteComponentProps {
  exportingIrapData(data: object): ExportingIrapDataAction;
  apiReducer: ApiState;
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

  getColumns = () => {
    const { apiReducer } = this.props;
    return getHeaders(apiReducer.irapState).map(el => {
      return <th key={el.key}>{el.header}</th>;
    });
  };

  getRows = () => {
    const { apiReducer } = this.props;
    const rows = apiReducer.irapState;
    const headers = getHeaders(apiReducer.irapState);
    const arr = [];
    for (let x = 0; x < rows.length; x++) {
      const rowArray = [];
      for (let y = 0; y < 90; y++) {
        const { header } = headers[y];
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const value = rows[x][header] ? rows[x][header] : '';
        rowArray.push(JSON.stringify(value));
      }
      arr.push(<Row key={x} arr={rowArray} />);
    }
    return arr;
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
        <Button onClick={this.handleClick}>Download IRAP Data</Button>
        <div>
          <h1>Table</h1>
          <StyledTable>
            <thead>
              <tr>{this.getColumns()}</tr>
            </thead>
            <tbody>{this.getRows()}</tbody>
          </StyledTable>
        </div>
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

const StyledTable = styled.table`
  border: 1px solid black;
  th,
  td {
    border: 1px solid black;
  }
`;
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
)(UnconnectedIrapDownload);
