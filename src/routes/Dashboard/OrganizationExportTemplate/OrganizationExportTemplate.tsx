import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { databaseFields } from '../../../utils/database';

interface OrganizationExportTemplateProps extends RouteComponentProps {
  organization?: string;
}

interface OrganizationExportTemplateState {
  checked: object;
}

export default class OrganizationExportTemplate extends Component<
OrganizationExportTemplateProps,
OrganizationExportTemplateState
> {
  constructor(props: OrganizationExportTemplateProps) {
    super(props);
    this.state = {
      checked: {},
    };
  }

  createCheckboxes = () => {
    return databaseFields.map(el => {
      // @ts-ignore
      const checked = this.state.checked[el];
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
    // @ts-ignore
    const checked = this.state.checked[name];
    this.setState({
      checked: { ...this.state.checked, [name]: !checked },
    });
  };

  render(): JSX.Element {
    return (
      <div>
        <StyledHeader>{this.props.organization} Template</StyledHeader>
        <form>
          <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
          <br />
        </form>
      </div>
    );
  }
}

const CheckboxesLayout = styled.div`
  max-height: 50vh;
  padding-left: 2rem;
`;

const StyledHeader = styled.h1`
  padding-left: 2rem;
`;

const StyledCheckboxDiv = styled.div`
  padding: 0.1rem 0;
`;
