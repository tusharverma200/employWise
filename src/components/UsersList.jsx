import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => alert("Failed to delete user"));
  };

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Users List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <img src={user.avatar} alt={user.first_name} className="w-20 h-20 mx-auto rounded-full" />
            <h3 className="mt-2 text-lg font-semibold">{user.first_name} {user.last_name}</h3>
            {/* <p className="text-gray-500">{user.email}</p> */}
            <Link to={`/users/${user.id}`} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg inline-block">Edit</Link>
            <button onClick={() => handleDelete(user.id)} className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {page} of {totalPages}</span>
        <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
