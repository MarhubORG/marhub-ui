import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import {
  SignupAction,
  signup,
  SignupRedirectingAction,
  signupRedirecting,
} from '../../../redux/actions/index';
import { mainTheme } from '../../../styles/themes';
import { UnconnectedSignup as Signup } from './Signup';

storiesOf('Signup', module).add('Signup Component', () => (
  <ThemeProvider theme={mainTheme}>
    <Signup
      signup={(): SignupAction => signup('name', 'org', 'email', 'password')}
      signupRedirecting={(): SignupRedirectingAction => signupRedirecting()}
    />
  </ThemeProvider>
));
