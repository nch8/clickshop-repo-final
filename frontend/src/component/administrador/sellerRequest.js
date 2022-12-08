import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import { sellerEnable } from '../../services/service';
const SellerRequest = ({idVendedor,nombreComercial, habilitado,alluser,setAlluser}) =>{
    const [aprobado, setAprobado] = useState(true);
    
    const handlesend = async() =>{
        try{
            debugger
            
            const res = await sellerEnable(idVendedor,aprobado)
            if(res[0]=='Se ha deshabilitado al vendedor correctamente'){
                let alluserG = alluser.filter(x => x.idVendedor !== idVendedor);
                setAlluser(alluserG)
                Noti('Se ha deshabilitado al vendedor correctamente')
            }
            else if(res[0] == 'Se ha habilitado al vendedor correctamente'){
                let alluserG = alluser.filter(x => x.idVendedor !== idVendedor);
                setAlluser(alluserG)
                Noti('Se ha habilitado al vendedor correctamente')
            }
            else{
                NotiError('Error al asignar fecha')
            }
        }catch(error){

        }
    }
    const handleselect= (e) =>{ 
        debugger
        if(e.target.value == 2){
            setAprobado(false)
        }else{
            setAprobado(true)
        }
    }
    return (
        <>
        <tr>
            <td className="text-center">
                    <span className="label label-default">{idVendedor}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{nombreComercial}</span>
                </td>
                <td>
                    <span className="label label-default">

                        <select className="form-select" aria-label="Default select example" onChange={handleselect}>
                            <option value="1" defaultValue>Aprobar</option>
                            <option value="2">Rechazar</option>
                        </select>
                    </span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={handlesend}>
                        <span className="fa-stack">

                   <i className="fa-solid fa-square-check"></i>
                   </span>
               </button>
           </td>
       </tr>
 </>
      );
}

export default SellerRequest;
