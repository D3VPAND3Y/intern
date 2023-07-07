import React, { useState, useEffect } from 'react';

const UserDisplay = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({ id: '', name: '', city: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const { id, name, city } = filterOptions;

    const filtered = users.filter((user) => {
      return (
        user.id.toString().includes(id) &&
        user.name.toLowerCase().includes(name.toLowerCase()) &&
        user.address.city.toLowerCase().includes(city.toLowerCase())
      );
    });

    setFilteredUsers(filtered);
  }, [filterOptions, users]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleSortByCity = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => a.address.city.localeCompare(b.address.city));
    setFilteredUsers(sortedUsers);
  };

  const handleSortById = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => a.id - b.id);
    setFilteredUsers(sortedUsers);
  };

  const totalCount = filteredUsers.length;

  return (
    <div>
      <h1>User Display</h1>

      <div>
        <input
          type="text"
          placeholder="Search by name, id, or city"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>ID:</label>
        <input type="text" name="id" value={filterOptions.id} onChange={handleFilterChange} />
      </div>

      <div>
        <label>Name:</label>
        <input type="text" name="name" value={filterOptions.name} onChange={handleFilterChange} />
      </div>

      <div>
        <label>City:</label>
        <input type="text" name="city" value={filterOptions.city} onChange={handleFilterChange} />
      </div>

      <div>
        <button onClick={handleSortByCity}>Sort by City</button>
        <button onClick={handleSortById}>Sort by ID</button>
      </div>

      <p>Total Count: {totalCount}</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDisplay;
