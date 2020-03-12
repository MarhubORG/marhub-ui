import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { Dispatch } from 'redux';

import { connect } from 'react-redux';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';

import { RootState, RegistrationState } from '../../../types/interfaces';
import {
  signup,
  signupRedirecting,
  SignupAction,
  SignupRedirectingAction,
} from '../../../redux/actions/index';

interface SignupProps extends RouteComponentProps {
  signup(
    name: string,
    organization: string,
    email: string,
    password: string
  ): SignupAction;
  signupRedirecting(): SignupRedirectingAction;
  registration?: RegistrationState;
}

interface SignupState {
  name: string;
  organization: string;
  email: string;
  password: string;
}

export class UnconnectedSignup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      name: '',
      organization: '',
      email: '',
      password: '',
    };
  }

  componentDidUpdate(): void {
    if (
      this.props.registration !== undefined &&
      this.props.registration.redirect
    ) {
      if (this.props.navigate !== undefined) {
        this.props.signupRedirecting();
        this.props.navigate('/login');
      }
    }
  }

  onNameChange = (name: string): void => {
    this.setState({ name });
  };

  onOrgChange = (organization: string): void => {
    this.setState({ organization });
  };

  onEmailChange = (email: string): void => {
    this.setState({ email });
  };

  onPasswordChange = (password: string): void => {
    this.setState({ password });
  };

  handleButtonClick = (): void => {
    const { name, organization, email, password } = this.state;
    this.props.signup(name, organization, email, password);
  };

  render(): JSX.Element {
    const { name, organization, email, password } = this.state;
    return (
      <Layout>
        <Container>
          <div>
            <Header>Signup</Header>
          </div>
          {this.props.registration !== undefined && (
            <ErrorMessage message={this.props.registration.error} />
          )}
          <div>
            <TextInput
              htmlFor="name"
              labelText="Name:"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>
          <div>
            <TextInput
              htmlFor="organization"
              labelText="Organization:"
              placeholder="Organization"
              name="organization"
              value={this.state.organization}
              onChange={this.onOrgChange}
            />
          </div>
          <div>
            <TextInput
              htmlFor="email"
              labelText="Email:"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
          </div>
          <div>
            <TextInput
              htmlFor="password"
              labelText="Password:"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              password
            />
          </div>
          <div>
            <Button type="submit" onClick={this.handleButtonClick}>
              Signup
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.2rem;
  margin: 2rem 3rem;
  min-width: 90%;
  min-height: 65vh;
  overflow-y: scroll;
  box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);

  @media (max-width: 768px) {
    margin: 0rem 0rem;
    min-height: 75vh;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-family: Open Sans, sans-serif;
  margin-bottom: -0.5rem;
  padding-top: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  align-self: center;
  height: 2.4rem;
  width: 20rem;
  background-color: ${({ theme }): string => theme.disabledButtonBackground};
  color: ${({ theme }): string => theme.disabledButtonText};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
  border: none;
`;

const Container = styled.div`
  margin-top: -2rem;
  padding: 1rem 0rem;
`;

export interface MapDispatchToProps {
  signupRedirecting(): SignupRedirectingAction;
  signup(
    name: string,
    organization: string,
    email: string,
    password: string
  ): SignupAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    signupRedirecting: (): SignupRedirectingAction =>
      dispatch(signupRedirecting()),
    signup: (
      name: string,
      organization: string,
      email: string,
      password: string
    ): SignupAction => dispatch(signup(name, organization, email, password)),
  };
}

export interface MapStateToProps {
  registration: RegistrationState;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { registration } = state;
  return { registration };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedSignup);
