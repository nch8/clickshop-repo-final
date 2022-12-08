
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { getListpendingshopping } from "../../services/service";
    import ReactPaginate from "react-paginate";
    import Pendingshopping from "./pendingshopping";
  // This values are the props in the UI
  
    export default function Pendingshoppinglist() {
      const [allproduct, setAllproduct] = useState([
      ]);
    const [pageNumber, setPageNumber] = useState(0);
    
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    useEffect(() => {
      try {
        async function Listpendingshopping() {
          const res = await getListpendingshopping()
          const arrprod = res[1];
          setAllproduct(arrprod)
        }
        Listpendingshopping()
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
            <Pendingshopping id={p.id} fecha={p.fecha} nombreProducto={p.nombreProducto} cantidad={p.cantidad} total={p.total} tipoEntrega={p.entrega.tipoEntrea} allproduct={allproduct} setAllproduct={setAllproduct} imagenesUrl={p.producto.imagenesUrl}></Pendingshopping>
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
                                            <th><span>Nombre Producto</span></th>
                                            <th ><span>Cantidad</span></th>
                                            <th><span>Precio</span></th>
                                            <th><span>Fecha</span></th>
                                            <th><span>Tipo de entrega</span></th>
                                            <th><span>Confirmar entrega</span></th>
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