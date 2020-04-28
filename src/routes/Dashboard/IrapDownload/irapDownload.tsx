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
import { getHeaders, createNewExcelFile } from '../../../utils/excel';
import Select from '../../../components/Forms/Select/Select';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';
import {
  Organization,
  fetchOrganizations,
  FetchOrganizationsAction,
} from '../../../redux/actions/dashboard';

interface IrapDownloadProps extends RouteComponentProps {
  exportingIrapData(data: object): ExportingIrapDataAction;
  apiReducer: ApiState;
  myOrganization: string;
  organizations: Organization[];
  fetchOrganizations(): FetchOrganizationsAction;
}

interface IrapDownloadState {
  startDate: DatePickerType;
  endDate: DatePickerType;
  irapUuidSearchText: string;
  data: object[];
  emailText: string;
  selectedTemplate: string;
  message: string;
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
      selectedTemplate: '',
      message: '',
    };
  }

  componentDidMount(): void {
    this.setState({ data: this.props.apiReducer.irapState });
    this.props.fetchOrganizations();
  }

  componentDidUpdate(
    prevProps: IrapDownloadProps,
    prevState: IrapDownloadState
  ): void {
    if (prevProps.apiReducer.irapState !== this.props.apiReducer.irapState) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ data: this.props.apiReducer.irapState });
    }
  }

  handleEndDateChange = (endDate: DatePickerType): void => {
    this.setState({ endDate });
  };

  handleClick = (): object | null => {
    const { startDate, endDate, selectedTemplate } = this.state;
    if (selectedTemplate.length === 0) {
      this.setState({ message: 'Please choose a template.' });
      return null;
    }
    this.setState({ message: '' });
    return this.props.exportingIrapData !== undefined
      ? this.props.exportingIrapData({ startDate, endDate, selectedTemplate })
      : null;
  };

  getMyOrganization = (): Organization | null => {
    const { myOrganization, organizations } = this.props;
    for (let x = 0; x < organizations.length; x++) {
      if (`${organizations[x].id}` === myOrganization) {
        return organizations[x];
      }
    }
    return null;
  };

  getTemplateOptions = () => {
    const myOrg = this.getMyOrganization();
    if (myOrg !== null && myOrg.organisation.templates !== undefined) {
      const arr = [{ name: 'Full Template', value: 'Full Template' }];
      Object.keys(myOrg.organisation.templates).map(el => {
        arr.push({
          value: el,
          name: el,
        });
      });
      return arr;
    }
    return [];
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
      return el.email_address1 && el.email_address1.includes(emailText);
    });
    this.setState({ data: updatedData });
  };

  handleExcelClick = () => {
    const headers = getHeaders(this.props.apiReducer.irapState);
    const { data } = this.state;
    createNewExcelFile(data, headers);
  };

  templateOnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ selectedTemplate: event.target.value });
  };

  render(): JSX.Element {
    const { startDate, endDate } = this.state;
    this.updateEndDate();
    const dataExists = this.state.data.length > 0;
    const templateOptions = this.getTemplateOptions();
    return (
      <Layout>
        <ErrorMessage message={this.state.message} />
        <PushRight>
          <Select
            options={templateOptions}
            labelName="Select Template: *"
            defaultValue={this.state.selectedTemplate}
            onChange={this.templateOnChange}
          />
        </PushRight>
        <Label>From:</Label>
        <DatePicker value={startDate} onChange={this.handleStartDateChange} />
        <PullLeft>
          <Label>To:</Label>
        </PullLeft>
        <DatePicker value={endDate} onChange={this.handleEndDateChange} />
        <Button onClick={this.handleClick}>Search</Button>
        {dataExists && (
          <Button onClick={this.handleExcelClick}>Excel Download</Button>
        )}
        {dataExists && (
          <SearchLayout>
            <SearchInput
              type="text"
              onChange={e => this.handleUniqueSearchTextChange(e.target.value)}
              value={this.state.irapUuidSearchText}
              placeholder="Search Unique Id"
            />
            <SearchButton type="button" onClick={this.handleSessionClick}>
              Search Unique ID
            </SearchButton>
            <SearchInput
              type="text"
              value={this.state.emailText}
              onChange={e => this.handleEmailTextChange(e.target.value)}
              placeholder="Search Email"
            />
            <SearchButton type="button" onClick={this.handleEmailClick}>
              Search Email
            </SearchButton>
          </SearchLayout>
        )}
        <Table data={this.state.data} />
      </Layout>
    );
  }
}

export interface MapStateToProps {
  apiReducer: ApiState;
  myOrganization: string;
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { apiReducer } = state;
  const { myOrganization } = state.registration;
  const { organizations } = state.dashboardReducer;
  return {
    apiReducer,
    myOrganization,
    organizations,
  };
}

export interface MapDispatchToProps {
  exportingIrapData(data: object): ExportingIrapDataAction;
  fetchOrganizations(): FetchOrganizationsAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    exportingIrapData: (
      data: ExportingIrapDataPayload
    ): ExportingIrapDataAction => dispatch(exportingIrapData(data)),
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
  };
}

const SearchLayout = styled.div`
  padding: 1rem;
`;

const PushRight = styled.div`
  margin-left: 1rem;
`;

const SearchInput = styled.input`
  height: 1.5rem;
  font-size: 0.8rem;
`;

const SearchButton = styled.button`
  height: 1.5rem;
  margin-right: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
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
