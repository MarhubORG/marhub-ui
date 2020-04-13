import React, { Component } from 'react';

export default class TableauDashboard extends Component {
  componentDidMount(): void {
    const refreshes = localStorage.getItem('refreshes');
    if (!refreshes) {
      window.location.reload();
      localStorage.setItem('refreshes', 'true');
    }
  }

  componentWillUnmount(): void {
    localStorage.setItem('refreshes', '');
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Tableau1</h1>
        {DashboardObject()}
      </div>
    );
  }
}

export function DashboardObject(): JSX.Element {
  return (
    <div
      className="tableauPlaceholder"
      style={{ width: 1366, height: 850, border: '1px solid black' }}
    >
      <object className="tableauViz" width="1366" height="850">
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
      </object>
    </div>
  );
}
