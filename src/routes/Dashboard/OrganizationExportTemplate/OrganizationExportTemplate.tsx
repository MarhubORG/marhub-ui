import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface OrganizationExportTemplate extends RouteComponentProps {
  organization?: string;
}
export default function OrganizationExportTemplate(
  props: OrganizationExportTemplate
): JSX.Element {
  return <div>{props.organization} Template</div>;
}
