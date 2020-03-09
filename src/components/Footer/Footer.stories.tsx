import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import Footer from './Footer';

storiesOf('Footer', module).add('Footer Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Footer />
  </ThemeProvider>
));
