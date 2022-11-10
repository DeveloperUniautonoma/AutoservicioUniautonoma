import { RolPersonaTodos } from "controller/functions/RolPersona";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetRol } from "store/auth/thunks";



export const MenuRol = () => {

  const { idPersona } = useSelector( state => state.people );
  const [rol1, setRol1] = useState([])
  
  const dispatch = useDispatch();


  const trae_roles = async() =>{
    
    const { data } = await RolPersonaTodos( idPersona );
    
    if ( data.Status === 'Failed' ){
      setRol1('Failed')
    } else {
      
      setRol1(data.roles);
    }
 };

 const handleUpdateRol = (e) => {
  dispatch( startGetRol(e.target.value) );

}

 useEffect(()=>{
  trae_roles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[idPersona]);

  return (
    <>        
        { 
            rol1 === 'Failed' ?
              <div>
                <p>No se encontró ningun rol</p>
              </div>
            :
            <div>

              <label>Seleccione Rol</label>
              <select  id="inputState" className="form-control" onClick={handleUpdateRol}>
              
                {
                  rol1.map((result, i) => (
                    
                    <option key={i} value={ result.rol }>{result.rol}</option>
                    
                    ))
                
                } 
            
              </select>

            </div>
        }
        
    </>
  )
}
