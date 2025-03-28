import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://reqres.in/api/users/${id}`, user)
      .then(() => {
        alert("User updated successfully");
        navigate("/users");
      })
      .catch(() => alert("Failed to update user"));
  };

  if (loading) return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="first_name" value={user.first_name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="First Name" required />
        <input type="text" name="last_name" value={user.last_name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Last Name" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Update</button>
      </form>
    </div>
  );
}
