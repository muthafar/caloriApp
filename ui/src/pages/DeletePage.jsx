import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDeleteMeal } from "../redux/features/food/foodSlice";

const DeletePage = () => {
  const [show, setShow] = useState(true);
  let navigate = useNavigate("/");
  const { id } = useParams();
  const { foodList } = useSelector((state) => state.food);
  const toggleDelete = () => {
    setShow(!show);
    navigate("/food/list");
  };
  const foundMeal = foodList.find((meal) => meal._id === id);

  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <Modal
      show={show}
      onHide={() => {
        toggleDelete();
      }}
    >
      <Modal.Header closeButton className=" modal-header">
        <Modal.Title>Delete {foundMeal.foodName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are You Sure You Want to Delete?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(AdminDeleteMeal(id));
            navigate("/food/list");
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("modal")
  );
};

export default DeletePage;
