import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import OrganizationList from './OrganizationList';

storiesOf('OrganizationList', module).add('OrganizationList Component', () => (
  <ThemeProvider theme={mainTheme}>
    <OrganizationList />
  </ThemeProvider>
));
