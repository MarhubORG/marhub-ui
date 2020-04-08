import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { databaseFields } from '../../../utils/database';
import { RootState } from '../../../types/interfaces';
import { Organization } from '../../../redux/actions/dashboard';

interface OrganizationExportTemplateProps extends RouteComponentProps {
  organization?: string;
  organizations: Organization[];
}

interface OrganizationExportTemplateState {
  checked?: object;
}

export class UnconnectedOrganizationExportTemplate extends Component<
OrganizationExportTemplateProps,
OrganizationExportTemplateState
> {
  constructor(props: OrganizationExportTemplateProps) {
    super(props);
    this.state = {
      checked: {},
    };
  }

  componentDidMount() {
    this.props.organizations.map(el => {
      if (el.organisation.name === this.props.organization) {
        // @ts-ignore
        el.organisation.visibleFields.map(field => {
          this.setState({
            [field]: true,
          });
        });
      }
    });
  }

  createCheckboxes = () => {
    return databaseFields.map(el => {
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

  submitFields = () => {
    const myFields = this.state;
    const keys = Object.keys(myFields);
    const checkedFields: string[] = [];
    keys.map(el => {
      // @ts-ignore
      if (myFields[el] === true) {
        checkedFields.push(el);
      }
    });
  };

  toggleCheckbox = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    // @ts-ignore
    const checked = this.state[name];
    this.setState({
      [name]: !checked,
    });
  };

  render(): JSX.Element {
    return (
      <Layout>
        <StyledHeader>{this.props.organization} Template</StyledHeader>
        <StyledButton type="button" onClick={this.submitFields}>
          Submit
        </StyledButton>
        <form>
          <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
          <br />
        </form>
      </Layout>
    );
  }
}

const CheckboxesLayout = styled.div`
  max-height: 50vh;
`;

const StyledHeader = styled.h1``;

const StyledCheckboxDiv = styled.div`
  padding: 0.1rem 0;
`;

const Layout = styled.div`
  padding-left: 2rem;
`;

const StyledButton = styled.button`
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  height: 2rem;
  width: 5rem;
  margin-bottom: 0.5rem;
`;

export interface MapStateToProps {
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations } = state.dashboardReducer;
  return { organizations };
}

export default connect(mapStateToProps)(UnconnectedOrganizationExportTemplate);
