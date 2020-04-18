import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  CreateOrganizationAction,
  createOrganization,
} from '../../../redux/actions/dashboard';
import TextInput from '../../../components/Forms/TextInput/TextInput';

interface NewOrganizationProps {
  message?: string;
  createOrganization(name: string): CreateOrganizationAction;
}

interface NewOrganizationState {
  name: string;
}

class UnconnectedNewOrganization extends Component<
  NewOrganizationProps,
  NewOrganizationState
> {
  constructor(props: NewOrganizationProps) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = (name: string): void => {
    this.setState({ name });
  };

  handleClick = (): void => {
    this.props.createOrganization(this.state.name);
  };

  render(): JSX.Element {
    return (
      <Layout>
        <div>{this.props.message}</div>
        <h1>New Organization</h1>
        <form>
          <TextInput
            htmlFor="name"
            labelText="Name:"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <StyledButton
            type="button"
            disabled={this.state.name.length <= 0}
            onClick={this.handleClick}
          >
            Submit
          </StyledButton>
        </form>
      </Layout>
    );
  }
}

const StyledButton = styled.button`
  height: 2rem;
  width: 8rem;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
`;

const Layout = styled.div`
  padding: 1rem 2rem;
`;

export interface MapDispatchToProps {
  createOrganization(name: string): CreateOrganizationAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    createOrganization: (name: string): CreateOrganizationAction =>
      dispatch(createOrganization(name)),
  };
}

export default connect(null, mapDispatchToProps)(UnconnectedNewOrganization);
