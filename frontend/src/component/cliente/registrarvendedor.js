
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import CreateProduct from '../vendedor/createProduct';
import Header from '../header';
import { VendedorRegistro } from '../../services/service';
import { Noti,NotiError } from '../Notification';
const RegistroVendedor = (props) => {
  const navigate = useNavigate();
  const [cantpro, setCantpro] = useState(0)
  const [formValues, setFormValues] = useState([{  calle: '',
  numero: '',
  apto : '',
  barrio : '',
  ciudad : '',
  departamento : '',
  principal:false }])
  const [renderproducto, setRenderproducto] = useState(false)
  const [datos, setDatos] = useState({
    nombreComercial: '',
    envios: false
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
    console.log(datos)
  }
  let handleChange = (i, e) => {
    debugger
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log(formValues)
  }

  let addFormFields = () => {
    setFormValues([...formValues, {
    calle: '',
    numero: '',
    apto : '',
    barrio : '',
    ciudad : '',
    departamento : '',
    principal:false
  }])
  }
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = async (event) => {
    debugger
    try {
      if(datos.nombreComercial==''){
        NotiError('Debe ingresar nombre del comercio')
      }else{
        const resp = await VendedorRegistro(datos,formValues);
        if(resp[0] == 'Vendedor registrado'){
          setRenderproducto(true);
        }else{
          NotiError('Error al registrarse como vendedor');
        }
      } 
    } catch (error) {
      console.log(error)
    }
    setDatos({
      ...datos,
      nombreComercial: '',
      envios: false
    })
  }
  /*const validarCamposDir = (formValues) =>{
    if(formValues[0].calle==''){
      return 'Debe ingresar calle'
    }
    if(formValues[0].numero ==''){
      return 'Debe ingresar numero'
    }
    if(formValues[0].apto){
      return 'Debe ingresar '
    }
    if(formValues[0].barrio)
    if(formValues[0].ciudad)
    if(formValues[0].departamento)
  }*/
  const finalizarRegistro = () =>{
    debugger
    navigate('/home')
  }
  return (
    <>
      <Header></Header>
      {renderproducto == false &&
        <section className="vh-100" style={{}}>

          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                  <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                    <div className="form-group">
                      <input type="text" onChange={handleInputChange} name="nombreComercial" id="nombreComercial" className="form-control" placeholder="Nombre Comercial"></input>
                    </div>
                    <div className="form-group">
                      <input className="form-check-input" onChange={(event) => setDatos({ ...datos, envios: event.target.checked })} name='envios' type="checkbox" value="" id="envios"></input>
                      <label className="form-check-label" htmlFor="envios">
                        Cuenta con Envios
                      </label>
                    </div>

                    {formValues.map((element, index) => (
                      <div className="row d-flex justify-content-center align-items-center h-100" key={index}>
                        <div className="">
                          <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem" }}>
                            <div className="text-center border border-light p-5" action="#!" style={{ width: "70%" }}>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="calle" id="calle" className="form-control" placeholder="Calle"></input>
                              </div>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="numero" id="numero" className="form-control" placeholder="Numero"></input>
                              </div>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="apto" id="apto" className="form-control" placeholder="Apartamento"></input>
                              </div>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="barrio" id="barrio" className="form-control" placeholder="Barrio"></input>
                              </div>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="ciudad" id="ciudad" className="form-control" placeholder="Ciudad"></input>
                              </div>
                              <div className="form-group">
                                <input type="text" onChange={e => handleChange(index, e)} name="departamento" id="departamento" className="form-control" placeholder="Departamento"></input>
                              </div>
                              <div className="form-group">
                                <input className="form-check-input" type="checkbox" value=""name='principal' id="principal" onChange={(event) => setFormValues([{ ...formValues, principal: event.target.checked }])}></input>
                                <label className="form-check-label" htmlFor="principal">
                                  Principal
                                </label>
                              </div>
                              {
                                index ?
                                  <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                  : null
                              }
                            </div></div></div></div>
                    ))}

                    <div className="form-group">
                      <p>Cargar otra direccion</p><button type="button" className="btn btn-primary" onClick={() => addFormFields()}><i className="fa-regular fa-plus"></i></button>
                    </div>
                    <button className="btn btn-info btn-block my-4" onClick={handleSubmit} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Siguiente</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      {renderproducto == true && <><h3>Es necesario cargar 3 productos ({cantpro} de 3 productos) </h3><CreateProduct setCantpro={setCantpro} cantpro={cantpro}></CreateProduct></>}
      {cantpro >= 3 && <div className="container h-100" style={{width:"30%"}}><button className="btn btn-info btn-block my-4" onClick={()=>navigate('/home')} style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Finalizar Registro</button></div>}
    </>
  );
}

export default RegistroVendedor;
