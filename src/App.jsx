import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomerDashboard from "./Pages/CustomerDashboard"
import ProductCards from "./Component/Customer/ProductCards"
import SellerProductList from "./Component/Customer/SellerProductList"
import Login from "./Pages/Login"
import Cart from "./Component/Customer/Cart"
import Orders from "./Component/Customer/Orders"
import Address from "./Component/Customer/Address"
import SellerDashboard from "./Pages/SellerDashboard"
import Stats from "./Component/Seller/Stats"
import CategoryProduct from "./Component/Customer/CategoryProduct"
import ExecutiveDashboard from "./Pages/ExecutiveDashboard"
import ProductManagement from "./Component/Executive/ProductManagement"
import CustomersOrders from "./Component/Seller/CustomersOrders"
import ManageProducts from "./Component/Seller/ManageProducts"
import SellerProducts from "./Component/Seller/SellerProducts"
import MyProducts from "./Component/Seller/MyProducts"
import ProductRequest from "./Component/Seller/ProductRequest"
import NewProductRequest from "./Component/Executive/NewProductRequest"
import UploadImages from "./Component/Executive/UploadImages"
import ManageCategory from "./Component/Executive/ManageCategory"
import AddNewProduct from "./Component/Executive/AddNewProduct"
import SellerDetails from "./Component/Executive/SellerDetails"
import WareHouseDashboard from "./Pages/WareHouseDashboard"
import ShippedOrders from "./Component/Warehouse/ShippedOrders"
import Delivery from "./Component/Warehouse/Delivery"
import ViewSellerProduct from "./Component/Executive/ViewSellerProduct"

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
          <Route path="category/:categoryId" element={<CategoryProduct />} />
        </Route>
        <Route path="/seller" element={<SellerDashboard />} >
          <Route index element={<Stats />} />
          <Route path="orders" element={<CustomersOrders />} />
          <Route path="manage-product" element={<ManageProducts />} />
          <Route path="seller-products/:id" element={<SellerProducts />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="product-requests" element={<ProductRequest />} />
        </Route>
        <Route path="/executive" element={<ExecutiveDashboard />} >
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="upload-images" element={<UploadImages />} />
          <Route path="manage-cateogry" element={<ManageCategory />} />
          <Route path="add-product" element={<AddNewProduct />} />
          <Route path="product-requests" element={<NewProductRequest />} />
          <Route path="seller-details" element={<SellerDetails />} />
          <Route path="seller-products/:sellerId" element={<ViewSellerProduct />} />
        </Route>
        <Route path="/warehouse" element={<WareHouseDashboard />}>
          <Route path="shipped-orders" element={<ShippedOrders />} />
          <Route path="deliver-orders" element={<Delivery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
