import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Report from "./Report";


// FORM PAGE
function Home() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  // Load data
  useEffect(() => {

    axios.get("http://127.0.0.1:8000/api/customers/")
      .then(res => setCustomers(res.data));

    axios.get("http://127.0.0.1:8000/api/products/")
      .then(res => setProducts(res.data));

  }, []);

  // Select customer
  const selectCustomer = (id) => {

    const selected = customers.find(
      item => item.id == id
    );

    setCustomer(selected);
  };

  // Select product
  const selectProduct = (id) => {

    const selected = products.find(
      item => item.id == id
    );

    setProduct(selected);
  };

  // Save
  const saveData = () => {

    axios.post(
      "http://127.0.0.1:8000/api/save/",
      {
        customer: customer.id,
        product: product.id
      }
    )

    .then(() => {
      alert("Saved");
    });

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Entry Form</h1>

      {/* Customer */}

      <h3>Select Customer</h3>

      <select
        onChange={(e) => selectCustomer(e.target.value)}
      >

        <option>Select Customer</option>

        {
          customers.map((item) => (

            <option value={item.id}>
              {item.customer_name}
            </option>

          ))
        }

      </select>

      <br /><br />

      {
        customer && (

          <div>

            <p>
              Name : {customer.customer_name}
            </p>

            <p>
              City : {customer.city}
            </p>

          </div>

        )
      }

      <hr />

      {/* Product */}

      <h3>Select Product</h3>

      <select
        onChange={(e) => selectProduct(e.target.value)}
      >

        <option>Select Product</option>

        {
          products.map((item) => (

            <option value={item.id}>
              {item.product_name}
            </option>

          ))
        }

      </select>

      <br /><br />

      {
        product && (

          <div>

            <p>
              Product : {product.product_name}
            </p>

            <p>
              Price : {product.price}
            </p>

          </div>

        )
      }

      <hr />

      {/* Buttons */}

      <button onClick={saveData}>
        Save
      </button>

      <button
        onClick={() => navigate('/report')}
        style={{ marginLeft: "10px" }}
      >
        Report
      </button>

    </div>

  );
}


// MAIN APP
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/report"
          element={<Report />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;