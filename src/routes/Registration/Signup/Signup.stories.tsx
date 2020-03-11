import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import { UnconnectedSignup as Signup } from './Signup';

const simpleAction = { type: '' };

storiesOf('Signup', module).add('Signup Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Signup
      signup={() => {
        return simpleAction;
      }}
    />
  </ThemeProvider>
));
