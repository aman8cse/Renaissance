import { useEffect, useState } from "react";
import "../styles/users.css";


export default function Users() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const res = await fetch(
        `${BASE_URL}/user/get-all-users`,
        { credentials: "include" }
      );

      const response = await res.json();
      setUsers(response.data);

    } catch (err) {
      console.error(err);
    }
  }

  async function updateUser(userId, updates) {

    try {
      const res = await fetch(
        `${BASE_URL}/user/${userId}/update-user-details`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(updates)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      fetchUsers();

    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <div className="adminUsers">

      <h2>Users</h2>

      <table className="usersTable">

        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Coins</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users?.map(user => (

            <tr key={user._id}>

              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>

              <td>
                <input
                  type="number"
                  defaultValue={user.coinsBalance}
                  onChange={(e) =>
                    user.coinsBalance = e.target.value
                  }
                />
              </td>

              <td>

                <select
                  defaultValue={user.role}
                  onChange={(e) =>
                    user.role = e.target.value
                  }
                >
                  <option value={0}>User</option>
                  <option value={1}>Volunteer</option>
                  <option value={2}>Admin</option>
                </select>

              </td>

              <td>

                <button
                  onClick={() =>
                    updateUser(user._id, {
                      role: user.role,
                      coinsBalance: user.coinsBalance
                    })
                  }
                >
                  Save
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}