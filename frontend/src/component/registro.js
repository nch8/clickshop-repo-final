import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react'
import { registerUser } from '../services/service';
import { Noti, NotiError } from './Notification';
const Registro = (props) =>{
  const [datos, setDatos] = useState({
    nombreregistro:'',
    apellidoregistro : '',
    documentoregistro : '',
    mailregistro : '',
    contraseniaregistro : '',
    registrofechanac: format(new Date()),
    calleregistro : '',
    numeroregistro : Number,
    aptoregistro : '',
    barrioregistro : '',
    ciudadregistro : '',
    departamentoegistro : ''
  });

  const [mensaje,setMensaje] = useState('')

  const handleInputChange =(event) =>{
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }
  const handleregister = async () => {
    try{
      const resp = await registerUser(datos);
      setMensaje(resp)
      setDatos({
        ...datos,
        nombreregistro : '',
        apellidoregistro : '',
        documentoregistro : '',
        mailregistro : '',
        contraseniaregistro : '',
        registrofechanac: format(new Date()),
        calleregistro : '',
        numeroregistro : Number,
        aptoregistro : '',
        barrioregistro : '',
        ciudadregistro : '',
        departamentoegistro : ''
      })
      if(resp == 'Exito'){
        Noti('Usuario registrado')
      }else{
        NotiError("No se puedo registrar el usuario")
      }
    }catch(error){
      console.log(error)
    }
    
  }
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className='moda-registro-header'>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5 className="modal-title" id="exampleModalLabel">Crear cuenta</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-registro'>
            <div className="text-center border border-light p-5" action="#!" style={{width:"70%"}}>
              <div className="form-group">
                <input type="text" value={datos.nombreregistro} onChange={handleInputChange} name="nombreregistro" id="nombreregistro" className="form-control" aria-describedby="emailHelp" placeholder="Nombre"></input>
              </div>
              <div className="form-group">
                <input type="text"  value={datos.apellidoregistro}  onChange={handleInputChange}  name="apellidoregistro" id="apellidoregistro"className="form-control" aria-describedby="emailHelp" placeholder="Apellido"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.documentoregistro} onChange={handleInputChange} name="documentoregistro"  id="documentoregistro"className="form-control" aria-describedby="emailHelp" placeholder="Documento"></input>
                
              </div>
              <Form.Group controlId="dob">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control type="date"  value={datos.registrofechanac}  onChange={handleInputChange} name="registrofechanac" placeholder="Date of Birth" />
              </Form.Group>
              <div className="form-group" style={{marginTop:'2rem'}}>
                <input type="email" value={datos.mailregistro}  onChange={handleInputChange}  name="mailregistro" id="mailregistro"className="form-control" aria-describedby="emailHelp" placeholder="Correo"></input>
                
              </div>
              <div className="form-group">
                <input type="password" value={datos.contraseniaregistro}  onChange={handleInputChange}  name="contraseniaregistro"  id="contraseniaregistro" className="form-control" aria-describedby="emailHelp" placeholder="Contraseña"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.calleregistro} onChange={handleInputChange}  name="calleregistro"  id="calleregistro"className="form-control" aria-describedby="emailHelp" placeholder="Calle"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.numeroregistro} onChange={handleInputChange}  name="numeroregistro"  id="numeroregistro"className="form-control" aria-describedby="emailHelp" placeholder="Numero"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.aptoregistro} onChange={handleInputChange}  name="aptoregistro"  id="aptoregistro"className="form-control" aria-describedby="emailHelp" placeholder="Apartamento"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.barrioregistro} onChange={handleInputChange}  name="barrioregistro"  id="barrioregistro"className="form-control" aria-describedby="emailHelp" placeholder="Barrio"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.ciudadregistro} onChange={handleInputChange}  name="ciudadregistro"  id="ciudadregistro"className="form-control" aria-describedby="emailHelp" placeholder="Ciudad"></input>
                
              </div>
              <div className="form-group">
                <input type="text" value={datos.departamentoegistro} onChange={handleInputChange}  name="departamentoegistro"  id="departamentoegistro"className="form-control" aria-describedby="emailHelp" placeholder="Departamento"></input>
                
              </div>
              <button className="btn btn-info btn-block my-4" onClick={handleregister}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Registrase</button>
            </div>
            
          </Modal.Body>
        </Modal>
        
      </>
      );
}

export default Registro;
