
    import React from "react";
    import Header from "../header";
    import { useState,useEffect } from 'react';
    import { listSellerRquest } from "../../services/service";
    import ReactPaginate from "react-paginate";
    import SellerRequest from "./sellerRequest";
  // This values are the props in the UI
  
    export default function ListSellerRequest() {
      const [alluser, setAlluser] = useState([
      ]);
    const [pageNumber, setPageNumber] = useState(0);
    
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    useEffect(() => {
      try {
        async function getListSellerRequest() {
          const res = await listSellerRquest()
          if(res[0]!="No se han encontrado usuarios para listar"){
            const arrprod = res[1];
            setAlluser(arrprod)
          }
          
        }
        getListSellerRequest()
      } catch (error) {
        console.log(error)
      }
  
    }, []);
    
    const pageCount = Math.ceil(alluser.length / productPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
 
    const displayUsers = alluser
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((p) => {
      return (
            <SellerRequest key={p.idVendedor} idVendedor={p.idVendedor} nombreComercial={p.nombreComercial} habilitado={p.habilitado} alluser={alluser} setAlluser={setAlluser}></SellerRequest>
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
                                          
                                            <th><span>Id Vendedor</span></th>
                                            <th ><span>Nombre Comercio</span></th>
                                            <th><span>Aprobar/Rechazar</span></th>
                                            <th><span>Confirmar</span></th>
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