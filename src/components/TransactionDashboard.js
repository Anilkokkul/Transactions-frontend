import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function TransactionDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("2022");
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(`${selectedYear}-${selectedMonth}`);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://product-transactions-79wj.onrender.com/api/transactions?page=${currentPage}&search=${search}`
      );
      console.log(response.data);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(transactions);

  const changePage = (num) => {
    setCurrentPage((prev) => prev + num);
  };

  const handleSearch = () => {
    fetchTransactions();
  };
  return (
    <div className="w-75 m-auto">
      <h1 className=" m-5">Transaction Dashboard</h1>
      <div className=" container d-flex justify-content-evenly align-content-center my-4">
        <div className="">
          <label htmlFor="search">Search: </label>
          <input
            className=" input-group-text d-inline mx-2"
            id="search"
            type="text"
            placeholder="Search Transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <div>
            <label htmlFor="selectMonth">Month:</label>
            <select
              className=" form-select d-inline w-auto ms-1 "
              id="selectMonth"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
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
      </div>
      <button className="btn btn-outline-primary" onClick={handleSearch}>
        Search
      </button>
      <div className="d-flex m-auto justify-content-between mt-3 h-auto">
        <div className=" btn">Page No. {currentPage} </div>
        <div>
          <button
            className="btn text-info fw-bold m-0"
            onClick={() => changePage(-1)}
          >
            Pervious
          </button>
          <span> - </span>
          <button
            className="btn text-info fw-bold"
            onClick={() => changePage(1)}
          >
            Next
          </button>
        </div>
        <div className=" btn">Per Page: 10</div>
      </div>
      <div className="mt-5">
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.title}</td>
                    <td>{transaction.description}</td>
                    <td className=" text-nowrap">$ {transaction.price}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.sold ? "yes" : "No"}</td>
                    <td>
                      <a
                        href={transaction.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        link
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionDashboard;