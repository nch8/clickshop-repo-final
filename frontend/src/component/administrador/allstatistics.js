import React, { useState,useEffect,useMemo } from "react";
import Header from "../header";
import { comprasEstado,comprasFecha,tipoUsuario } from "../../services/service";
import { Form } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
const Allstatistics = () =>{
    const [estados, setEstados] = useState([]);
    const [valores, setValores] = useState([]);
    const [fecdes, setFecDes] = useState('');
    const [fechas, setFecHas] = useState('');
    const scores = valores;
  const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
  const labels = estados;
  
  const options = {
      responsive:true,
      scales:{
          y:{
              min:0
          },
      },
      plugins:{
          legend:{
              display:true,
          },
      },
  }
    const [tipoGrafica, setTipografica] = useState('');
    

    const getcomprasPorEstado = async () => {
        setTipografica('Estado')
        const res = await comprasEstado()
        const arrprod = res[1];
        debugger
        var arraykeys = Object.keys(arrprod); 
        var arrayval= Object.values(arrprod)
        setEstados(arraykeys)
        setValores(arrayval)
        
      }
      const getTipoUsuario = async () => {
        setTipografica('Usuario')
        const res = await tipoUsuario()
        const arrprod = res[1];
        debugger
        var arraykeys = Object.keys(arrprod); 
        var arrayval= Object.values(arrprod)
        setEstados(arraykeys)
        setValores(arrayval)
      }

      const getcomprasPorFecha = async () => {
        const res = await comprasFecha(fecdes,fechas)
        const arrprod = res[1];
        debugger
        var arraykeys = Object.keys(arrprod); 
        var arrayval= Object.values(arrprod)
        setEstados(arraykeys)
        setValores(arrayval)
      }

    const RenderGraf = ()=>{
       /* if(tipoGrafica =='Estado'){
            const data = useMemo(function (){
                console.log(estados)
                return{
                    datasets:[{
                        label: "Mis datos",
                        data:scores,
                        tension:0.3,
                        backgroundColor: '#007f61 ',
                        pointRadius: 6,
                    }
                    ],
                    labels,
                }
            })
                 return <Bar data={data} options={options}></Bar>
        }
        else if(tipoGrafica =='Usuario'){
          const data = useMemo(function (){
              console.log(estados)
              return{
                  datasets:[{
                      label: "Mis datos",
                      data:scores,
                      tension:0.3,
                      backgroundColor: '#007f61 ',
                      pointRadius: 6,
                  }
                  ],
                  labels,
              }
          })
               return <Bar data={data} options={options}></Bar>
      }
        else{
            const data = useMemo(function (){
                console.log(estados)
                return{
                    datasets:[{
                        label: "Mis datos",
                        data:scores,
                        tension:0.3,
                        backgroundColor: '#007f61 ',
                        pointRadius: 6,
                    }
                    ],
                    labels,
                }
            })
            return <Bar data={data} options={options}></Bar>
        }*/
    }
    function format(inputDate) {
        debugger
        const [year, month, day] = inputDate.split('-');
    
        const result = [year,month, day, ].join('/');
        return result
      }
    return (
      <>
        <Header></Header>
            <div class="post-jumper post-jumper-5 mt-5">
                <button type="button" class="btn btn-default px-3 d-flex flex-column btn-graf align-items-center" onClick={getcomprasPorEstado} >
                <i class="fa-solid fa-square-poll-vertical"  style={{fontSize:'58px'}}></i>
                <span class="post-jumper-item-title">Productos por Categoria</span>
                </button>
                <button type="button" class="btn btn-default px-3 d-flex flex-column btn-graf align-items-center" onClick={()=>setTipografica('Fecha')}>
                <i class="fa-sharp fa-solid fa-chart-column" style={{fontSize:'58px'}}></i>
                    <span class="post-jumper-item-title">Compras por Fecha</span>
                </button>
                <button type="button" class="btn btn-default px-3 d-flex flex-column btn-graf align-items-center" onClick={getTipoUsuario}>
                <i class="fas fa-chart-area" style={{fontSize:'58px'}}></i>
                    <span class="post-jumper-item-title">Tipo de Usuarios</span>
                </button>
            </div>
            {
                tipoGrafica == 'Fecha' &&  <>
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
                  <button className="btn btn-outline-dark mt-2" type="submit" onClick={getcomprasPorFecha}> 
                    Filtrar
                  </button>
                </>
            }
            <div className="container">
                <RenderGraf></RenderGraf>
            </div>
            
      </>
      );
}

export default Allstatistics;
