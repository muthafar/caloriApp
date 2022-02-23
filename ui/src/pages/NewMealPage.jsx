import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AdminAddMeal, toggle } from "../redux/features/food/foodSlice";

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

const NewMealPage = () => {
  const dispatch = useDispatch();
  const { show, foodList } = useSelector((state) => state.food);
  const formik = useFormik({
    initialValues: {
      user: "rami",
      food: "",
      calorie: 0,
      price: 0,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(AdminAddMeal(values));
      resetForm();
      dispatch(toggle());
    },
  });

  const uniqueNames = [...new Set(foodList.map((item) => item.author.email))];

  return ReactDOM.createPortal(
    <Modal
      show={show}
      onHide={() => {
        dispatch(toggle());
      }}
    >
      <Modal.Header closeButton className=" modal-header">
        <Modal.Title>Add New Meal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label>Select User </Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              onChange={formik.handleChange}
              value={formik.values.user}
              name="user"
            >
              {uniqueNames.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </Form.Control>
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
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>,
    document.getElementById("modal")
  );
};

export default NewMealPage;
