import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../types/interfaces';
import {
  Organization,
  fetchOrganizations,
  FetchOrganizationsAction,
} from '../../../redux/actions/dashboard';

interface TemplateListProps {
  myOrganization: string;
  organizations: Organization[];
  fetchOrganizations(): FetchOrganizationsAction;
}

class UnconnectedTemplateList extends Component<TemplateListProps> {
  componentDidMount(): void {
    this.props.fetchOrganizations();
  }

  getMyOrganization = (): Organization | null => {
    const { myOrganization, organizations } = this.props;
    for (let x = 0; x < organizations.length; x++) {
      if (`${organizations[x].id}` === myOrganization) {
        return organizations[x];
      }
    }
    return null;
  };

  render(): JSX.Element {
    return <div>TemplateList</div>;
  }
}

export interface MapStateToProps {
  myOrganization: string;
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { myOrganization } = state.registration;
  const { organizations } = state.dashboardReducer;
  return { myOrganization, organizations };
}

export interface MapDispatchToProps {
  fetchOrganizations(): FetchOrganizationsAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedTemplateList);
