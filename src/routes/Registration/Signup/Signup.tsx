import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { Dispatch } from 'redux';

import { connect } from 'react-redux';
import {
  Action,
  RootState,
  RegistrationState,
} from '../../../types/interfaces';
import { signup, signupRedirecting } from '../../../redux/actions/index';

interface SignupProps extends RouteComponentProps {
  signup(
    name: string,
    organization: string,
    email: string,
    password: string
  ): Action;
  signupRedirecting(): Action;
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

  render(): JSX.Element {
    const { name, organization, email, password } = this.state;
    return (
      <Layout>
        <Container>
          <div>
            <Header>Signup</Header>
          </div>
          <Errors>
            {this.props.registration !== undefined &&
              this.props.registration.error}
          </Errors>
          <div>
            <Label htmlFor="name">Name:</Label>
            <TextInput
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e): void => this.setState({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="organization">Organization:</Label>
            <TextInput
              type="text"
              placeholder="Organization"
              name="organization"
              value={organization}
              onChange={(e): void =>
                this.setState({ organization: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <TextInput
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e): void => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e): void =>
                this.setState({ password: e.target.value })
              }
            />
          </div>
          <div>
            <Button
              type="submit"
              onClick={(): Action =>
                this.props.signup(name, organization, email, password)
              }
            >
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

const TextInput = styled.input`
  height: 2rem;
  min-width: 18rem;
  max-width: 18rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #edf1f7;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
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

const Errors = styled.div`
  padding: 1rem 0rem;
  width: 20rem;
`;

export interface MapDispatchToProps {
  signupRedirecting(): Action;
  signup(
    name: string,
    organization: string,
    email: string,
    password: string
  ): Action;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    signupRedirecting: (): Action => dispatch(signupRedirecting()),
    signup: (
      name: string,
      organization: string,
      email: string,
      password: string
    ): Action => dispatch(signup(name, organization, email, password)),
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
