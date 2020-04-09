import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import { UnconnectedOrganizationList } from './OrganizationList';
import { fetchOrganizations } from '../../../redux/actions/dashboard';

storiesOf('OrganizationList', module).add('OrganizationList Component', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedOrganizationList
      fetchOrganizations={fetchOrganizations}
      errorMessage=""
    />
  </ThemeProvider>
));
