import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ApiState } from '../../../types/interfaces';
import { getHeaders } from '../../../utils/excel';

interface MyProps {
  rowStrings: string[];
}

function TableRow(props: React.PropsWithChildren<MyProps>): JSX.Element {
  function stringsToTds(arr: string[]): JSX.Element[] {
    return arr.map(el => {
      return <td key={uuidv4()}>{el}</td>;
    });
  }
  return <tr>{stringsToTds(props.rowStrings)}</tr>;
}

interface IrapTableProps {
  data: object[];
}
export default class Table extends PureComponent<IrapTableProps> {
  getColumns = (): JSX.Element[] => {
    const { data } = this.props;
    return getHeaders(data).map(el => {
      return <th key={el.key}>{el.header}</th>;
    });
  };

  getRows = (): JSX.Element[] => {
    const { data } = this.props;
    const rows = data;
    const headers = getHeaders(data);
    const arr = [];
    for (let x = 0; x < rows.length; x++) {
      const rowArray = [];
      for (let y = 0; y < headers.length; y++) {
        const { header } = headers[y];
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const value = rows[x][header] ? rows[x][header] : '';
        rowArray.push(JSON.stringify(value).slice(1, -1));
      }
      arr.push(<TableRow key={uuidv4()} rowStrings={rowArray} />);
    }
    return arr;
  };

  render(): JSX.Element {
    return (
      <div>
        <StyledTable>
          <thead>
            <tr>{this.getColumns()}</tr>
          </thead>
          <tbody>{this.getRows()}</tbody>
        </StyledTable>
      </div>
    );
  }
}

const StyledTable = styled.table`
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    white-space: nowrap;
  }
`;
