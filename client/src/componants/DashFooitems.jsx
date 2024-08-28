import { Alert, Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashFooitems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const { existingUser } = useSelector((state) => state.hunguser);

  const startIndex = foodItems.length;

  const handleDelete = async () => {
    setShowConfirm(false);
    const res = await fetch(
      `/api/v4/food/delete-food/${existingUser._id}/${foodId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if (!res) {
      setDeleteError(data.message);
    } else {
      console.log(data);
      setDeleteSuccess(data.message);
      getFoodItems();
    }
  };

  const handleShowMore = async () => {
    const res = await fetch(`/api/v4/food/show-more/${startIndex}`);
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      setFoodItems([...foodItems, ...data]);
      if (data.length < 10) {
        setShowMore(false);
      }
    }
  };

  const getFoodItems = async () => {
    try {
      const res = await fetch(`/api/v4/food/get-food`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setFoodItems(data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoodItems();
  }, []);
  console.log('foodItems', foodItems);
  return (
    <div className="min-h-screen min-w-3xl p-3 md:mx-auto">
      <>
        {deleteSuccess && (
          <Alert color="success" className="mt-3 text-center">
            {deleteSuccess}
          </Alert>
        )}
        {deleteError && (
          <Alert color="failure" className="mt-3">
            {deleteError}
          </Alert>
        )}

        {foodItems && foodItems.length > 0 ? (
          <>
            <h1 className="text-3xl font-sans text-center">Food Items</h1>
            <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
              <Table className="my-5">
                <Table.Head>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Restaurant</Table.HeadCell>
                  <Table.HeadCell>Food image</Table.HeadCell>
                  <Table.HeadCell>Food name</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {foodItems.map((food) => {
                  return (
                    <Table.Body key={food._id}>
                      <Table.Row>
                        <Table.Cell>
                          {' '}
                          {new Date(
                            food && food.updatedAt
                          ).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell> {food && food.restaurant}</Table.Cell>
                        <Table.Cell>
                          <img
                            src={food && food.foodImage}
                            alt="food-image"
                            className="w-30 h-20 object-cover bg-gray-500"
                          />
                        </Table.Cell>
                        <Table.Cell> {food && food.foodName}</Table.Cell>
                        <Table.Cell> {food && food.price}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/update-food/${food.slug}`}>
                            <Button color="blue">Edit</Button>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            color="failure"
                            onClick={() => {
                              setShowConfirm(true);
                              setFoodId(food._id);
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
              {showMore && (
                <Button
                  color={'green'}
                  className="w-full my-2"
                  outline
                  onClick={handleShowMore}
                >
                  Show more...
                </Button>
              )}
            </div>
          </>
        ) : (
          <p className=" mt-5">You have no food items to show</p>
        )}
      </>
      <Modal show={showConfirm} onClose={() => setShowConfirm(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400" />
            <h3 className="text-xl text-gray-600">
              Are you sure you want to delete this food item?
            </h3>
            <div className="flex justify-center gap-2 mt-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowConfirm(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashFooitems;
