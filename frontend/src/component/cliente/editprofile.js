
// import your route components too
import { useState,useEffect } from 'react'
import AddDireccion from './addDireccion';
import Header from '../header';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Addresses from '../addresses';
import {useNavigate} from 'react-router-dom';
import { qualificationAverage,getdateUser,getDireccion,editPerfile,cuentaDelete,habilitarEnviosVendedor } from '../../services/service';
import { Noti, NotiError } from '../Notification';
const EditPerfile = () =>{
  const [modalShow, setModalShow] = useState(false);
  const [qualification, setQualification] = useState(0);
  const [fecnac, setFecnac] = useState('');
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [datouser, setDatouser] = useState({
    id:'',
    nombre:'',
    apellido:'',
    documento:'',
    fechaNacimiento:''
  });
  const [direcciones, setDireciones] = useState([]);
  const [tipouser, setTipouser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function getqualification() {
        const res = await qualificationAverage()
        if(res[0] =='Exito'){
          setQualification(res[1])
        }
        
       
      }
      getqualification()
      async function getUserDate() {
        const res = await getdateUser()
        debugger
          setDatouser({
          id:res[0].id,  
          nombre:res[0].nombre,
          apellido:res[0].apellido,
          documento:res[0].documento,
          fechaNacimiento:res[0].fechaNacimiento
        })
        setFecnac(formatearFecha(res[0].fechaNacimiento))
        setTipouser(res[1]);
      }
      getUserDate()

      async function getUserDir() {
        const res = await getDireccion() 
        
        setDireciones(res);
            
      }
      getUserDir()
      
    } catch (error) {
      console.log(error)
    }
  }, []);

  const RenderRating = () =>{
    const row = [];
    for (var i = 0; i < qualification; i++) {
      row.push(<i key={i} className="fa fa-star"></i>);
    }
    return row;
  }
  const formatearFecha = (fecha) =>{
    if(fecha !='' && fecha !=undefined){
        const fechafor = fecha.split('T')
        const hour = fechafor[1].split('.');
        return fechafor[0];
    }
    return '';
  }

  const RenderDirecciones = () =>{
    debugger
    if(direcciones!=undefined){
      var listDir= direcciones.map((d) =>{
        if(d.id !='' && d.calle !=''){
          return(
            <Addresses key={d.id} id={d.id} calle={d.calle} numero={d.numero} apto={d.apto} barrio={d.barrio} ciudad={d.ciudad} departamento={d.departamento} principal={d.principal} direcciones={direcciones} setDireciones={setDireciones}></Addresses>
          )
        }
      }
      );
      return listDir
    }
    
  }
  const handleEdit = async () =>{
    try{
      const res = await editPerfile(datouser,fecnac);
      if(res=='Exito'){
        Noti('Perfil modificado')
      }else{
        NotiError('Error al modificar el perfil')
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const handleInputChange =(event) =>{
    setDatouser({
      ...datouser,
      [event.target.name] : event.target.value
    })
    console.log(datouser)
  }
  const handleDelete = async () =>{
    debugger
    try{
      const res = await cuentaDelete();
      if(res=='Exito, se ha eliminado la cuenta de usuario'){
        sessionStorage.setItem("user",'');
        sessionStorage.setItem("rol", '');
        sessionStorage.setItem("token", '');
        navigate('/')
      }
      else if(res == "Error, no se ha eliminado la cuenta de usuario, el vendedor tiene compras pendientes"){
        NotiError("Error, no se ha eliminado la cuenta de usuario, el vendedor tiene compras pendientes")
      }
      else{
        NotiError('Error al eliminar perfil')
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const habilitarEnvio = async (esthab) =>{
    try{
      const res = await habilitarEnviosVendedor(esthab);
      if(res=='Exito'){
        if(esthab){
          Noti('Se habilito el envio con exito')
        }else{
          Noti('Se deshabilito el envio con exito')
        }
      }else{
        if(esthab){
          NotiError('No se puedo habilitar el envio')
        }else{
          NotiError('No se puedo deshabilito el envio')
        }
      }
    }catch(error){
      console.log(error)
    }
  }
    return (
      <>
      
        <Header></Header>

  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><span class="font-weight-bold">{datouser.nombre+ ' ' +datouser.apellido}</span><span>{datouser.correo} </span>
            <div className="ratings d-flex flex-column" style={{width:'280px'}}>
                      <span>Calificacion Promedio</span>
                      <span className="product-rating">{qualification}</span>
                      <div className="stars">
                        <RenderRating></RenderRating>
                      </div>

                      <div className="rating-text">
                      </div>

                    </div>
            </div>
            {
              tipouser =='ROL_VENDEDOR' && <div className='d-flex'>
              <button className="btn btn-info btn-block my-3 mr-2" onClick={() => habilitarEnvio(true)}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Habilitar Envios</button>
              <button className="btn btn-info btn-block my-3" onClick={() => habilitarEnvio(false)}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Deshabilitar Envios</button>  
            </div> 
            }
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Perfil</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Nombre</label> <input type="text" onChange={handleInputChange} name="nombre" defaultValue={datouser.nombre} className="form-control"  placeholder="Nombre" /></div>
                    <div class="col-md-6"><label class="labels">Apellido</label><input type="text" onChange={handleInputChange} name="apellido" defaultValue={datouser.apellido} class="form-control" placeholder="Apellido"></input></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Documento</label><input type="text" onChange={handleInputChange} name="documento" class="form-control" placeholder="Documento" defaultValue={datouser.documento}></input></div>
                </div>
                <div class="row mt-3">
                <Form.Group controlId="dob">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control type="date" onChange={(e)=>setFecnac(e.target.value)} defaultValue={formatearFecha(datouser.fechaNacimiento)} name="fechas" placeholder="Date of Birth" />
              </Form.Group> 
                </div>
                <button className="btn btn-info btn-block my-3" onClick={handleEdit}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Editar Perfil</button>
                <button className="btn btn-info btn-block my-3" onClick={() => setModalShowDelete(true)}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Eliminar Cuenta</button>
            </div>
        </div>
        <div class="col-md-4">
        <button onClick={() => setModalShow(true)} >Agregar direccion</button>
            <div class="p-3 py-5 srollx" style={{height:'650px'}}>
                <RenderDirecciones></RenderDirecciones>
            </div>
        </div>
        </div>
      </div>
    

        <div className="d-flex justify-content-center">

        
          <div className="content text-center">
          


          </div>

        </div>
        <AddDireccion show={modalShow} setModalShow={setModalShow} direcciones={direcciones} setDireciones={setDireciones}/>
        <Modal
          show={modalShowDelete}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-30w"
          centered
        >
          <Modal.Header className='moda-registro-header'>
            <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{ width: '100%' }}>
                        <h5 className="modal-title" id="exampleModalLabel">Eliminar Cuenta</h5>
                        <i onClick={() => setModalShowDelete(false)} className="fa-solid fa-xmark"></i>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-registro d-flex flex-column justify-content-center align-items-center'>
            <p>¿Esta seguro que desa eliminar su cuenta?</p>
            <div className='d-flex justify-content-center'>
              <button className="btn btn-info btn-block my-4 mr-3"onClick={handleDelete} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>CONFIRMAR</button>
              <button className="btn btn-info btn-block my-4" onClick={() => setModalShowDelete(false)}    type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>CANCELAR</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
      );
}

export default EditPerfile;
