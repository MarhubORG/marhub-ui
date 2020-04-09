import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import DatePicker from './DatePicker';

const date = new Date();
storiesOf('DatePicker', module).add('DatePicker Component', () => (
  <ThemeProvider theme={mainTheme}>
    <DatePicker value={date} onChange={(): void => {}} />
  </ThemeProvider>
));
