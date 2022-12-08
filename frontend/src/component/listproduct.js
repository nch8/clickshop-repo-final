import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "./product";
import { AllListProductActive } from "../services/service";
import { searchproduct , filterCategory} from "../services/service";
import ListCategori from "./listCategori";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Noti } from "./Notification";
const ListProduct = () =>{
  const [allproduct, setAllProduct] = useState([
]);
const [allproductnew, setAllProductnew] = useState([
]);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [displayprod, setDisplayprod] = useState([
  ]);
  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  var displayUsers ='';
  /*const displayUsers = allproduct
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <Product key={user.id} nombre={user.firstName} precio={user.id}></Product>   
      );
    });*/
    useEffect(() => {
      try {
        async function getListProduct() {
          const res = await AllListProductActive()
          const arrprod = res.objeto;
          setAllProduct(arrprod)
        }
        getListProduct()
      } catch (error) {
        console.log(error)
      }

    }, []);
    var pageCount =0;
    debugger
    if(allproduct != undefined){
      if(allproduct.length != undefined){
        pageCount = Math.ceil(allproduct.length / productPerPage);
     }
    }
    
  

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
   displayUsers = allproduct
  .slice(pagesVisited, pagesVisited + productPerPage)
  .map((p) => {
      return (
        <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
      );
    
  });
  const handlesearch= (event)=>{
    setSearch(event.target.value)
  }
  const sendsearch = async() =>{
    debugger
    try{
      const resp = await searchproduct(search)
      setAllProduct(resp)
      displayUsers = resp
      .slice(pagesVisited, pagesVisited + productPerPage)
      .map((p) => {
        return (
          <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
        );
      });
    }catch(error){
      console.log(error)
    }
  }
  const handleCategory = async(e) =>{
    var categoria = e.target.value
    try{
      const resp = await filterCategory(categoria)
      debugger
       setAllProduct(resp)
      if(resp!=undefined){
        displayUsers = resp
        .slice(pagesVisited, pagesVisited + productPerPage)
        .map((p) => {
          return (
            <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
          );
        });
      }else{
        displayUsers = []
        .slice(pagesVisited, pagesVisited + productPerPage)
        .map((p) => {
          return (
            <Product key={p.id} nombre={p.nombre} precio={p.precio} id={p.id} imagenesUrl={p.imagenesUrl}></Product>   
          );
        });
        console.log(allproduct)
      }
     
  
  setDisplayprod(displayUsers)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <section className="py-5 d-flex">
      <ListCategori allproduct={allproduct} setAllProduct={setAllProduct}></ListCategori >
        <div className="container px-4">
          <div className="input-group">
            <div className="form-outline">
              <input id="search-input" type="search" onChange={handlesearch} className="form-control"></input>
              <label className="form-label" htmlFor="form1">Search</label>
            </div>
            <button id="search-button" onClick={sendsearch} type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            
            {
             displayUsers}
          </div>
        </div>
      </section>
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
}

export default ListProduct;