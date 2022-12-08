import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './component/login';
import Home from './component/home';
import CreateAdmin from './component/administrador/createAdmin';
import CreateProduct from './component/vendedor/createProduct';
import ShopCart from './component/shopcart';
import RegistroVendedor from './component/cliente/registrarvendedor';
import EditPerfile from './component/cliente/editprofile';
import ListProductVendedor from './component/vendedor/listproductvendedor';
import ProductBuy from './component/cliente/productbuy';
import ProductPending from './component/vendedor/productpending';
import ListSellerRequest from './component/administrador/listSellerRequest';
import Pendingshoppinglist from './component/cliente/pendingshoppinglist';
import ListShoppinghistory from './component/cliente/listshoppinghistory';
import Allstatistics from './component/administrador/allstatistics';
import ListClaim from './component/vendedor/listclaim';
import QualificationClientList from './component/vendedor/qualificationClientlist';
import QualificationSellerList from './component/cliente/qualificationSellerlist';
import UserList from './component/administrador/userlist';
import Balancelist from './component/vendedor/balancelist';
import { ProtectedRouteClient ,ProtectedRouteVendeor,ProtectedRouteAdmin} from './component/utils/protectedRoute';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import { toast } from 'react-toastify';

toast.configure({
    autoClose: 4000,
    draggable: false,
    closeButton: false,
    draggablePercent: 100,
    progressClassName: 'ourbar',
    position: 'top-left',
    style: {top: '90px'}
  });
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/home' element={<Home></Home>} />
          <Route element={<ProtectedRouteClient />}>
            <Route path='/shopcart' element={<ShopCart></ShopCart>} />
            <Route path='/registravendedor' element={<RegistroVendedor></RegistroVendedor>} />
            <Route path='/productpending' element={<ProductBuy></ProductBuy>} />
            <Route path='/editperfile' element={<EditPerfile></EditPerfile>} />
            <Route path='/pendingshoppinglist' element={<Pendingshoppinglist></Pendingshoppinglist>} />
            <Route path='/listshoppinghistory' element={<ListShoppinghistory></ListShoppinghistory>} />
            <Route path='/qualificationSeller' element={<QualificationSellerList></QualificationSellerList>} />
          </Route>
          <Route element={<ProtectedRouteVendeor />}>
            <Route path='/createproduct' element={<CreateProduct></CreateProduct>} />
            <Route path='/listProductVendedor' element={<ListProductVendedor></ListProductVendedor>} />
            <Route path='/productpendingSeller' element={<ProductPending></ProductPending>} />
            <Route path='/listClaim' element={<ListClaim></ListClaim>} />
            <Route path='/qualificationClient' element={<QualificationClientList></QualificationClientList>} />
            <Route path='/balance' element={<Balancelist></Balancelist>} />
            
          </Route>

          <Route element={<ProtectedRouteAdmin />}>
          <Route path='/listSellerRequest' element={<ListSellerRequest></ListSellerRequest>} />
          <Route path='/allstatistics' element={<Allstatistics></Allstatistics>} />
          <Route path='/userlist' element={<UserList></UserList>} />
          
          </Route>
          
         
          
          
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
