import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
  import React from "react";
  import Header from "./header";
  import {Link} from 'react-router-dom';
  import { useState,useEffect } from 'react';
  import { getProductCart, deleteProductCart } from "../services/service";
  import {
      PayPalScriptProvider,
      PayPalButtons,
      usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import ButtonWrapper from "./paypalCart";
import { totalizarcompra } from "../services/service";
import Shopcarproduct from "./shopcarproduct";
// This values are the props in the UI

  export default function ShopCart() {
    const currency = "USD";
    const [productos, setproductos] = useState([]);
    const [preciototal, setPreciototal] =useState(0);
    const [cantproductos, setCantProducto] =useState(0);
    const [renderPago, setRenderPago] =useState(false);
    var totalprecio=0;
    useEffect(() => {
      try {
        async function getProduct() {
          const res = await getProductCart();
          const arrprod = res[1];
          setproductos(arrprod)
          arrprod.forEach(function (p) {
            console.log(p.total)
            totalprecio = totalprecio +  p.total
            setPreciototal(totalprecio)
          });
          setCantProducto(arrprod.length)
        }
        getProduct()
        //const img = getImageProduct()
      } catch (error) {
        console.log(error)
      }

    }, []);

    
    
    let removeFormFields = async (i) => {
      try{
        console.log(i);
        const idProducto = productos[i].idProducto;
        let newproductos = [...productos];
        newproductos.splice(i, 1);
        setproductos(newproductos)
        debugger
        if(newproductos.length <=0){
          setPreciototal(totalprecio)
        }else{
          newproductos.forEach(function(p) {
            totalprecio = totalprecio+p.total
            console.log(totalprecio)
            setPreciototal(totalprecio)
         });
        }
        setCantProducto(newproductos.length)
        const res = await deleteProductCart(idProducto)
      }catch(error){
        console.log(error)
      }
  }
  let comenzarPago = async () =>{
    try{
      const res = await totalizarcompra();
      if(res=='Exito'){
        setRenderPago(true)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <Header></Header>
      <section className="h-custom" style={{ backgroundColor: "#eee",height:'100vh'}}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Carrito de compras
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                            Cantidad Productos : {cantproductos}
                          </MDBTypography>
                        </div>
                        {productos.map((element, index) => (
                          <Shopcarproduct imagenesUrl={element.dtProducto.imagenesUrl} id={element.idProducto} nombreProducto={element.nombreProducto} cantidad={element.cantidad} total={element.total} productos={productos} setproductos={setproductos}></Shopcarproduct>
                        ))}
                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <Link className="text-body" to='/home'>
                              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Vovler a la tienda
                            </Link>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Resumen
                        </MDBTypography>

                        <hr className="my-4" />


                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            PRECIO TOTAL
                          </MDBTypography>
                          <MDBTypography tag="h5">${preciototal}</MDBTypography>
                        </div>
                        {!renderPago && <button className="btn btn-dark" onClick={comenzarPago}>Comenzar compra</button>}
                        {renderPago && <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                          <PayPalScriptProvider
                            options={{
                              "client-id": "Ab5QCDojr8-_SiXyMXmEv9GRITDE11topuPaRnlczXy4Ud39lkD0b5CQOoBwcbgyKCsd2ObQERJX08Gc",
                              components: "buttons",
                              currency: "USD"
                            }}
                          >
                            <ButtonWrapper
                              currency={currency}
                              showSpinner={false}
                              preciototal={preciototal}
                            />
                          </PayPalScriptProvider>
                        </div>}
                          
                        
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      
    </>
  );
  }