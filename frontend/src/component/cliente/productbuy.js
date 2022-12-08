
import React from "react";
import Header from "../header";
import { useState,useEffect } from 'react';
import { listproductpending } from "../../services/service";
import Productpending from "./productpending";
import { methodsend, getDireccion } from "../../services/service";
import { Noti, NotiError } from "../Notification";
// This values are the props in the UI

export default function ProductBuy() {
const [productos, setproductos] = useState([]);
const [arrimg, setArrimg] = useState([]);
const [preciototal, setPreciototal] =useState(0);
const [cantproductos, setCantProducto] =useState(0);
const [sendpro, setSendpro] = useState([{}]);
const [dire, setdire] = useState(0);
const [direcciones, setDirecciones] = useState([{  calle: '',
    numero: '',
    apto : '',
    barrio : '',
    ciudad : '',
    departamento : '',
    principal:false }])
var totalprecio=0;
useEffect(() => {
try {
  debugger
  async function getProduct() {
    const res = await listproductpending();
    const arrprod = res[1];
    setproductos(arrprod)
    console.log(productos)
    var arrayproducto = [];
    arrprod.forEach(function (p) {
      totalprecio = totalprecio +  p.total
      arrayproducto.push({
        idCompra:p.id,
        tipoEntrega:'RETIRO'
      })
      setPreciototal(totalprecio)
    });
    setSendpro(arrayproducto)
    setCantProducto(arrprod.length)
  }
  getProduct()
  async function getListDireccion() {
    const res = await getDireccion();
    setDirecciones(res)
  }
  getListDireccion()
} catch (error) {
  console.log(error)
}

}, []);
const handleconfirm = async ()=>{
try{
  const res = await methodsend(sendpro,dire)
  if(res[0]=='Exito'){
  Noti('Se envio metodo de entrega correctamente')
  setproductos([]);
  setCantProducto(0);
  setPreciototal(0)
  }else{
    NotiError('Error al agregar metodo de entrega')
  }
}catch(error){
    console.log(error)
}
}
const RenderDireccion = () =>{
const listItems = direcciones.map((d) => {
  return( <option key={d.id} value={d.id}>{d.ciudad}-{d.barrio}-{d.calle}-{d.numero}-{d.apto}</option>)
  
}
)
return (
  <select className="form-select" aria-label="Default select example" onChange={handleChangeSelect}>
    <option defaultValue>Selecciona direccion de envio</option>
    {listItems}
  </select>
);
}
const handleChangeSelect = (e) =>{
setdire(e.target.value)
}
return (
<>
<Header></Header>
<section className="h-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-10 col-xl-8">
        <div className="card" style={{ borderRadius: "10px" }}>
          <div className="card-header px-4 py-5">
            {
              cantproductos == 0 ? <h5 className="text-muted mb-0">No hay ordenes para listar</h5> : <h5 className="text-muted mb-0">Gracias por tu Orden, <span style={{ color: "#a8729a" }} >Anna</span>!</h5>
            }
          </div>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-column ">
              <p className="lead fw-normal mb-2" style={{ color: "#a8729a" }} >Metodo de Entrega</p>
              <p className="lead fw-normal mt-2">Si es necesario que algun producto sea con el metodo "Envio" seleccione una dirección</p>
                <RenderDireccion></RenderDireccion>
              <p className="lead fw-normal mt-2">Cantidad de productos: {cantproductos}</p>
            </div>
            {productos.map((element, index) => (
              <Productpending key={index} cantidad={element.cantidad} id={element.id} total={element.total} nombre={element.nombreProducto} imagenesurl={element.producto.imagenesUrl} fecha={element.fecha}  metodoentrega={element.metodosEntrega} sendpro={sendpro} setSendpro={setSendpro} dire={dire}></Productpending>
            ))}
            <div className="d-flex justify-content-between pt-2">
              <p className="fw-bold mb-0">Order Details</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> {preciototal}</p>
            </div>
          </div>
          <div className="card-footer border-0 px-4 py-5 card-detailfooter" style={{borderRadius:'0'}}>
          
            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
            <button className="btn btn-info btn-block"  onClick={handleconfirm} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px",height:'40px',width:'50%' }}>CONFIRMAR</button>
              Total
              paid: <span className="h2 mb-0 ms-2">$1040</span></h5>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
</>
);
}