import { useState,useEffect } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import { Rating } from 'react-simple-star-rating'
import { storage } from "../firebase";
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { qualificationClient,qualificationClientMod, qualificationClientDelete } from '../../services/service';
const QualificationClient = ({id, nombre, imagenesUrl, descripcion, precio, categoria,calificacionCli,idCliente}) =>{
    const [modalShow, setModalShow] = useState(false);
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
    const [rating, setRating] = useState(0)
    const [comentario, setComentario] =useState('');
    const [initRating, setInitRating] =useState();
    debugger
    useEffect(() => {
        if(calificacionCli != undefined){
            if(calificacionCli.estrellas != undefined){
                setInitRating(calificacionCli.estrellas)
                setComentario(calificacionCli.comentario)
            }
        }
      }, []);
    
    const ViewImgs = () =>{
        debugger
       if(imagenesUrl.length>0){
        imagenesUrl.forEach(element => {
            debugger
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
    const handleRating = (rate) => {
        console.log(rate)
        setRating(rate)
        
        // other logic
      }

      const handlesubmit = async ()=>{
        try{
            if(rating >0){
                const res = await qualificationClient(id,rating,comentario,idCliente)
                if(res=='Exito'){
                    Noti('Calificación enviada');
                    setModalShow(false)
                    setInitRating(rating)
                }else{
                    NotiError('No se puedo enviar la calificación')
                }
            }
            else{
                NotiError('Debe ingresar una calificación primero')
            }
            
        }catch(error){
            console.log(error)
        }
      }
      const handlemodi = async () =>{
        try{
            const res = await qualificationClientMod(id,rating,comentario,idCliente)
            if(res=='Exito'){
                debugger
                Noti('Calificación modificada');
                setModalShow(false)
                setInitRating(rating)
            }else{
                NotiError('No se puedo modificar la calificación')
            }
        }catch(error){
            console.log(error)
        }
      }
      const deletequalification = async () =>{
        debugger
        try{
            const res = await qualificationClientDelete(id,rating,comentario,idCliente)
            if(res=='Exito'){
                Noti('Calificación eliminada');
                setModalShow(false)
                setInitRating(0)
                setComentario('')
            }else{
                NotiError('No se puedo eliminar la calificación')
            }
        }catch(error){
            console.log(error)
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
                <td className="text-center">
                    <span className="label label-default">{nombre}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{descripcion}</span>
                </td>
                <td>
                    <span className="label label-default">${precio}</span>
                </td>
                <td>
                    <span className="label label-default">{categoria}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={() => setModalShow(true)}>
                        <span className="fa-stack">

                        <i class="fa-solid fa-star"></i> 
                        </span>
                    </button>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={deletequalification}>
                        <span className="fa-stack">

                        <i class="fa-solid fa-trash"></i>
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
                        <h5 className="modal-title" id="exampleModalLabel">Calificar Cliente</h5>
                        <i onClick={() => setModalShow(false)} className="fa-solid fa-xmark"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-registro flex-column align-items-center'>
                    <Form.Group controlId="dob" className='d-flex flex-column' >
                    <Rating
                        onClick={handleRating}
                        initialValue={initRating}
                            /* Available Props */
                    />
                   
                    </Form.Group>
                    <label htmlFor="exampleFormControlTextarea1">Descripción:</label>
                    <textarea className="form-control" value={comentario} style={{width:'60%'}} id="exampleFormControlTextarea1" onChange={(e) => setComentario(e.target.value)} rows="3"></textarea>
                    {initRating >0 ?<button className="btn btn-info btn-block my-4" onClick={handlemodi} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '50%' }}>MODIFICAR </button> :<button className="btn btn-info btn-block my-4" onClick={handlesubmit} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '50%' }}>CONFIRMAR</button>}
                </Modal.Body>
            </Modal>
        </>
      );
}

export default QualificationClient;
