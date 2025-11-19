import React from "react";
import { VerticalGraph } from "./VerticalGraph";
// import {holdings} from "../data/data"

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Holdings = () => {
  // getting the data of holdings from database using axios and useeffect
  const [allHoldings, setAllHoldings] = useState([]);
  
  useEffect(() => {
  axios
    .get("https://stock-trading-plateform-backend.onrender.com/allHoldings", {
      withCredentials: true, // ✅ send cookies (session/JWT)
    })
    .then((res) => {
      setAllHoldings(res.data);
    })
    .catch((err) => {
      console.error("❌ Error fetching holdings:", err);
      alert("You are not logged in! Redirecting to login...");
      window.location.href = "https://stock-trading-plateform-frontend.onrender.com/login"; // redirect to frontend login
    });
}, []);

// for the graph 
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'stock price',
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index)=>{
            const currValue = stock.price * stock.qty;
            const isProfit = currValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currValue}</td>
                <td className={profClass}>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
          <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
