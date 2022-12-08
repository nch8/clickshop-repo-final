
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { listshoppinghistory } from "../../services/service";
    import ReactPaginate from "react-paginate";
    import Shoppinghistory from "./shoppinghistory";
    import { searchproducthistory } from "../../services/service";
  // This values are the props in the UI
  
    export default function ListShoppinghistory() {
      const [allproduct, setAllproduct] = useState([
      ]);
    const [pageNumber, setPageNumber] = useState(0);
    const [search, setSearch] = useState('');
    
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    useEffect(() => {
      try {
        async function getListShoppinghistory() {
          const res = await listshoppinghistory()
          const arrprod = res[1];
          setAllproduct(arrprod)
        }
        getListShoppinghistory()
      } catch (error) {
        console.log(error)
      }
  
    }, []);
    const pageCount = Math.ceil(allproduct.length / productPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
 
    var displayUsers = allproduct
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((p) => {
      return (
           <Shoppinghistory key={p.id} id={p.id} fecha={p.fecha} nombreProducto={p.nombreProducto} cantidad={p.cantidad} total={p.total} metodosEntrega={p.metodosEntrega} allproduct={allproduct} setAllproduct={setAllproduct} imagenesUrl={p.producto.imagenesUrl} reclamocli={p.reclamo}></Shoppinghistory>
      ); 
    });
    const handlesearch= (event)=>{
      setSearch(event.target.value)
    }
    const sendsearch = async() =>{
      debugger
      try{
        const resp = await searchproducthistory(search)
        setAllproduct(resp[1])
      }catch(error){
        console.log(error)
      }
    }
    return (
      <>
        <Header></Header>
        <div className="container" style={{ marginTop: "4rem" }}>
          <div className="input-group">
            <div className="form-outline">
              <input id="search-input" type="search" onChange={handlesearch} className="form-control"></input>
              <label className="form-label" htmlFor="form1">Search</label>
            </div>
            <button id="search-button" onClick={sendsearch} type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="main-box clearfix">
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th><span>Producto</span></th>
                        <th><span>Nombre Producto</span></th>
                        <th ><span>Cantidad</span></th>
                        <th><span>Precio</span></th>
                        <th><span>Fecha</span></th>
                        <th><span>Reclamo</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayUsers}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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