import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../../types/interfaces';
import { Organization } from '../../../redux/actions/dashboard';

interface TemplateEditProps {
  name?: string;
  myOrganization: string;
  organizations: Organization[];
}

interface TemplateEditState {
  message: string;
}

export class UnconnectedTemplateEdit extends Component<
  TemplateEditProps,
  TemplateEditState
> {
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

  render() {
    return (
      <Layout>
        <h1>Template: {this.props.name}</h1>
        <CheckboxesLayout>{this.createCheckboxes()}</CheckboxesLayout>
      </Layout>
    );
  }
}

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

export default connect(mapStateToProps)(UnconnectedTemplateEdit);
