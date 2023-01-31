import React, { useState, useEffect } from 'react';
import UserList from './UserList';

export default function UserSearch() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = (searchText = '') => {
    fetch(`/api/users?username=${searchText}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setUsers);
        } else {
          res.json().then(console.log);
        }
      });
  }

  // performs a query for users with no search term first
  useEffect(fetchUsers, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetchUsers(search);
  }

  return (
    <section onSubmit={handleSubmit}>
      <form>
        <label htmlFor="search">Search by Username : </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          value="search"
        />
      </form>
      <UserList users={users} />
    </section>
  );
}