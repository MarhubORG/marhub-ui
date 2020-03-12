import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import ErrorMessage from './ErrorMessage';

storiesOf('ErrorMessage', module).add('ErrorMessage Component', () => (
  <ThemeProvider theme={mainTheme}>
    <ErrorMessage message="Incorrect Password" />
  </ThemeProvider>
));
