
import { RolPersonaTodos } from "controller/functions/RolPersona";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetRol } from "store/auth/thunks";



export const MenuRol = () => {
  const { idPersona, rol } = useSelector( state => state.people );
  const [rol1, setRol1] = useState([])
  
  const dispatch = useDispatch();


  const trae_roles = async() =>{
    
    const resultRol = await RolPersonaTodos( idPersona );
    if ( !resultRol.ok ) return <h1>No se encontró rol</h1>
      
    setRol1(resultRol.data.roles);
    
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
        <label>Seleccione Rol</label>
        <select onChange={handleUpdateRol} id="inputState" className="form-control">
          <option value={rol} onChange={handleUpdateRol} >{ rol }</option>
          {
              
              Object.keys(rol1).map((key,i) => (
                
                <option  key={i} value={rol1[key].rol} >{rol1[key].rol}</option>
                
                ))
            }
          
        </select>
    </>
  )
}
