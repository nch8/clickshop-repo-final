
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { listproductpendingSeller } from "../../services/service";
    import ReactPaginate from "react-paginate";
    import ProductSetDate from "./productSetDate";
  // This values are the props in the UI
  
    export default function ProductPending() {
      const [allproduct, setAllProduct] = useState([
      ]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numerDelete, setNumerDelete] = useState(0);
    
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    useEffect(() => {
      try {
          
        async function getListProduct() {
          const res = await listproductpendingSeller()
          debugger
          const arrprod = res[1];
          setAllProduct(arrprod)
        }
        getListProduct()
      } catch (error) {
        console.log(error)
      }
  
    }, []);
    const pageCount = Math.ceil(allproduct.length / productPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
 
    const displayUsers = allproduct
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((p) => {
      return (
        <ProductSetDate key={p.id} id={p.id} nombreProducto={p.nombreProducto} total={p.total} tipoEntrea={p.metodosEntrega[0]} fecha={p.fecha} setAllProduct={setAllProduct} allproduct={allproduct} imagenesUrl={p.producto.imagenesUrl}></ProductSetDate>
      ); 
    });
  
    return (
        <>
            <Header></Header>  
            <div className="container" style={{marginTop:"4rem"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Producto</span></th>
                                            <th><span>Nombre</span></th>
                                            <th ><span>Precio</span></th>
                                            <th><span>Metodo Entrega</span></th>
                                            <th><span>Fecha</span></th>
                                            <th>Asignar fecha</th>
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