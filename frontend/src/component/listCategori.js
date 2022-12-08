import { searchproduct , filterCategory} from "../services/service";
const ListCategori = ({allproduct, setAllProduct}) =>{
    const handleCategory = async(e) =>{
    
        var categoria = e.target.value
        try{
          const resp = await filterCategory(categoria)
          setAllProduct(resp)

          }
        catch(error){
          console.log(error)
        }
      }
    return (
      <>
        <div className="option">
          <div>
            <input type="radio" name="card" id="INDUMENTARIA" value="INDUMENTARIA" onClick={(e)=>handleCategory(e)}></input>
            <label for="INDUMENTARIA" aria-label="INDUMENTARIA">
              <span></span>

              INDUMENTARIA

              <i class="fa-solid fa-shirt"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="ELECTRODOMESTICOS" value="ELECTRODOMESTICOS" onClick={(e)=>handleCategory(e)}></input>
            <label for="ELECTRODOMESTICOS" aria-label="Silver">
              <span></span>

              ELECTRODOMÉSTICOS

              <i class="fa-solid fa-blender"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="VIVERES" value="VIVERES" onClick={(e)=>handleCategory(e)}></input>
            <label for="VIVERES" aria-label="VIVERES">
              <span></span>

              VIVERES

              <i class="fa-solid fa-utensils"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="INSTRUMENTOS" value="INSTRUMENTOS" onClick={(e)=>handleCategory(e)}></input>
            <label for="INSTRUMENTOS" aria-label="INSTRUMENTOS">
              <span></span>

              INSTRUMENTOS

              <i class="fa-solid fa-screwdriver-wrench"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="CALZADOS" value="CALZADOS" onClick={(e)=>handleCategory(e)}></input>
            <label for="CALZADOS" aria-label="CALZADOS">
              <span></span>

              CALZADOS

              <i class="fas fa-shoe-prints"></i>
            </label>
          </div>
          <div>
            <input type="radio" name="card" id="LIBROS" value="LIBROS" onClick={(e)=>handleCategory(e)}></input>
            <label for="LIBROS" aria-label="Silver">
              <span></span>

              LIBROS
              <i class="fa-solid fa-book"></i>
              
            </label>
          </div>
        </div>
      </>
      );
}

export default ListCategori;