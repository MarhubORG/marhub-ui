import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import { exportingIrapData } from '../../../redux/actions/api';
import { UnconnectedIrapDownload } from './irapDownload';
import { initialState } from '../../../redux/reducers/api';

storiesOf('IrapDownload', module).add(
  'IrapDownload Component when logged in',
  () => (
    <ThemeProvider theme={mainTheme}>
      <UnconnectedIrapDownload
        exportingIrapData={exportingIrapData}
        apiReducer={initialState}
      />
    </ThemeProvider>
  )
);
