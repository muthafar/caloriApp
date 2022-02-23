import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { searchByDate } from "../redux/features/food/foodSlice";
import dateFormat from "dateformat";

const Search = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      from: dateFormat(new Date(), "yyyy-mm-dd"),
      to: dateFormat(new Date(), "yyyy-mm-dd"),
    },

    onSubmit: (searchDates) => {
      dispatch(searchByDate(searchDates));
    },
  });

  return (
    <div className="task-list-header d-flex justify-content-between align-items-center py-3 px-2 mb-3">
      <h2 className="text-white">Meals</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex align-items-center"
      >
        <div className=" align-items-center d-flex gap-2 ">
          <label className="text-white">From:</label>
          <input
            type="date"
            name="from"
            className="form-control "
            value={formik.values.from}
            onChange={formik.handleChange}
          />
        </div>
        <div className="d-flex align-items-center px-3  gap-2">
          <label className="text-white">To:</label>
          <input
            type="date"
            name="to"
            className="form-control"
            value={formik.values.to}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <button className="btn btn-black">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
