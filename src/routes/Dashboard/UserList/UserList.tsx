import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from '@reach/router';
import {
  fetchUsers,
  FetchUsersAction,
  User,
} from '../../../redux/actions/users';
import { RootState } from '../../../types/interfaces';

interface UserListProps {
  fetchUsers(): void;
  users: User[];
}

export class UnconnectedUserList extends Component<UserListProps> {
  componentDidMount(): void {
    this.props.fetchUsers();
  }

  createUserList = (): JSX.Element[] | null => {
    const { users } = this.props;
    if (users !== undefined) {
      return users.map(el => {
        return (
          <StyledLink key={el.id} to={`/dashboard/users/${el.id}`}>
            {el.email}
          </StyledLink>
        );
      });
    }
    return null;
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>Users</h1>
        <StyledLinkInverted to="/dashboard/users/new">
          Create New User
        </StyledLinkInverted>
        {this.createUserList()}
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin-left: 1rem;
`;

const StyledLink = styled(Link)`
  background-color: ${({ theme }): string => theme.white};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem 1rem 1rem 0;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.primaryColor};
  font-weight: 600;
`;

const StyledLinkInverted = styled(Link)`
  background-color: ${({ theme }): string => theme.primaryColor};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem 1rem 1rem 0;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.white};
  font-weight: 600;
`;

export interface MapStateToProps {
  users: User[];
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
