import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import Login from './Login';

storiesOf('Login', module).add('Login Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Login />
  </ThemeProvider>
));
