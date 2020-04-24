import React from 'react';
import renderer from 'react-test-renderer';
import { UnconnectedNewTemplate } from './TemplateNew';
import { createTemplate } from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedNewTemplate
        organizations={[]}
        myOrganization="4"
        createTemplate={createTemplate}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
