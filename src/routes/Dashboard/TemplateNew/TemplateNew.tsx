import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import TextInput from '../../../components/Forms/TextInput/TextInput';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';
import { RootState } from '../../../types/interfaces';
import { titleize, databaseFieldsNameMap } from '../../../utils/database';
import {
  CreateTemplateAction,
  createTemplate,
  Template,
  Organization,
  DeleteTemplateRedirectAction,
  deleteTemplateRedirect,
} from '../../../redux/actions/dashboard';

interface NewTemplateProps {
  createTemplate(payload: Template): CreateTemplateAction;
  myOrganization: string;
  organizations: Organization[];
  templateMessage?: string;
  deleteTemplateRedirect(): DeleteTemplateRedirectAction;
}
interface NewOrganizationState {
  name: string;
  message: string;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedNewTemplate extends Component<
  NewTemplateProps,
  NewOrganizationState
> {
  /* eslint-enable @typescript-eslint/indent */

  constructor(props: NewTemplateProps) {
    super(props);
    this.state = {
      name: '',
      message: '',
    };
  }

  componentDidUpdate(): void {
    const message = 'Successfully created new template';
    if (this.props.templateMessage === message) {
      this.props.deleteTemplateRedirect();
      navigate('/dashboard/templates/');
    }
  }

  getMyOrganization = (): Organization | null => {
    const { myOrganization, organizations } = this.props;
    for (let x = 0; x < organizations.length; x++) {
      if (`${organizations[x].id}` === myOrganization) {
        return organizations[x];
      }
    }
    return null;
  };

  createCheckboxes = () => {
    const myOrg = this.getMyOrganization();
    if (myOrg !== null) {
      return myOrg.organisation.visibleFields.sort().map(el => {
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
    }
    return null;
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
    if (this.state.name.length === 0) {
      this.setState({ message: 'Please add a name.' });
    } else {
      this.props.createTemplate({
        name: this.state.name,
        fields: Object.keys(this.state).filter(e => e !== 'name'),
      });
    }
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>New Template</h1>
        <PullLeft>
          <ErrorMessage message={this.state.message} />
          <ErrorMessage message={this.props.templateMessage} />
        </PullLeft>
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

const PullLeft = styled.div`
  margin-left: -2.8rem;
`;

const CheckboxesLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 50vh;
  .thirds {
    width: 32%;
  }
`;

const StyledButton = styled.button`
  height: 2rem;
  width: 8rem;
  border-radius: 5px;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  font-size: 0.9rem;
`;

const Layout = styled.div`
  padding: 1rem 2rem;
`;

const StyledCheckboxDiv = styled.div`
  padding: 0.1rem 0;
`;

export interface MapStateToProps {
  myOrganization: string;
  organizations: Organization[];
  templateMessage: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { myOrganization } = state.registration;
  const { organizations, templateMessage } = state.dashboardReducer;
  return { myOrganization, organizations, templateMessage };
}

export interface MapDispatchToProps {
  createTemplate(params: Template): CreateTemplateAction;
  deleteTemplateRedirect(): DeleteTemplateRedirectAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    createTemplate: (payload: Template): CreateTemplateAction =>
      dispatch(createTemplate(payload)),
    deleteTemplateRedirect: (): DeleteTemplateRedirectAction =>
      dispatch(deleteTemplateRedirect()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedNewTemplate);
