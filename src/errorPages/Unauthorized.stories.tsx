import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../styles/themes';
import Unauthorized from './Unauthorized';

storiesOf('Unauthorized', module).add('Unauthorized Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Unauthorized />
  </ThemeProvider>
));
