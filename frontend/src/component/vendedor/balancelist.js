
import { MDBDataTable } from 'mdbreact';
import React, { useState,useEffect } from "react";
import { balancelist } from "../../services/service";
import { Form } from 'react-bootstrap';
import Header from '../header';
const Balancelist = () => {
  const [compras, setCompras] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [fecdes, setFecDes] = useState('');
  const [fechas, setFecHas] = useState('');
  const [montini, setmontini] = useState('');
  const [montfin, setmontfin] = useState('');
  const [categoria, setCategoria] = useState('');
  useEffect(() => {
    try {
      async function getBalancelist() {
        
        const res = await balancelist('','','','','')
        const arrprod = res;
        setCompras(arrprod)
      }
      getBalancelist()
    } catch (error) {
      console.log(error)
    }

  }, []);
  const data = {
    columns: [
      {
        label: 'Id Compra',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Nombre Producto',
        field: 'nombreProducto',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Estado',
        field: 'estado',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Cantidad',
        field: 'cantidad',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Total',
        field: 'total',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Fecha',
        field: 'fecha',
        sort: 'asc',
        width: 150
      }
    ],
    rows: compras
  };
  const handleselect= (e) =>{ 
    debugger
    if(e.target.value == 1){
      setTipoFiltro(1)
    }
    else if(e.target.value == 2){
      setTipoFiltro(2)
    }
    else{
      setTipoFiltro(3)
    }
  }
  function format(inputDate) {
    debugger
    const [year, month, day] = inputDate.split('-');

    const result = [year,month, day, ].join('/');
    return result
  }
  const handlefilter = async () =>{
    debugger
    try{
      const res = await balancelist(fecdes,fechas,montfin,montini,categoria)
        const arrprod = res;
        setCompras(arrprod)
    }catch(error){

    }
  }
  
  return (
    <>
    <Header></Header>
    
    <div className='container'>
      <select className="form-select mb-4 mt-4" aria-label="Default select example" onChange={(e) =>setTipoFiltro(e.target.value)} style={{width:'40%', marginLeft:'auto',marginRight:'auto'}}>
        <option selected>Selecciona filtro</option>
        <option value="1">Fecha</option>
        <option value="2">Monto</option>
        <option value="3">Categoria</option>
      </select>
      {tipoFiltro == 1 && <>
        <div className="d-flex flex-column justify-content-center "style={{width:'100%'}}>
        <div style={{width:'40%',marginLeft:'auto', marginRight:'auto' }}  >
          <Form.Group controlId="dob">
            <Form.Label>Fecha Desde</Form.Label>
            <Form.Control type="date" onChange={(e) =>setFecDes(format(e.target.value))} name="registrofechanac" placeholder="Date of Birth" />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Fecha Hasta</Form.Label>
            <Form.Control type="date" onChange={(e) =>setFecHas(format(e.target.value))} name="registrofechanac" placeholder="Date of Birth" />
          </Form.Group>
          </div>
          </div>
          <button className="btn btn-outline-dark" type="submit" onClick={handlefilter}> 
            Filtrar
          </button>
        </>}
        {tipoFiltro == 2 && <>
          <div>
          <div class="input-group mb-3" style={{width:'40%',marginLeft:'auto', marginRight:'auto'}}>
            <div class="input-group-prepend">
             
              <span class="input-group-text" id="basic-addon1">$</span>
            </div>
            <input type="text" class="form-control" onChange={(e) =>setmontini(e.target.value)} placeholder="Monto Desde" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div class="input-group mb-3" style={{width:'40%',marginLeft:'auto', marginRight:'auto'}}>
         
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">$</span>
            </div>
            <input type="text" class="form-control" onChange={(e) =>setmontfin(e.target.value)} placeholder="Monto Hasta" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          </div>
          <button className="btn btn-outline-dark" type="submit" onClick={handlefilter}> 
            Filtrar
          </button>
        </>} 
        {tipoFiltro == 3 && <>
        <select className="form-select" onChange={(e)=>setCategoria(e.target.value)} name="categoriaproducto" id="categoriaproducto" aria-label="Default select example">
          <option defaultValue>Categoria</option>
          <option value="INDUMENTARIA">INDUMENTARIA</option>
          <option value="ELECTRODOMESTICOS">ELECTRODOMÉSTICOS</option>
          <option value="VIVERES">VIVERES</option>
          <option value="INSTRUMENTOS">INSTRUMENTOS</option>
          <option value="CALZADOS">CALZADO</option>
          <option value="LIBROS">LIBROS</option>
        </select> 
        <button className="btn btn-outline-dark" type="submit" onClick={handlefilter}> 
            Filtrar
          </button>
        </>  }
      <MDBDataTable
        striped
        bordered
        hover
        noBottomColumns
        data={data}
      />
    </div>
    </>
  );
}

export default Balancelist;