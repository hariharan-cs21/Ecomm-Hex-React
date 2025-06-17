import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomerDashboard from "./Pages/CustomerDashboard"
import ProductCards from "./Component/Customer/ProductCards"
import SellerProductList from "./Component/Customer/SellerProductList"
import Login from "./Pages/Login"
import Cart from "./Component/Customer/Cart"
import Orders from "./Component/Customer/Orders"
import Address from "./Component/Customer/Address"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/customer" element={<CustomerDashboard />}>
          <Route index element={<ProductCards />} />
          <Route path="product/:productId" element={<SellerProductList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
