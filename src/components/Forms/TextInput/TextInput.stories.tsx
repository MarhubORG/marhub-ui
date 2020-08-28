import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from '../../../styles/themes';
import TextInput from './TextInput';

// storiesOf('TextInput', module).add('TextInput Component', () => (
//   <ThemeProvider theme={mainTheme}>
//     <TextInput
//       htmlFor="organization"
//       labelText="Organization:"
//       placeholder="Organization"
//       name="organization"
//       value=""
//       onChange={(): void => {}}
//     />
//   </ThemeProvider>
// ));
