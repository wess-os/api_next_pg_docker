import { api } from "~/utils/api";
import { useState } from "react";
import { set } from "zod";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const fetchAllUsers = api.post.getAll.useQuery();
  const fetchOneUser = api.post.getOne.useQuery({ id: userId });

  const createUserMutation = api.post.createUser.useMutation();
  const updateUserMutation = api.post.updateUser.useMutation();
  const deleteUserMutation = api.post.deleteUser.useMutation();

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({

        name: name,
        email: email,

      });

      setName("");
      setEmail("");
      fetchAllUsers.refetch();

    } catch (error) {

      console.log(error);

    }
  }

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({

        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,

      });

      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      fetchAllUsers.refetch();

    } catch (error) {

      console.log(error);

    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({

        id: userIdToDelete,

      });

      setUserIdToDelete("");
      fetchAllUsers.refetch();

    } catch (error) {

      console.log(error);

    }
  }

  return (
    <div className="mx-auto p-8">
      {/* Get All Users */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
        <button 
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" 
          onClick={() => fetchAllUsers.refetch()}
        >
          Get All Users
        </button>
        <div className="mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
          <p>Id</p>
          <p>Name</p>
          <p>Email</p>
        </div>
        {fetchAllUsers.data &&
          fetchAllUsers.data.map((user) => (
            <div 
              key={user.id} 
              className="mb-4 grid grid-cols-3 gap-4 rounded border p-4 shadow-sm"
            >
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))
        }
      </div>

      {/* Get One User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get One User</h2>
        <input 
          className="mr-2 border border-gray-300 p-2" 
          placeholder="Enter user id to get"
          value={userId || ""} 
          onChange={(e) => setUserId(String(e.target.value))}
        />
        <button 
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" 
          onClick={() => fetchOneUser.refetch()}
        >
          Get One User
        </button>

        {fetchOneUser.data && (
          <div className="mt-4">
            <div className="mb-4 grid grid-cols-3 gap-4 font-bold">
              <p>Id</p>
              <p>Name</p>
              <p>Email</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4 rounded border p-4 shadow-sm">
              <p>{fetchOneUser.data.id}</p>
              <p>{fetchOneUser.data.name}</p>
              <p>{fetchOneUser.data.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Create User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      {/* Update User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to update"
            value={userIdToUpdate}
            onChange={(e) => setUserIdToUpdate(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user email to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </div>

      {/* Delete User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to delete"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
