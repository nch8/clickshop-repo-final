import { useState} from 'react';
import { addProductCart } from '../services/service';
import { storage } from "./firebase";
import { Noti, NotiError } from './Notification';
const Product = ({nombre,precio,id,imagenesUrl}) =>{
    const [count, setCount] = useState(1);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const handleaddcart = async (event) =>{
        const product = {
            id:event.target.name,
            countproduct:count
        }
        try{
            const res = await addProductCart(product)
            if(res[0]=="Exito"){
                Noti('Producto agregado al carrito');
            }else{
                NotiError('No se pudo agregar producto al carrito')
            }
          }catch(error){
              console.log(error)
          }
    }
    const ViewImgs = () =>{
        if(imagenesUrl.length>0){
            imagenesUrl.forEach(element => {
                if(element !=''){
                    setImage(element)
                }
            });
            if(image != ''){
                storage
            .ref("images")
            .child(image)
            .getDownloadURL()
            .then(url => {
               setUrl(url)
            });
            
            return(
                <img className="card-img-top" src={url} alt="..." />
            )
            }else{
                return <img className="card-img-top" src='https://img.icons8.com/bubbles/2x/000000/product.png' alt="..." />
            }
            /**/
        }
        
    }
    return (
        <>
            <div className="col mb-5">
                <div className="card h-100">


                    <ViewImgs></ViewImgs>

                    <div className="card-body p-4">
                        <div className="text-center">

                            <h5 className="fw-bolder">{nombre}</h5>

                            <div className="d-flex justify-content-center small text-warning mb-2">
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                                <div className="bi-star-fill"></div>
                            </div>

                            <span className="text-muted">${precio}</span>
                        </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="d-flex align-items-center justify-content-center">
                            <button onClick={() => setCount(count - 1)} className="ripple ripple-surface btn btn-link px-2" role="button"><i className="fas fa-minus"></i></button>
                            <div className="form-outline"><p type="number" className="form-control active form-control-sm" min="0" style={{marginBottom:0}}>{count}</p>
                                <div className="form-notch"><div className="form-notch-leading">
                                </div>
                                    <div className="form-notch-middle" style={{ width: "0px" }}>
                                    </div>
                                    <div className="form-notch-trailing">
                                    </div>
                                </div>
                            </div>
                            <button  onClick={() => setCount(count + 1)}  className="ripple ripple-surface btn btn-link px-2" role="button"><i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="text-center"><button name={id} className="btn btn-outline-dark mt-auto" onClick={handleaddcart}>Agregar al carrito</button></div>
                        
                    </div>
                    
                </div>
            </div>

            
        </>
      );
}

export default Product;
