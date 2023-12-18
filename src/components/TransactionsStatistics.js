import axios from "axios";
import React, { useState, useEffect } from "react";
import TransactionsBarChart from "./TransactionsBarChart";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function TransactionsStatistics() {
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("2022");
  const [statistics, setStatistics] = useState([]);
  const [month, setMonth] = useState("March");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get(
        `https://product-transactions-79wj.onrender.com/api/statistics?month=${selectedYear}-${selectedMonth}`
      );
      setStatistics(response.data);
    };
    fetchStats();
  }, [selectedMonth, selectedYear]);

  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
    setMonth(e.target.selectedOptions[0].text);
  };

  return (
    <>
      {" "}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#" onClick={() => navigate("/")}>
            Back <IoArrowBackSharp />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="m-auto w-75 mt-3">
        <h1>Transaction Statistics</h1>
        <p>This page will display the statistics of all transactions.</p>
        <div className="d-flex justify-content-evenly gap-5">
          <div>
            <label htmlFor="selectMonth">Month:</label>
            <select
              className=" form-select d-inline w-auto ms-1 "
              id="selectMonth"
              value={selectedMonth}
              onChange={(e) => handleChange(e)}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="selectYear">Year</label>
            <select
              className=" form-select d-inline w-auto ms-1"
              id="selectYear"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>
        <h3 className="mt-4">
          Statistics for the month {month}-{selectedYear}
        </h3>
        <div className="card w-50  m-auto mt-3">
          {statistics.message === "No sales made on this month" ? (
            <div className="card-body">
              <h5 className="card-title">No sales made on this month</h5>
            </div>
          ) : (
            <div className="card-body">
              <div className=" d-flex">
                <h5 className="card-title text-start w-50">Total sale</h5>
                <span className=" text-start">
                  : {Math.ceil(statistics.totalSaleAmount)}
                </span>
              </div>
              <div className=" d-flex">
                <h5 className="card-title text-start w-50">Total sold item</h5>
                <span className=" text-start">
                  : {statistics.TotalSoldItems}
                </span>
              </div>
              <div className=" d-flex">
                <h5 className="card-title text-start w-50">
                  Total not sold item
                </h5>
                <span className=" text-start">
                  : {statistics.TotalNotSoldItems}
                </span>
              </div>
            </div>
          )}
        </div>
        <TransactionsBarChart
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
    </>
  );
}

export default TransactionsStatistics;
