import React, { useState, useEffect } from 'react';
import UserList from './UserList';

export default function UserSearch({ handleClickUser }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch(`/api/users?username=${search}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setUsers);
        } else {
          res.json().then(console.log);
        }
      });
  }

  useEffect(fetchUsers, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetchUsers();
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
      <UserList users={users} onClickUser={handleClickUser} />
    </section>
  );
}