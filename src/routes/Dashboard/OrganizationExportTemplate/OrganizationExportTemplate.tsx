import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { databaseFields } from '../../../utils/database';

interface OrganizationExportTemplateProps extends RouteComponentProps {
  organization?: string;
}

export default class OrganizationExportTemplate extends Component<
OrganizationExportTemplateProps
> {
  createCheckboxes = () => {
    return databaseFields.map(el => {
      return (
        <StyledCheckboxDiv key={el}>
          <label htmlFor={el}>
            <input type="checkbox" id={el} name={el} value="" />
            {el}
          </label>
        </StyledCheckboxDiv>
      );
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
