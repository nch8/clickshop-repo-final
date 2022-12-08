import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import Modal from 'react-bootstrap/Modal';
import { sendClaim } from '../../services/service';
const Claim = ({idCompra,estado,resolucion,descripcion,fechaUltEstado,id,fecha,nombreProducto,cantidad,total,metodosEntrega,entrega}) =>{
    const [modalShow, setModalShow] = useState(false);
    const [metodo, setMetodo] = useState(0);
    const [mensaje, setMensaje] = useState(0);
    const [monto, setMonto] = useState(0);
    const [loading, setLoading] = useState(false);
    const formatearFecha = (fecha) =>{
        if(fecha !='' && fecha !=undefined){
            const fechafor = fecha.split('T')
            const hour = fechafor[1].split('.');
            return fechafor[0]+' '+hour[0];
        }
        return '';
    }
    const handlemensaje = (e) =>{
        setMensaje(e.target.value)
    }
    const handlemetodo = (e) =>{
        setMetodo(e.target.value)
    }
    const handlesend = async() =>{
        if(metodo!=0){
            try{
                setLoading(true)
                const res = await sendClaim(id,metodo,mensaje,monto)
                if(res[0]=="Exito"){
                    Noti('Se envio la gestion del reclamo con exito')
                }else{
                    NotiError("Error al enviar la gestion del reclamo")
                }
                setLoading(false)
            }
            catch(error){
    
            }
        }else{
            NotiError("Debe seleccionar un metodo primero")
        }
    }
    const RenderEstado = () =>{
        debugger
        if(estado =='INICIADO'){
             return  <p style={{color:'#0334F9',fontWeight:'700'}}>INICIADO</p>
        }
        else if(estado == 'ACEPTADO'){
             return <p style={{color:'#00B020',fontWeight:'700'}}>ACEPTADO</p>
        }
        else if(estado == 'PENDIENTE'){
             return  <p style={{color:'#FCF107',fontWeight:'700'}}>PENDIENTE</p>
        }
        else{
            return  <p style={{color:'#00B020',fontWeight:'700'}}>FINALIZADO</p>
        }
    }
    return (
        <>
            <tr>
                <td className="text-center">
                    <span className="label label-default">{idCompra}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{nombreProducto}</span>
                </td>
                <td>
                    <span className="label label-default">{descripcion}</span>
                </td>
                <td>
                    <span className="label label-default">{formatearFecha(fecha)}</span>
                </td>
                <td>
                    <span className="label label-default">${total}</span>
                </td>
                <td>
                    <span className="label label-default"><RenderEstado></RenderEstado></span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} onClick={() => setModalShow(true)} className="table-link">
                        <span className="fa-stack">

                        <i className="fa-solid fa-comment"></i>
                        </span>
                    </button>
                </td>
            </tr>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='moda-registro-header'>
                    <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{ width: '100%' }}>
                        <h5 className="modal-title" id="exampleModalLabel">Gestion</h5>
                        <i onClick={() => setModalShow(false)} className="fa-solid fa-xmark"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-registro flex-column '>
                    <section>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div className="d-flex flex-row align-items-center">
                                <h4 className="text-uppercase mt-1">Reclamo</h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0">
                                <h5 className="mb-3">Descripción:</h5>
                                <div>
                                    <p>
                                        {descripcion}
                                    </p>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex flex-row mt-1">
                                            <h6>Resolucion:</h6>
                                        </div>
                                    </div>
                                    <p>
                                        {resolucion}
                                    </p>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex flex-column mt-1">
                                        <h6>Metodo:</h6>
                                            <select onChange={handlemetodo} className="browser-default custom-select">
                                                <option defaultValue value="0" >Seleccione un metodo de gestion</option>
                                                <option value="1">Mensaje</option>
                                                <option value="2">Reenvío de producto</option>
                                                <option value="3">Reembolso total</option>
                                                <option value="4">Reembolso parcial</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {metodo == 4 && <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">$</span>
                                            </div>
                                            <input type="text" className="form-control" onChange={(e) => setMonto(e.target.value)} name="monto" placeholder="Monto" aria-label="Monto" aria-describedby="basic-addon1"></input>
                                        </div>}
                                        {metodo == 1 && <div className="form-group">
                                            <label for="mensaje">Mensaje</label>
                                            <textarea className="form-control" onChange={handlemensaje} name="mensaje" id="mensaje" rows="3"></textarea>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4 col-xl-5 offset-lg-1">
                                <div className="p-3" style={{ backgroundColor: "#eee" }}>
                                    <span className="fw-bold">Descripción de la compra</span>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Codigo de Compra</span> <span>{idCompra}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Nombre Producto</span> <span>{nombreProducto}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Cantidad</span> <span>{cantidad}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Total </span> <span>{total}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Estado </span> <span>{estado}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Fecha Compra </span> <span>{formatearFecha(fecha)}</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                    {loading && <div className="loading">Loading&#8230;</div>}
                    <button className="btn btn-info btn-block my-4" onClick={handlesend} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '50%' }}>CONFIRMAR</button>
                </Modal.Body>
            </Modal>
        </>
      );
}

export default Claim;
