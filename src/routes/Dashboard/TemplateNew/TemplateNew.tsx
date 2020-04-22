import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';
import { RootState } from '../../../types/interfaces';
import { databaseFields } from '../../../utils/database';

interface NewOrganizationState {
  name: string;
  message: string;
}

/* eslint-disable @typescript-eslint/indent */
class UnconnectedNewOrganization extends Component<null, NewOrganizationState> {
  /* eslint-enable @typescript-eslint/indent */

  constructor(props: null) {
    super(props);
    this.state = {
      name: '',
      message: '',
    };
  }

  createCheckboxes = () => {
    return databaseFields.map(el => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const checked = this.state[el];
      return (
        <StyledCheckboxDiv key={el}>
          <label htmlFor={el}>
            <input
              type="checkbox"
              id={el}
              name={el}
              value=""
              checked={checked}
              onChange={(e): void => this.toggleCheckbox(e)}
            />
            {el}
          </label>
        </StyledCheckboxDiv>
      );
    });
  };

  toggleCheckbox = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const checked = this.state[name];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.setState({
      [name]: !checked,
    });
  };

  handleChange = (name: string): void => {
    this.setState({ name });
  };

  handleClick = () => {
    console.log('handleClick');
    if (this.state.name.length === 0) {
      this.setState({ message: 'Please add a name.' });
    }
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>New Template</h1>
        <ErrorMessage message={this.state.message} />
        <form>
          <StyledButton type="button" onClick={this.handleClick}>
            Submit
          </StyledButton>
          <TextInput
            htmlFor="name"
            labelText="Name:"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Span>Fields:</Span>
          <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
        </form>
      </Layout>
    );
  }
}

const Span = styled.span`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;

const CheckboxesLayout = styled.div`
  max-height: 50vh;
`;

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

const StyledCheckboxDiv = styled.div`
  padding: 0.1rem 0;
`;

export default connect(null, null)(UnconnectedNewOrganization);
