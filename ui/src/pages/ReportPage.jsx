import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getavgCal,
  getmealsweek,
  getmealsweekbefore,
} from "../redux/features/food/foodSlice";

const ReportPage = () => {
  const dispatch = useDispatch();
  const { mealsweek, mealsweekBefore, avgCal } = useSelector(
    (state) => state.food
  );
  useEffect(() => {
    dispatch(getmealsweek());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getmealsweekbefore());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getavgCal());
  }, [dispatch]);
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row ">
              <div className="col-sm-6 ">
                <h2>
                  <b>Reports</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <Link to="/" className="btn">
                  <span>Back To list</span>
                </Link>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th># Meals (last 7 days)</th>
                <th># Meals (week before)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mealsweek}</td>
                <td>{mealsweekBefore}</td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th>user</th>
                <th>avg calories last 7 days</th>
              </tr>
            </thead>
            {avgCal.map((user, idx) => (
              <tbody key={idx}>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.avg}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
