import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchUsers, FetchUsersAction } from '../../../redux/actions/users';
import { RootState } from '../../../types/interfaces';
import Table from '../IrapDownload/Table';

interface UserListProps {
  fetchUsers(): void;
  users: object[];
}

class UnconnectedUserList extends Component<UserListProps> {
  componentDidMount(): void {
    this.props.fetchUsers();
  }

  render(): JSX.Element {
    console.log('props', this.props);
    return (
      <div>
        <h1>Users</h1>
        <Table data={this.props.users} />
      </div>
    );
  }
}

export interface MapStateToProps {
  users: object[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { users } = state.userReducer;
  return { users };
}

export interface MapDispatchToProps {
  fetchUsers(): FetchUsersAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    fetchUsers: (): FetchUsersAction => dispatch(fetchUsers()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedUserList);
