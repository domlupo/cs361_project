import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { includes } from 'lodash';
import API from '../../apis/API';
import Header, { HeaderPadding } from '../Navigation/Header';
import UserListItem from './UserListItem';
import './UserList.css';
import SearchBar from '../SearchSection/SearchBar';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    API.instance.get('/user').then((res) => {
      setUsers(res.data);
      setUserData(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const searchQuery = searchTerm.toLowerCase();
    const newUsers = userData.filter(
      (user) =>
        includes(user.email, searchQuery) ||
        includes(user.firstName, searchQuery) ||
        includes(user.lastName, searchQuery),
    );
    setUsers(newUsers);
  }, [searchTerm]);

  const renderData = () => {
    if (loading) return <ReactLoading color="#e26d5c" />;
    return (
      <>
        {users.map((user) => (
          <UserListItem user={user} key={user.userID} />
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <Header>
        <SearchBar onInputChange={onInputChange} />
      </Header>
      <HeaderPadding />
      <div className="UserList">{renderData()}</div>
    </div>
  );
}

export default UserList;
