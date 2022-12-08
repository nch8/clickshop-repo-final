import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import Header from "../header";
import QualificationSeller from "./qualificationSeller";
import '../../assets/listuser.css'
import { listshoppinghistory } from "../../services/service";
const QualificationSellerList= () =>{
    debugger
    const [allproduct, setAllProduct] = useState([
    ]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numerDelete, setNumerDelete] = useState(0);
  const [search, setSearch] = useState('');
  
  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  useEffect(() => {
    try {
      async function getListProduct() {
        const res = await listshoppinghistory()
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
        <>
            <QualificationSeller  key={p.id} idCliente={p.idCliente} id={p.id} nombre={p.nombreProducto} imagenesUrl={p.producto.imagenesUrl} descripcion={p.producto.descripcion} precio={p.total} categoria={p.producto.categoria} calificacionVen={p.calificacionVen} idVendedor={p.producto.idVendedor}></QualificationSeller>
        </>
    ); 
  });
  const handlesearch= (event)=>{
    setSearch(event.target.value)
  }
  
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

                      <th><span>Producto</span></th>
                      <th><span>Nombre</span></th>
                      <th className="text-center"><span>Descripción</span></th>
                      <th><span>Precio</span></th>
                      <th><span>Categoria</span></th>
                      <th><span>Calificar/Eliminar</span></th>
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

export default QualificationSellerList;