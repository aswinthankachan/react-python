import React, { useEffect, useState } from "react";
import axios from "axios";

function Report() {

  const [report, setReport] = useState([]);

  // Load report
  useEffect(() => {

    axios.get(
      "http://127.0.0.1:8000/api/report/"
    )

    .then(res => {
      setReport(res.data);
    });

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h1>Report Page</h1>

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Customer</th>
            <th>City</th>
            <th>Product</th>
            <th>Price</th>

          </tr>

        </thead>

        <tbody>

          {
            report.map((item, index) => (

              <tr key={index}>

                <td>{item.customer}</td>

                <td>{item.city}</td>

                <td>{item.product}</td>

                <td>{item.price}</td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );
}

export default Report;