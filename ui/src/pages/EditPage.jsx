import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AdminUpdateMeal } from "../redux/features/food/foodSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.food) {
    errors.food = "Required";
  }
  if (!values.calorie) {
    errors.calorie = "Required";
  } else if (isNaN(values.calorie)) {
    errors.calorie = "Must be a Number";
  }
  if (!values.price) {
    errors.price = "Required";
  } else if (isNaN(values.calorie)) {
    errors.price = "Must be a Number";
  }
  return errors;
};

const EditPage = () => {
  const [show, setIsShow] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { foodList } = useSelector((state) => state.food);
  const foundMeal = foodList.find((meal) => meal._id === id);
  const formik = useFormik({
    initialValues: {
      user: foundMeal.author.email,
      food: foundMeal.foodName,
      calorie: foundMeal.calorie,
      price: foundMeal.price,
    },
    validate,
    onSubmit: (values) => {
      const data = { ...values, id };
      dispatch(AdminUpdateMeal(data));
      navigate("/food/list");
    },
  });

  return ReactDOM.createPortal(
    <Modal
      show={show}
      onHide={() => {
        setIsShow(!show);
        navigate("/food/list");
      }}
    >
      <Modal.Header closeButton className=" modal-header">
        <Modal.Title>Update {foundMeal.foodName} Meal </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User</Form.Label>
            {formik.touched.food && formik.errors.food ? (
              <div>{formik.errors.food}</div>
            ) : null}
            <Form.Control
              type="text"
              disabled
              name="user"
              value={formik.values.user}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Food</Form.Label>
            {formik.touched.food && formik.errors.food ? (
              <div>{formik.errors.food}</div>
            ) : null}
            <Form.Control
              type="text"
              placeholder="food"
              name="food"
              value={formik.values.food}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calorie</Form.Label>
            {formik.touched.food && formik.errors.food ? (
              <div>{formik.errors.calorie}</div>
            ) : null}
            <Form.Control
              type="text"
              placeholder="Calorie"
              name="calorie"
              value={formik.values.calorie}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            {formik.touched.food && formik.errors.food ? (
              <div>{formik.errors.price}</div>
            ) : null}
            <Form.Control
              type="text"
              placeholder="Price"
              name="price"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>,
    document.getElementById("modal")
  );
};

export default EditPage;
