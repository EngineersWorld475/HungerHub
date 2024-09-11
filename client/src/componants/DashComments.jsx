import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const DashComments = () => {
  const [comments, setComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [commentId, setCommentId] = useState('');
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/v4/comment/get-all-comments`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(`/api/v4/comment/delete-comment/${commentId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  console.log(comments);
  return (
    <div className="min-h-screen min-w-3xl p-3 md:mx-auto">
      {comments && comments.length > 0 ? (
        <>
          <h1 className="text-center text-2xl font-sans">Manage Comments</h1>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
            <Table className="my-5">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>user id</Table.HeadCell>
                <Table.HeadCell>Food id</Table.HeadCell>
                <Table.HeadCell>content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {comments.map((comment) => {
                return (
                  <Table.Body key={comment._id}>
                    <Table.Row>
                      <Table.Cell>
                        {' '}
                        {new Date(
                          comment && comment.updatedAt
                        ).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell> {comment && comment.userId}</Table.Cell>
                      <Table.Cell>{comment && comment.foodId}</Table.Cell>
                      <Table.Cell>{comment && comment.content}</Table.Cell>
                      <Table.Cell>
                        {' '}
                        {comment && comment.likes.length}
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          color="failure"
                          onClick={() => {
                            setOpenModal(true);
                            setCommentId(comment && comment._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
              <Modal.Header />
              <Modal.Body>
                <div className="flex flex-col items-center justify-center">
                  <FaExclamationCircle className="text-5xl text-red-500" />

                  <h1 className="text-center text-2xl font-semibold text-gray-500 mt-5">
                    Are you sure you want to delete this comment ?
                  </h1>
                  <div className="flex flex-row gap-7 mt-5">
                    <Button>Cancel</Button>
                    <Button color="failure" onClick={handleDelete}>
                      Yes i'm sure
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl font-sans">
          You don't have any comments to show
        </h1>
      )}
    </div>
  );
};

export default DashComments;
