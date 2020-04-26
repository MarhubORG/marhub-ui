import React, { Component } from 'react';
import styled from 'styled-components';

const REFRESHES = 'REFRESHES';

const StyledObject = styled.object`
  height: 75vh;
  width: 100vw;
`;
export default class TableauDashboard extends Component {
  componentDidMount(): void {
    const refreshes = localStorage.getItem(REFRESHES);
    if (!refreshes) {
      window.location.reload();
      localStorage.setItem(REFRESHES, 'true');
    }
  }

  componentWillUnmount(): void {
    localStorage.setItem(REFRESHES, '');
  }

  render(): JSX.Element {
    return <div>{DashboardObject()}</div>;
  }
}

export function DashboardObject(): JSX.Element {
  return (
    <div className="tableauPlaceholder" style={{ border: '1px solid black' }}>
      <StyledObject className="tableauViz">
        <param
          name="host_url"
          value="https%3A%2F%2Feu-west-1a.online.tableau.com%2F"
        />
        <param name="embed_code_version" value="3" />{' '}
        <param
          name="site_root"
          value="&#47;t&#47;marhubinternationaldashboard"
        />
        <param name="name" value="Dashboard_draft&#47;CreateTime" />
        <param name="tabs" value="yes" />
        <param name="toolbar" value="yes" />
        <param name="showAppBanner" value="false" />
      </StyledObject>
    </div>
  );
}
