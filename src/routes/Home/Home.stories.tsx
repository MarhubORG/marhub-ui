import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import Home from './Home';

storiesOf('Home', module).add('Home Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Home />
  </ThemeProvider>
));
