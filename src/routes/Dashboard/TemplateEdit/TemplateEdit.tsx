import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { Dispatch } from 'redux';
import { RootState } from '../../../types/interfaces';
import ErrorMessage from '../../../components/Forms/ErrorMessage/ErrorMessage';
import {
  Organization,
  updateTemplate,
  Template,
  UpdateTemplateAction,
  deleteTemplate,
  DeleteTemplateAction,
  deleteTemplateRedirect,
  DeleteTemplateRedirectAction,
} from '../../../redux/actions/dashboard';
import { titleize, databaseFieldsNameMap } from '../../../utils/database';

interface TemplateEditProps {
  name?: string;
  myOrganization: string;
  organizations: Organization[];
  updateTemplate(payload: Template): UpdateTemplateAction;
  deleteTemplate(payload: string): DeleteTemplateAction;
  templateMessage: string;
  deleteTemplateRedirect(): DeleteTemplateRedirectAction;
}

interface TemplateEditState {
  message: string;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedTemplateEdit extends Component<
  TemplateEditProps,
  TemplateEditState
> {
  /* eslint-enable @typescript-eslint/indent */
  constructor(props: TemplateEditProps) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    const template = this.getMyTemplate();
    if (template) {
      template.map((el: string) => {
        const obj = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        obj[el] = true;
        this.setState(obj);
      });
    }
  }

  componentDidUpdate() {
    if (this.props.templateMessage !== '') {
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

  getMyTemplate = () => {
    const myOrg = this.getMyOrganization();
    const templates = myOrg?.organisation?.templates;
    if (templates && this.props.name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return templates[this.props.name];
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

  handleClick = () => {
    const { name } = this.props;
    if (name) {
      const fields = Object.keys(this.state).filter(el => {
        return el !== 'message';
      });
      this.props.updateTemplate({ name, fields });
    }
  };

  handleDeleteClick = () => {
    const { name } = this.props;
    if (name) {
      this.props.deleteTemplate(name);
    }
  };

  render() {
    return (
      <Layout>
        <h1>Template: {this.props.name}</h1>
        <ErrorMessage message={this.props.templateMessage} />
        <Button onClick={this.handleClick}>Update</Button>
        <DeleteButton onClick={this.handleDeleteClick}>Delete</DeleteButton>
        <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
      </Layout>
    );
  }
}

const Button = styled.button`
  width: 8rem;
  height: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;

const DeleteButton = styled.button`
  width: 8rem;
  height: 2rem;
  background-color: #ff471a;
  color: ${({ theme }): string => theme.white};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;

const Layout = styled.div`
  padding: 0.5rem 1rem;
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
  return {
    myOrganization,
    organizations,
    templateMessage,
  };
}

export interface MapDispatchtoProps {
  updateTemplate(payload: Template): UpdateTemplateAction;
  deleteTemplate(payload: string): DeleteTemplateAction;
  deleteTemplateRedirect(): DeleteTemplateRedirectAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchtoProps {
  return {
    updateTemplate: (payload: Template): UpdateTemplateAction =>
      dispatch(updateTemplate(payload)),
    deleteTemplate: (payload: string): DeleteTemplateAction =>
      dispatch(deleteTemplate(payload)),
    deleteTemplateRedirect: (): DeleteTemplateRedirectAction =>
      dispatch(deleteTemplateRedirect()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedTemplateEdit);
