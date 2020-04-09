import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { databaseFields } from '../../../utils/database';
import { RootState } from '../../../types/interfaces';
import {
  Organization,
  updateOrganization,
  UpdateOrganizationAction,
  UpdateOrganizationPayload,
} from '../../../redux/actions/dashboard';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';

interface OrganizationExportTemplateProps extends RouteComponentProps {
  organization?: string;
  organizations: Organization[];
  updateOrganization(
    action: UpdateOrganizationPayload
  ): UpdateOrganizationAction;
  errorMessage: string;
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

  componentDidMount(): void {
    this.props.organizations.map(el => {
      if (el.organisation.name === this.props.organization) {
        el.organisation.visibleFields.map(field => {
          this.setState({
            [field]: true,
          });
        });
      }
    });
  }

  getOrganizationId = (): number | undefined => {
    const { organizations } = this.props;
    let id;
    organizations.map(el => {
      if (el.organisation.name === this.props.organization) {
        id = el.id;
      }
    });
    return id;
  };

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

  submitFields = (): void => {
    const myFields = this.state;
    const keys = Object.keys(myFields);
    const checkedFields: string[] = [];
    keys.map(el => {
      // @ts-ignore
      if (myFields[el] === true) {
        checkedFields.push(el);
      }
    });
    const id = this.getOrganizationId();
    if (id !== undefined) {
      this.props.updateOrganization({
        id,
        organization: {
          visible_fields: checkedFields,
        },
      });
    }
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
    const { errorMessage } = this.props;
    return (
      <Layout>
        {errorMessage && (
          <StyledErrorMessage>
            <ErrorMessage message={errorMessage} />
          </StyledErrorMessage>
        )}
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

const StyledErrorMessage = styled.div`
  /* margin-left: -9rem; */
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
  errorMessage: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations, errorMessage } = state.dashboardReducer;
  return { organizations, errorMessage };
}

export interface MapDispatchToProps {
  updateOrganization(
    action: UpdateOrganizationPayload
  ): UpdateOrganizationAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    updateOrganization: (
      action: UpdateOrganizationPayload
    ): UpdateOrganizationAction => dispatch(updateOrganization(action)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedOrganizationExportTemplate);
