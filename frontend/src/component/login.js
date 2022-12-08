
// import your route components too
import { useState } from 'react'
import image from "../assets/login.jpg";
import logo from "../assets/CSFinal-3.png";
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './registro';
import { loginUser } from '../services/service';
import { Noti,NotiError } from './Notification';
import Modal from 'react-bootstrap/Modal';
import { recuperarContraseña } from '../services/service';
const Login = () =>{
   const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalPass, setmodalPass] = useState(false);
  const [mailrec, setMailrec] = useState(true);
  const [estadomail, setEstadomail] = useState(true);
  const [estadocontra, setEstadocontra] = useState(true);
  const [datoslogin, setDatoslogin] = useState({
    maillogin : '',
    contrasenialogin : '',
  });

  const handleInputChange =(event) =>{
    setDatoslogin({
      ...datoslogin,
      [event.target.name] : event.target.value
    })
  }
  
  const handlelogin = async (event) => {
    event.preventDefault();
    if(datoslogin.maillogin != '' && datoslogin.contrasenialogin !=''){
      try{        
        const resp = await loginUser(datoslogin);
       // setMensaje(resp)
        debugger
        if(resp[0] == 'Exito'){
          sessionStorage.setItem("user", resp[1]);
          sessionStorage.setItem("rol", resp[3]);
          sessionStorage.setItem("token", resp[2]);
          if(resp[3] == 'ROL_ADMIN'){
            navigate('/userlist')
          }else{
            navigate('/home')
          }
         
        }else{
          NotiError(resp[0])
        }
      }catch(error){
        console.log(error)
      }
    }else{
      datoslogin.maillogin == '' && NotiError('Es necesario ingesar correo')
      if(datoslogin.contrasenialogin == '' && datoslogin.maillogin !='')   NotiError('Es necesario ingesar contraseña') 
    }
    
  }
  const handlrecuperar = async ()=>{
    try{
      debugger
      const res = await recuperarContraseña(mailrec)
      if(res=='Exito'){
        Noti('Se envio un correo para continuar con la recuperación de la contraseña')
      }else{
        NotiError('Error al recuperar la contraseña')
      }
    }catch{

    }
  }
    return (
      <>
        <Registro show={modalShow} onHide={() => setModalShow(false)} />
        <section className="vh-100" style={{ backgroundColor: "#007f61" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img src={image} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }} ></img>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">

                        <form>

                          <div className="d-flex align-items-center mb-3 pb-1">
                            <img src={logo} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} ></img>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3">Iniciar sesión</h5>

                          <div className="form-group">
                            <input type="email" onChange={handleInputChange} name="maillogin" id="maillogin" className="form-control"  placeholder="Correo" />
                            {estadomail == false ? <div role="alert" style={{color:'#842029'}}>Se deba ingresar un correo!</div>: ''}
                          </div>
                          
                          <div className="form-group">
                            <input type="password"  onChange={handleInputChange}  name="contrasenialogin" id="contrasenialogin" className="form-control" placeholder="Contraseña" />
                            {estadocontra == false ? <div role="alert" style={{color:'#842029'}}>Se deba ingresar una contraseña!</div>: ''}
                          </div>

                          <div className="pt-1 mb-4">
                            
                              <button className="btn btn-info btn-block my-4" onClick={handlelogin}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Login</button>                                                      
                          </div>

                          <a type="button" className="blink-dark" onClick={()=>setmodalPass(true)}>¿Se te olvidó tu contraseña?</a>
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>¿No tienes una cuenta?<a type="button" className="blink-dark"  onClick={() => setModalShow(true)}
                            style={{ color: "#393f81" }}> Registrarse aquí </a></p>                            
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <Modal
          show={modalPass}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="modal-30w"
        >
          <Modal.Header className='moda-registro-header'>
            <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between' style={{ width: '100%' }}>
              <h5 className="modal-title" id="exampleModalLabel">Recuperar Contraseña</h5>
              <i type="button" onClick={() => setmodalPass(false)} className="fa-solid fa-xmark"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-registro d-flex flex-column p-5'>
            <div className="form-group">
              <h4  className='text-center'>Para empezar, por favor ingresa tu e-mail </h4>
              <input type="email" onChange={(e)=>setMailrec(e.target.value)} className="form-control" placeholder="name@example.com"></input>
            </div>
            <button className="btn btn-info btn-block my-4" onClick={handlrecuperar}  type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Recuperar</button>
          </Modal.Body>
        </Modal>
      </>
      );
}

export default Login;
