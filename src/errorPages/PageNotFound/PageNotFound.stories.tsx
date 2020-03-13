import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../styles/themes';
import PageNotFound from './PageNotFound';

storiesOf('PageNotFound', module).add('PageNotFound Component', () => (
  <ThemeProvider theme={mainTheme}>
    <PageNotFound />
  </ThemeProvider>
));
