import React from "react";
import { useFormik } from "formik";
import { addMeal, getSumCal } from "../redux/features/food/foodSlice";
import { useDispatch } from "react-redux";
import Search from "./Search";

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

const MealForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      food: "",
      calorie: 0,
      price: 0,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(addMeal(values));
      resetForm();
      dispatch(getSumCal());
    },
  });

  return (
    <>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className=" d-flex flex-column flex-sm-column flex-md-row flex-lg-row justify-content-around align-items-center "
        >
          <div className="my-3 d-flex align-items-center gap-3 ">
            <label>Food </label>
            <input
              type="text"
              name="food"
              placeholder="Ex.milk"
              className="form-control"
              value={formik.values.food}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.food && formik.errors.food ? (
              <div style={{ color: "red" }}>{formik.errors.food}</div>
            ) : null}
          </div>
          <div className="my-3 d-flex align-items-center gap-3">
            <label>Calorie</label>
            <input
              type="number"
              name="calorie"
              placeholder="Ex.150"
              className="form-control"
              value={formik.values.calorie}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.calorie && formik.errors.calorie ? (
              <div style={{ color: "red" }}>{formik.errors.calorie}</div>
            ) : null}
          </div>
          <div className="my-3 d-flex  align-items-center gap-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Ex.150"
              className="form-control"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price ? (
              <div style={{ color: "red" }}>{formik.errors.price}</div>
            ) : null}
          </div>
          <div>
            <button className="btn btn-black">Add Meal</button>
          </div>
        </form>
        <Search />
      </div>
    </>
  );
};

export default MealForm;
