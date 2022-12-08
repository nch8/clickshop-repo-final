
import { useState } from 'react'
import { DireccionMod ,DireccionDel} from "../services/service";
import { Noti,NotiError } from './Notification';
const Addresses = ({id,calle, numero, apto, barrio, ciudad, departamento, principal,direcciones, setDireciones}) =>{
  const [dire, setDire] = useState({
    calle:calle,
    numero:numero,
    apto:apto,
    barrio:barrio,
    ciudad:ciudad,
    departamento:departamento,
    principal:principal
  });
  const handleInputChange =(event) =>{
    setDire({
      ...dire,
      [event.target.name] : event.target.value
    })
  }
  const handlesendDir = async () =>{
    const res = await DireccionMod(id,dire)
    if(res=='Exito'){
      Noti('La direccion fue modificada')
    }else{
      NotiError('Error al modificar la direccion')
    }
  }
  const handlesendDirDele = async () =>{
    const res = await DireccionDel(id)
    if(res=='Exito'){
      Noti('La direccion fue eliminada')
      let alldirG = direcciones.filter(x => x.id !== id);
      setDireciones(alldirG)
    }else{
      NotiError('Error al eliminar la direccion')
    }
  }
    return (
      <>
       
        <div className="col-md-12">
          <label className="labels">Calle</label><input type="text"  onChange={handleInputChange} name="calle" className="form-control" placeholder="experience" defaultValue={calle}></input>
        </div> <br></br>
        <div className="col-md-12">
          <label className="labels">Numero</label><input type="text" onChange={handleInputChange} name="numero" className="form-control" placeholder="experience" defaultValue={numero}></input>
        </div> <br></br>
        <div className="col-md-12">
          <label className="labels">Apartamento</label><input type="text" onChange={handleInputChange} name="apto" className="form-control" placeholder="experience" defaultValue={apto}></input>
        </div> <br></br>
        <div className="col-md-12">
          <label className="labels">Barrio</label><input type="text" onChange={handleInputChange} name="barrio" className="form-control" placeholder="experience" defaultValue={barrio}></input>
        </div> <br></br>
        <div className="col-md-12">
          <label className="labels">Ciudad</label><input type="text" onChange={handleInputChange} name="ciudad" className="form-control" placeholder="experience" defaultValue={ciudad}></input>
        </div> <br></br>
        <div className="col-md-12">
          <label className="labels">Departamento</label><input type="text" onChange={handleInputChange} name="departamento" className="form-control" placeholder="experience" defaultValue={departamento}></input>
        </div> <br></br>
        <div className="d-flex justify-content-center align-items-center ">
          <button onClick={handlesendDir}> <i class="fa-solid fa-pen-to-square"></i>Modificar</button>
          <button onClick={handlesendDirDele}> <i class="fa-solid fa-trash"></i>Eliminar</button>
        </div>
        <hr></hr>
      </>
      );
}

export default Addresses;
