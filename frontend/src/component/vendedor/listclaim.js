import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import Header from "../header";
import Claim from "./claim";
import { listclaim } from "../../services/service";
import '../../assets/listuser.css'
const ListClaim= () =>{
    const [allproduct, setAllProduct] = useState([
    ]);
  const [pageNumber, setPageNumber] = useState(0);
  
  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  useEffect(() => {
    try {
      async function getListClaim() {
        const res = await listclaim()
        debugger
        const arrprod = res[1];
        setAllProduct(arrprod)
      }
      getListClaim()
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
        <>
            <Claim key={p.idCompra} idCompra={p.idCompra} estado={p.estado} resolucion={p.resolucion} descripcion={p.descripcion} fechaUltEstado={p.fechaUltEstado} id={p.infoCompra.id} fecha={p.infoCompra.fecha} nombreProducto={p.infoCompra.nombreProducto} cantidad={p.infoCompra.cantidad} total={p.infoCompra.total} metodosEntrega={p.infoCompra.metodosEntrega} entrega={p.infoCompra.entrega}></Claim>
      </>
    ); 
  });
  return (
    <>
      <Header></Header>
      <div className="container" style={{ marginTop: "4rem" }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>

                      <th><span>Id Compra</span></th>
                      <th><span>Nombre Producto</span></th>
                      <th className="text-center"><span>Descrición</span></th>
                      <th><span>Fecha Compra</span></th>
                      <th><span>Precio</span></th>
                      <th><span>Estado</span></th>
                      <th>&nbsp;</th>
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

export default ListClaim;