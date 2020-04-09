import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React, { Component } from 'react';
import {
  login,
  LoginAction,
  loginRedirecting,
  LoginRedirectingAction,
} from '../../../redux/actions/index';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';
import { RootState, RegistrationState } from '../../../types/interfaces';

interface LoginProps extends RouteComponentProps {
  login(email: string, password: string): LoginAction;
  registration: RegistrationState;
  loginRedirecting(): LoginRedirectingAction;
}

interface LoginState {
  email: string;
  password: string;
}

export class UnconnectedLogin extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount(): void {
    if (
      this.props.registration.isLoggedIn &&
      this.props.navigate !== undefined
    ) {
      this.props.navigate('/dashboard');
    }
  }

  componentDidUpdate(): void {
    if (
      this.props.registration.loginRedirect &&
      this.props.navigate !== undefined
    ) {
      this.props.loginRedirecting();
      this.props.navigate('/dashboard');
    }
  }

  onEmailChange = (email: string): void => {
    this.setState({ email });
  };

  onPasswordChange = (password: string): void => {
    this.setState({ password });
  };

  handleButtonClick = (): void => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render(): JSX.Element {
    return (
      <Layout>
        <Container>
          <div>
            <Header>Login</Header>
          </div>
          <ErrorMessage message={this.props.registration.error} />
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
            <Button
              type="submit"
              disabled={this.props.registration.loading}
              onClick={this.handleButtonClick}
            >
              Login
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
  background-color: ${({ theme }): string => theme.white};
  border-radius: 0.2rem;
  margin: 2rem 3rem;
  min-width: 90%;
  min-height: 65vh;
  box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);

  @media (max-width: 768px) {
    margin: 0rem 0rem;
    min-height: 75vh;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-family: Open Sans, sans-serif;
`;

const Button = styled.button`
  margin-top: 2rem;
  align-self: center;
  height: 2.4rem;
  width: 20rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
  border: none;
`;

const Container = styled.div`
  margin-top: -5rem;
`;

export interface MapDispatchToProps {
  login(email: string, password: string): LoginAction;
  loginRedirecting(): LoginRedirectingAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    loginRedirecting: (): LoginRedirectingAction =>
      dispatch(loginRedirecting()),
    login: (email: string, password: string): LoginAction =>
      dispatch(login(email, password)),
  };
}

export interface MapStateToProps {
  registration: RegistrationState;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { registration } = state;
  return { registration };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);
