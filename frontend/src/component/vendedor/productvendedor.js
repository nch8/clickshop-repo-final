import { useState,useEffect } from 'react'
import { deleteProductVendedor,updateProduct } from '../../services/service';
import { storage } from "../firebase";
import { Noti,NotiError } from '../Notification';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
const ProductVendedor = ({nombre,descripcion, categoria, stock, precio ,id,imagen,activo}) =>{
    const [url, setUrl] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [formValues, setFormValues] = useState([{ ruta: ""}])
    const [checkactivo, setCheckactivo] = useState(true);
    //const [image, setImage] = useState(null);
    const [datos, setDatos] = useState({
        nombreproducto:nombre,
        precioproducto : precio,
        stockproducto : stock,
        categoriaproducto : categoria,
        descripcionproducto : descripcion 
      });
    const handleInputChange =(event) =>{
        setDatos({
          ...datos,
          [event.target.name] : event.target.value
        })
        console.log(datos)
      }

      useEffect(() => {
        setCheckactivo(activo)
    
      }, []);

    const deleteproduct = async() =>{
        try{
            debugger
            const res = await deleteProductVendedor(id);
            if(res =='Producto dado de baja'){
                Noti('Se dio de baja el producto')
                window.location.reload(true);
            }else{
                NotiError('No se pudo dar de baja el producto')
            }
            
        }catch(error){
            console.log(error)
        }
    }
    const RenderImg = ({imagen})=>{
      storage
      .ref("images")
      .child(imagen[0])
      .getDownloadURL()
      .then(url => {
        setUrl(url)
        
      });
      return(
        <img src={url}></img>
      )
    }

    let handleChange = (i, e) => {
        debugger
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.files[0];
        setFormValues(newFormValues);
        console.log(formValues)
        //handleUpload();
        
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { ruta: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let handleSubmit = async (event) => {
        try{
            
           const resp = await updateProduct(id,datos,formValues,checkactivo);
            //setMensaje(resp)
            setDatos({
              ...datos,
              nombreproducto:'',
              precioproducto : '',
              stockproducto : '',
              categoriaproducto : ''
            })
            if(resp[0]=='Exito'){
                Noti("Producto creado correctamente")
            }else{
                NotiError("Error al crear un producto")
            }
            setFormValues([{ ruta: ""}]);
            document.getElementById('ruta').value = ''
            /*if(cantpro != undefined){
                setCantpro(cantpro+1)
            }*/
           
          }catch(error){
            console.log(error)
          }
    }
    const handlecheck = () =>{
        if(checkactivo){
            setCheckactivo(false)
        }else{
            setCheckactivo(true);
        }
    }
    return (
        <>
            <tr>
                <td>{
                    imagen != '' && <RenderImg imagen={imagen}></RenderImg>
                }

                    <a href="#" className="user-link">{nombre}</a>
                    {activo ? <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem", backgroundColor: '#00B020' }}>Activo</div> : <div className="badge text-white" style={{ top: "0.5rem", right: "0.5rem", backgroundColor: '#FF0206' }}>De Baja</div>}
                </td>
                <td>
                    {descripcion}
                </td>
                <td className="text-center">
                    <span className="label label-default">{precio}</span>
                </td>
                <td>
                    <span className="label label-default">{stock}</span>
                </td>
                <td>
                    <span className="label label-default">{categoria}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    {activo && <button onClick={() => deleteproduct(id)} className="table-link danger">
                        <i class="fa-solid fa-trash-can" style={{ fontSize: '20px' }}></i>
                    </button>}
                    <button onClick={() => setModalShow(true)} className="table-link danger">
                        <i class="fa-sharp fa-solid fa-pen-to-square" style={{ fontSize: '20px' }}></i>
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
                        <h5 className="modal-title" id="exampleModalLabel">Modificar Producto</h5>
                        <i onClick={() => setModalShow(false)} className="fa-solid fa-xmark"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-registro flex-column align-items-center'>
                    <Form.Group controlId="dob" className='d-flex flex-column' style={{ width: '100%' }}>
                        <div className="card d-flex justify-content-center align-items-center" style={{ borderRadius: "1rem", width: '100%' }}>
                            <div className="text-center border border-light p-5" action="#!" style={{ width: "100%" }}>
                                <div className="form-group">
                                    <input type="text" value={datos.nombreproducto} onChange={handleInputChange} name="nombreproducto" id="nombreproducto" className="form-control" placeholder="Nombre"></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" value={datos.precioproducto} onChange={handleInputChange} name="precioproducto" id="precioproducto" className="form-control" placeholder="Precio"></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" value={datos.stockproducto} onChange={handleInputChange} name="stockproducto" id="stockproducto" className="form-control" placeholder="Cantidad"></input>
                                </div>
                                <div className="form-group">
                                    <select className="form-select" value={datos.categoriaproducto} onChange={handleInputChange} name="categoriaproducto" id="categoriaproducto" aria-label="Default select example">
                                        <option defaultValue>Categoria</option>
                                        <option value="INDUMENTARIA">INDUMENTARIA</option>
                                        <option value="ELECTRODOMESTICOS">ELECTRODOMÉSTICOS</option>
                                        <option value="VIVERES">VIVERES</option>
                                        <option value="INSTRUMENTOS">INSTRUMENTOS</option>
                                        <option value="CALZADOS">CALZADO</option>
                                        <option value="LIBROS">LIBROS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Descripción</label>
                                    <textarea className="form-control" value={datos.descripcionproducto} onChange={handleInputChange} name="descripcionproducto" id="descripcionproducto" rows="3"></textarea>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" checked={checkactivo} onClick={handlecheck} id="flexCheckDefault"></input>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Activo
                                        </label>
                                </div>
                                <button className="btn btn-info btn-block my-4" onClick={handleSubmit} type="submit" style={{ backgroundColor: "#212326", color: "#FFFFFF", border: "0px" }}>Modificar</button>
                            </div>
                        </div>
                    </Form.Group>

                </Modal.Body>
            </Modal>
        </>
      );
}

export default ProductVendedor;
