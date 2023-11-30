import "./App.css";
import TransactionDashboard from "./components/TransactionDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransactionsStatistics from "./components/TransactionsStatistics";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<TransactionDashboard />}></Route>
          <Route
            path="/statistics"
            element={<TransactionsStatistics />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
