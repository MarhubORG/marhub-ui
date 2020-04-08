import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import { UnconnectedOrganizationExportTemplate } from './OrganizationExportTemplate';

storiesOf('OrganizationExportTemplate', module).add(
  'OrganizationExportTemplate Component',
  () => (
    <ThemeProvider theme={mainTheme}>
      <UnconnectedOrganizationExportTemplate organizations={[]} />
    </ThemeProvider>
  )
);
