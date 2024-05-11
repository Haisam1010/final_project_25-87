import React, { useState } from "react";

function Users() {
  // Mock users data
  const mockUsers = [
    { id: 1, email: "user1@example.com", password: "password1" },
    { id: 2, email: "user2@example.com", password: "password2" },
    { id: 3, email: "user3@example.com", password: "password3" },
  ];

  // State for managing form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to save user data
    console.log("User added:", { email, password });
    // Reset form inputs
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Add labels for accessibility */}

        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-2 py-1 text-gray-600"
            style={{ width: "30%" }}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-2 py-1 text-gray-600"
            style={{ width: "30%" }}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>

      {/* Users Table */}
      <table className="w-full table-auto">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="border px-4 py-2 text-center">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody className="bg-gray-600 text-white">
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2 text-center">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;