import { useState,useEffect } from 'react';
import { Noti, NotiError } from '../Notification';
import { storage } from "../firebase";
const Productpending = ({ cantidad, id, total, nombre, fecha,metodoentrega,setSendpro,sendpro,dire,imagenesurl}) =>{
    const [cantenvios, setCantenvios] =useState([]);
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
    const tipoEnviohandle = (id,tipo) =>{
        debugger
        if(tipo=='ENVIO' && dire == 0){
            NotiError('Debe seleccionar una direccion primero')
        }else{
            sendpro.forEach(element => {
                if(element.idCompra == id){
                    element.tipoEntrega=tipo
                }
            });
        }
    
        
    }
    const Metodoentrega = ()=>{
        if(metodoentrega !=undefined){
            if(metodoentrega.length>1){
                return(
                    <div className="row d-flex align-items-center">
                            <div className="btn-group" >
                                <input type="radio" className="btn-check" name={'options'+id} id={'op1'+id} onClick={()=>tipoEnviohandle(id,'RETIRO')} autoComplete="off" defaultChecked={true}  />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op1'+id}><i className="fa-solid fa-shop"></i><p style={{padding:"0",margin:"0"}}>RETIRO</p></label>
    
                                <input type="radio" className="btn-check" name={'options'+id} id={'op2'+id} onClick={()=>tipoEnviohandle(id,'ENVIO')} autoComplete="off" />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op2'+id}><i className="fa-solid fa-truck"></i><p style={{padding:"0",margin:"0"}}>ENVIO</p></label>
                            </div>
                        </div>
                )
            }else{
                return(
                    <div className="row d-flex align-items-center">
                             <div className="btn-group">
                                <input type="radio" className="btn-check" name={'options'+id} id={'op1'+id} onClick={()=>tipoEnviohandle(id,'RETIRO')} autoComplete="off" defaultChecked={true} />
                                <label className="btn btn-secondary d-flex flex-column justify-content-center" htmlFor={'op1'+id}><i className="fa-solid fa-shop"></i><p style={{padding:"0",margin:"0"}}>RETIRO</p></label>
    
                            </div>
                        </div>
                )
            }
        }
       
    }
    const formatearFecha = (fecha) =>{
        const fechafor = fecha.split('T')
        return fechafor[0];
    }
    const ViewImgs = () =>{
        debugger
       if(imagenesurl.length>0){
        imagenesurl.forEach(element => {
                if(element !=''){
                    setImagenret(element)
                }
            });
            if(imagenret != ''){
                storage
            .ref("images")
            .child(imagenret)
            .getDownloadURL()
            .then(url => {
               setUrl(url)
            });
            
            return(
                <img className="" style={{width: 140, height: 140}} src={url} alt="..." />
            )
            }else{
                return <img className="" style={{width: 140, height: 140}} src='https://img.icons8.com/bubbles/2x/000000/product.png' alt="..." />
            }
          
       }
        
    }
    
    return (
        <>
            <div className="card shadow-0 border mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <ViewImgs style={{width: 140, height: 140}}></ViewImgs>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Nombre</h5>
                            <p className="text-muted mb-0">{nombre}</p>
                        </div>
                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Fecha de solicitud</h5>
                            <p className="text-muted mb-0 small">{formatearFecha(fecha)}</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Cantidad</h5>
                            <p className="text-muted mb-0 small">{cantidad}</p>
                        </div>
                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center flex-column">
                            <h5 className="text-muted mb-0">Precio</h5>
                            <p className="text-muted mb-0 small">${total}</p>
                        </div>
                    </div>
                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }}></hr>
                    
                    {
                       <Metodoentrega></Metodoentrega> 
                    }
                </div>
            </div>
        </>
      );
}

export default Productpending;
