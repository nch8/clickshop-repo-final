import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { setFechaentrega } from '../../services/service';
import { toast } from "react-toastify";
import { storage } from "../firebase";
const ProductSetDate = ({nombreProducto,total, tipoEntrea, fecha,id,setAllProduct,allproduct,imagenesUrl}) =>{
    const [modalShow, setModalShow] = useState(false);
    const [fecdes, setFecdes] = useState('');
    const [fechas, setFechas] = useState('');
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
    const [loading, setLoading] = useState(false);
    const formatearFecha = (fecha) =>{
        
        if(fecha !='' && fecha !=undefined){
            const fechafor = fecha.split('T')
            return fechafor[0];
        }
        return '';
    }
    
    const handleDate = async() =>{
        if(fecdes>fechas){
            NotiError('La fecha desde no puede ser mayo a fecha hasta')
        }else{
            if(fecdes !=''){
                if(fechas !=''){
                    try{
                        
                        setLoading(true)
                        const res = await setFechaentrega(fecdes,fechas,id)
                        if(res=='Exito'){
                            Noti('Fecha asignada')
                            let allproductG = allproduct.filter(x => x.id !== id);
                            setAllProduct(allproductG)
                        }
                        else{
                            NotiError('Error al asignar fecha')
                        }
                         setLoading(false)
                    }catch(error){
            
                    }
                }else{
                    NotiError('Debe seleccionar una fecha hasta primero')
                }
            }else{
                NotiError('Debe seleccionar una fecha desde primero')
            }
            //do something else
            
        }
       
    }
    const ViewImgs = () =>{
        
       if(imagenesUrl.length>0){
        imagenesUrl.forEach(element => {
            
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
        <tr>
            <td>
            <div className="d-flex justify-content-center">
            <ViewImgs></ViewImgs>
                       
                   </div>
               
              
            </td>
           <td>

               <div>
                   <div className="text-center">
                       <p>{nombreProducto}</p>
                       
                   </div>
                   
               </div>
               
           </td>
           <td className="text-center">
               <span className="label label-default">${total}</span>
           </td>
           <td>
               <span className="label label-default">{tipoEntrea}</span>
           </td>
           <td>
            <span className="label label-default">{formatearFecha(fecha)}</span>
           </td>
           <td style={{width:" 20%"}}>
               <button style={{padding:"0px",fontSize :"20px"}} onClick={()=>setModalShow(true)} className="table-link">
                   <span className="fa-stack">
                       
                   <i className="fa-solid fa-calendar-days"></i>
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
          <Modal.Header  className='moda-registro-header'>
            <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{width:'100%'}}>
              <h5 className="modal-title" id="exampleModalLabel">Asignar fecha de entrega</h5>
              <i onClick={()=>setModalShow(false)} class="fa-solid fa-xmark"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-registro flex-column align-items-center'>
          {loading && <div className="loading">Loading&#8230;</div>}
              <Form.Group controlId="dob" style={{width:'50%'}}>
                            <Form.Label>Fecha de Desde</Form.Label>
                            <Form.Control type="datetime-local" onChange={(e)=>setFecdes(e.target.value)} name="fecdes" placeholder="Date of Birth" />
              </Form.Group>
              <Form.Group controlId="dob"  style={{width:'50%'}}>
                            <Form.Label>Fecha de Hasta</Form.Label>
                            <Form.Control type="datetime-local" onChange={(e)=>setFechas(e.target.value)}  name="fechas" placeholder="Date of Birth" />
              </Form.Group> 
              <button  className="btn btn-info btn-block my-4" onClick={handleDate} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width:'50%' }}>CONFIRMAR</button>          
          </Modal.Body>
        </Modal>
 </>
      );
}

export default ProductSetDate;
