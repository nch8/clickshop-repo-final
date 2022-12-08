import Header from "./header";
import ListProduct from "./listproduct";
import Listuser from "./listuser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgheader from '../assets/ecommerceheader.png'
const Home = () =>{
    return (
      <>
        <Header></Header>
        <header className="bg-dark py-5 header-menu">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white" style={{backgroundImage:{imgheader}}}>
              
            </div>
          </div>
        </header>
        <ListProduct></ListProduct>
      </>
      );
}

export default Home;
