import { Modal, Table } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/v4/user/get-users`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(`/api/v4/user/delete-users/${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        toast('User deleted successfully');
        fetchUsers();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen mx-auto">
        {users && users.length > 0 ? (
          <>
            <h1 className="text-center text-3xl font-sans my-5">
              User management
            </h1>

            <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
              <Table>
                <Table.Head>
                  <Table.HeadCell>DATE CREATED</Table.HeadCell>
                  <Table.HeadCell>USER IMAGE</Table.HeadCell>
                  <Table.HeadCell>USERNAME</Table.HeadCell>
                  <Table.HeadCell>EMAIL</Table.HeadCell>
                  <Table.HeadCell>ADMIN</Table.HeadCell>
                  <Table.HeadCell>DELETE</Table.HeadCell>
                </Table.Head>
                {users.map((user) => {
                  return (
                    <Table.Body key={user._id}>
                      <Table.Row>
                        <Table.Cell>
                          {new Date(
                            user && user.updatedAt
                          ).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <img
                            src={user.profilePicture}
                            alt="user-image"
                            className="w-10 h-10 rounded-full bg-gray-500"
                          />
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                          {user.isAdmin ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-600" />
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <button
                            className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg"
                            onClick={() => {
                              setOpenModal(true);
                              setUserId(user._id);
                            }}
                          >
                            Delete
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  );
                })}
              </Table>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
              <Modal.Header />
              <Modal.Body>
                <div className="flex flex-col gap-3 items-center">
                  <p className="text-2xl text-gray-600 mb-2">
                    Are you sure you want to delete this user?
                  </p>
                  <div className="flex flex-row gap-2">
                    <button
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-24"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md "
                      onClick={deleteUser}
                    >
                      Yes i'm sure
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <h1 className=" font-sans text-center">You have no users to show</h1>
        )}
      </div>
    </>
  );
};

export default DashUsers;
