import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../types/interfaces';
import { Organization } from '../../../redux/actions/dashboard';

interface TemplateListProps {
  myOrganization: string;
  organizations: Organization[];
}

class UnconnectedTemplateList extends Component<TemplateListProps> {
  getMyOrganization = () => {
    const { myOrganization, organizations } = this.props;
    for (let x = 0; x < organizations.length; x++) {
      if (`${organizations[x].id}` === myOrganization) {
        return organizations[x];
      }
    }
    return null;
  };

  render() {
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

export default connect(mapStateToProps)(UnconnectedTemplateList);
