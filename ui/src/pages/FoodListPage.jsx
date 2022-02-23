import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminFoodList, toggle } from "../redux/features/food/foodSlice";
import { signOut } from "../redux/features/user/userSlice";

import NewMealPage from "./NewMealPage";

const FoodListPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { foodList } = useSelector((state) => state.food);
  useEffect(() => {
    dispatch(fetchAdminFoodList());
  }, [dispatch]);

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Meals</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <Link
                    to="/"
                    className="btn"
                    onClick={() => {
                      dispatch(signOut());
                    }}
                  >
                    <span>Sign Out</span>
                  </Link>
                  <Button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(toggle());
                    }}
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Meal</span>
                  </Button>
                  <Link
                    to="/admin/reports"
                    className="btn btn-info"
                    data-toggle="modal"
                  >
                    <span>Reports</span>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Meal</th>
                  <th>Calorie</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {foodList.map((meal, idx) => (
                <tbody key={idx}>
                  <tr>
                    <td>{meal.author.email}</td>
                    <td>{meal.foodName}</td>
                    <td>{meal.calorie}</td>
                    <td>${meal.price}</td>
                    <td>
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Edit"
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/food/edit/${meal._id}`);
                        }}
                      >
                        &#xE254;
                      </i>

                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Delete"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/food/delete/${meal._id}`);
                        }}
                      >
                        &#xE872;
                      </i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>

      <NewMealPage />
    </>
  );
};

export default FoodListPage;
