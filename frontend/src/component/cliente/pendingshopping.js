import { useState,useRef } from 'react'
import { Noti,NotiError,NotiLoading } from '../Notification';
import { confirmpendingshopping } from '../../services/service';
import { storage } from "../firebase";
const Pendingshopping = ({id,fecha,nombreProducto,cantidad,total,tipoEntrega,allproduct,setAllproduct,imagenesUrl}) =>{
    const [imagenret, setImagenret] =useState('');
    const [url, setUrl] =useState('');
    const formatearFecha = (fecha) =>{
        debugger
        if(fecha !='' && fecha !=undefined){
            const fechafor = fecha.split('T')
            const hour = fechafor[1].split('.');
            return fechafor[0]+' '+hour[0];
        }
        return '';
    }
    const handlconfirm = async () =>{
        try{
            const res = await confirmpendingshopping(id);
            let allproductG = allproduct.filter(x => x.id !== id);
            setAllproduct(allproductG)
            if(res[0]=='Exito'){
                Noti('Se confirmo la entrega del producto con exito')
                
            }
            else{
                NotiError('Error al asignar fecha')
            }
        }catch(error){

        }
    }

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
    return (
        <>
            <tr>
                <td>
                    <div className="d-flex justify-content-center">
                        <ViewImgs></ViewImgs>
                    </div>
                </td>
                <td className="text-center">
                    <span className="label label-default">{nombreProducto}</span>
                </td>
                <td className="text-center">
                    <span className="label label-default">{cantidad}</span>
                </td>
                <td>
                    <span className="label label-default">${total}</span>
                </td>
                <td>
                    <span className="label label-default">{formatearFecha(fecha)}</span>
                </td>
                <td>
                    <span className="label label-default">{tipoEntrega}</span>
                </td>
                <td style={{ width: " 20%" }}>
                    <button style={{ padding: "0px", fontSize: "20px" }} className="table-link" onClick={handlconfirm}>
                        <span className="fa-stack">

                            <i class="fa-solid fa-square-check"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </>
      );
}

export default Pendingshopping;
