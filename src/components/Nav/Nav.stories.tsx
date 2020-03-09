import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import Nav from './nav';

storiesOf('Nav', module).add('Nav Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Nav />
  </ThemeProvider>
));
