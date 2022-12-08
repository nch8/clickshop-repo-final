import { Form } from 'react-bootstrap';
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { createnewadmin } from '../../services/service';
import { Noti,NotiError } from '../Notification';
const CreateAdmin = ({modalShow,setModalShow}) =>{
    
    const [datos, setDatos] = useState({
        mailregistro : '',
        contraseñaregistro : '',
    });
  const handleInputChange =(event) =>{
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
    console.log(datos)
  }
  const handlsend = async () =>{
    debugger
    if(datos.mailregistro !='' && datos.contraseñaregistro !=''){
        try{
            const res = await createnewadmin(datos.mailregistro,datos.contraseñaregistro)
            if(res == 'Exito'){
                Noti('Se creo el usuario correctamente')
            }else{
                NotiError('Error al crear el usuario')
            }
        }catch(error){
            console.log(error)
        }
    }else{
        if(datos.mailregistro ==''){
            NotiError('Es obligatorio ingresar un correo')
        }else{
            NotiError('Es obligatorio ingresar una contraseña')
        }
    }
    
  }
    return (
        <>
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='moda-registro-header'>
                    <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{ width: '100%' }}>
                        <h5 className="modal-title" id="exampleModalLabel">Crear Administrador</h5>
                        <i onClick={() => setModalShow(false)} className="fa-solid fa-xmark"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-registro flex-column align-items-center'>
                    <Form.Group controlId="dob" className='d-flex flex-column' style={{width:'50%'}}>
                    <div className="form-group">
                        <input type="mail"  onChange={handleInputChange}  name="mailregistro"  id="mailregistro" className="form-control" aria-describedby="emailHelp" placeholder="Correo"></input>               
                    </div>
                    <div className="form-group">
                        <input type="password"  onChange={handleInputChange}  name="contraseñaregistro"  id="contraseñaregistro" className="form-control" aria-describedby="emailHelp" placeholder="Contraseña"></input>
                        
                    </div>
                   
                    </Form.Group>
                    <button className="btn btn-info btn-block my-4" onClick={handlsend} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px", width: '50%' }}>CONFIRMAR </button> 
                </Modal.Body>
            </Modal>
        </>
      );
}

export default CreateAdmin;
