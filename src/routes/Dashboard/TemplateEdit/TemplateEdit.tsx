import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../types/interfaces';
import {
  Organization,
  updateTemplate,
  Template,
  UpdateTemplateAction,
} from '../../../redux/actions/dashboard';

interface TemplateEditProps {
  name?: string;
  myOrganization: string;
  organizations: Organization[];
  updateTemplate(payload: Template): UpdateTemplateAction;
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
      return myOrg.organisation.visibleFields.map(el => {
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

  render() {
    console.log('props', this.props);
    return (
      <Layout>
        <h1>Template: {this.props.name}</h1>
        <Button onClick={this.handleClick}>Update</Button>
        <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
      </Layout>
    );
  }
}

const Button = styled.button`
  margin: 1rem;
  width: 10.6rem;
  height: 2rem;
  background-color: ${({ theme }): string => theme.primaryColor};
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
  max-height: 50vh;
`;

const StyledCheckboxDiv = styled.div`
  padding: 0.1rem 0;
`;

export interface MapStateToProps {
  myOrganization: string;
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { myOrganization } = state.registration;
  const { organizations } = state.dashboardReducer;
  return {
    myOrganization,
    organizations,
  };
}

export interface MapDispatchtoProps {
  updateTemplate(payload: Template): UpdateTemplateAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchtoProps {
  return {
    updateTemplate: (payload: Template): UpdateTemplateAction =>
      dispatch(updateTemplate(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedTemplateEdit);
