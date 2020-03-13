import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import {
  LoginAction,
  login,
  LoginRedirectingAction,
  loginRedirecting,
} from '../../../redux/actions/index';
import { mainTheme } from '../../../styles/themes';
import { UnconnectedLogin } from './Login';
import { initialState } from '../../../redux/reducers/registration';

storiesOf('Login', module).add('Login Component', () => (
  <ThemeProvider theme={mainTheme}>
    <UnconnectedLogin
      registration={initialState}
      login={(): LoginAction => login('email', 'password')}
      loginRedirecting={(): LoginRedirectingAction => loginRedirecting()}
    />
  </ThemeProvider>
));
