import { ProgramaPersonaTodos } from 'controller/functions/ProgramaPersona';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startGetPrograma } from 'store/auth/thunks';

export const MenuPrograma = () => {

    const { idPersona } = useSelector( state => state.people );
    const { rol_activo } = useSelector( state => state.rol );
    const [programa, setPrograma] = useState([])
    
    const dispatch = useDispatch();


    const trae_programas = async() =>{
        
        const { data }  = await ProgramaPersonaTodos( idPersona, rol_activo );

        if ( data.Status === 'Failed' ){
            setPrograma('Failed')
        } else {
        
            setPrograma(data.programa);
        }

        // console.log( data.programa );

    };

    const handleUpdatePrograma = (e) => {
        dispatch( startGetPrograma(e.target.value) );

    }

    useEffect(()=>{
        trae_programas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[idPersona, rol_activo]);

    return (
        <>        
        { 
            programa === 'Failed' ?
              <div>
                <p>No se encontró ningun Programa</p>
              </div>
            :
            <div>

              <label>Seleccione Programa</label>
              <select  id="inputState" className="form-control text-lowercase" onClick={handleUpdatePrograma}>
              
                {
                  programa.map((result, i) => (
                    
                    <option className="text-lowercase" key={i} value={ result.nombrePrograma }>{ result.nombrePrograma }</option>
                    
                    ))
                
                } 
            
              </select>

            </div>
        }
        
        </>
    )
}
