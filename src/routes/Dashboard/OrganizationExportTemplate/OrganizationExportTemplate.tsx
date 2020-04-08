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
    console.log('cwm props', this.props);
    this.props.organizations.map(el => {
      if (el.organisation.name === this.props.organization) {
        console.log('fff', el.organisation);
        // @ts-ignore
        el.organisation.visibleFields.map(field => {
          // @ts-ignore
          const checked = this.state.checked[field];
          this.setState({
            [field]: !checked,
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

  toggleCheckbox = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    const { name } = target;
    // @ts-ignore
    const checked = this.state.checked[name];
    this.setState({
      [name]: !checked,
    });
    console.log('stateee', this.state);
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

export interface MapStateToProps {
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { organizations } = state.dashboardReducer;
  return { organizations };
}

export default connect(mapStateToProps)(UnconnectedOrganizationExportTemplate);
