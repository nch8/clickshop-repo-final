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
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { deleteProductCart } from "../services/service";
import { Noti,NotiError } from "./Notification";
import { storage } from "./firebase";
const Shopcarproduct = ({id,nombreProducto,cantidad,total,imagenesUrl,productos, setproductos}) =>{
    debugger
    const [imagenes, setImagenes] =useState('');
    const [url, setUrl] =useState('');
    
    let removeFormFields = async (i) => {
        try{
          const res = await deleteProductCart(id)
          if(res[0]=='Exito'){
            Noti('Producto eliminado del carrito')
            let productosG = productos.filter(x => x.idProducto !== id);
            setproductos(productosG)
          }else{
            NotiError('Error al eliminar el producto del carrito')
          }
        }catch(error){
          console.log(error)
        }
    }
    const ViewImgs = () =>{
        if(imagenesUrl.length>0){
            imagenesUrl.forEach(element => {
                if(element !=''){
                    setImagenes(element)
                }
            });
            if(imagenes != ''){
                storage
            .ref("images")
            .child(imagenes)
            .getDownloadURL()
            .then(url => {
                setUrl(url)
            });
            
            return(
                <img className="" style={{height:'130px',width:'130px'}} src={url} alt="..." />
            )
            }else{
                return <img className="" style={{height:'130px',width:'130px'}} src='https://img.icons8.com/bubbles/2x/000000/product.png' alt="..." />
            }
            
        }
    }
    return (
      <>
        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                            <hr className="my-4" />
                            <MDBCol md="2" lg="2" xl="2">
                              <ViewImgs></ViewImgs>
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <MDBTypography tag="h6" className="text-muted">
                                Nombre
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                {nombreProducto}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="">
                              <MDBTypography tag="h6" className="text-muted">
                                Cantidad
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                {cantidad}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="">
                              <MDBTypography tag="h6" className="text-muted">
                                Precio
                              </MDBTypography>
                              <MDBTypography tag="h6" className="text-black mb-0">
                                $ {total}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                              <button className="text-muted" onClick={() => removeFormFields(id)}>
                                <MDBIcon fas icon="times" />
                              </button>
                            </MDBCol>
                            <hr className="my-4" />
                          </MDBRow>
      </>
      );
}

export default Shopcarproduct;
