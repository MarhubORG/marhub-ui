import React, { Component } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  databaseFields,
  notNullFields,
  titleize,
  databaseFieldsNameMap,
} from '../../../utils/database';
import { RootState } from '../../../types/interfaces';
import {
  Organization,
  updateOrganization,
  UpdateOrganizationAction,
  UpdateOrganizationPayload,
  deleteOrganization,
  DeleteOrganizationAction,
} from '../../../redux/actions/dashboard';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';

interface OrganizationExportTemplateProps extends RouteComponentProps {
  organization?: string;
  organizations: Organization[];
  updateOrganization(
    action: UpdateOrganizationPayload
  ): UpdateOrganizationAction;
  deleteOrganization(id: number): DeleteOrganizationAction;
  errorMessage: string;
}

interface RowObject {
  [key: string]: boolean;
}

interface OrganizationExportTemplateState {
  checked?: RowObject;
}
/* eslint-disable @typescript-eslint/indent */
export class UnconnectedOrganizationExportTemplate extends Component<
  OrganizationExportTemplateProps,
  OrganizationExportTemplateState
> {
  /* eslint-enable @typescript-eslint/indent */

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
        if (el.organisation.nonNullFields !== undefined) {
          el.organisation.nonNullFields.map(field => {
            this.setState({
              checked: {
                [field]: true,
              },
            });
          });
        }
      }
    });
  }

  componentDidUpdate(): void {
    if (this.props.errorMessage === 'DELETE_ORGANIZATION_SUCCESS') {
      navigate('/dashboard/organizations/');
    }
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

  createNotNullCheckboxes = (): JSX.Element[] => {
    return notNullFields.map(el => {
      let checked = false;
      if (this.state.checked !== undefined) {
        checked = this.state.checked[el];
      }

      return (
        <StyledCheckboxDiv key={el}>
          <label htmlFor={el}>
            <input
              type="checkbox"
              id={el}
              name={el}
              value=""
              checked={checked}
              onChange={(e): void => this.toggleNonNullCheckbox(e)}
            />
            {el}
          </label>
        </StyledCheckboxDiv>
      );
    });
  };

  createCheckboxes = (): JSX.Element[] => {
    return databaseFields.sort().map(el => {
      let displayName = titleize(el);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const c = databaseFieldsNameMap[el];
      if (c !== undefined) {
        displayName = c;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const checked = this.state[el];
      return (
        <StyledCheckboxDiv key={el} className="thirds">
          <label htmlFor={el}>
            <input
              type="checkbox"
              id={el}
              name={el}
              value=""
              checked={checked}
              onChange={(e): void => this.toggleCheckbox(e)}
            />
            {displayName}
          </label>
        </StyledCheckboxDiv>
      );
    });
  };

  submitFields = (): void => {
    let { checked } = this.state;
    if (checked === undefined) checked = {};
    const myFields = this.state;
    const keys = Object.keys(myFields);
    const nonNullKeys = Object.keys(checked);
    const checkedFields: string[] = [];
    const checkedNonNullFields: string[] = [];
    keys.map(el => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (myFields[el] === true) {
        checkedFields.push(el);
      }
    });

    nonNullKeys.map(el => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (checked[el] === true) {
        checkedNonNullFields.push(el);
      }
    });
    const id = this.getOrganizationId();
    if (id !== undefined) {
      this.props.updateOrganization({
        id,
        organization: {
          visible_fields: checkedFields,
          non_null_fields: checkedNonNullFields,
        },
      });
    }
  };

  toggleCheckbox = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const checked = this.state[name];
    this.setState({
      [name]: !checked,
    });
  };

  toggleNonNullCheckbox = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const checked = this.state.checked[name];
    this.setState({
      checked: {
        [name]: !checked,
      },
    });
  };

  handleDeleteClick = (): void => {
    const id = this.getOrganizationId();
    if (id !== undefined) {
      this.props.deleteOrganization(id);
    }
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
        <StyledHeader>{this.props.organization} Permitted Fields</StyledHeader>
        <StyledButton type="button" onClick={this.submitFields}>
          Submit
        </StyledButton>
        <DeleteButton type="button" onClick={this.handleDeleteClick}>
          Delete
        </DeleteButton>
        <form>
          <Label>Non-null fields</Label>
          <CheckboxesLayout>{this.createNotNullCheckboxes()}</CheckboxesLayout>
          <Label>Permitted fields</Label>
          <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
          <br />
        </form>
      </Layout>
    );
  }
}

const CheckboxesLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 50vh;
  .thirds {
    width: 32%;
  }
`;
const Label = styled.span`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
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
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled.button`
  font-size: 0.8rem;
  background-color: #ff471a;
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
  deleteOrganization(id: number): DeleteOrganizationAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    updateOrganization: (
      action: UpdateOrganizationPayload
    ): UpdateOrganizationAction => dispatch(updateOrganization(action)),
    deleteOrganization: (id: number): DeleteOrganizationAction =>
      dispatch(deleteOrganization(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedOrganizationExportTemplate);
