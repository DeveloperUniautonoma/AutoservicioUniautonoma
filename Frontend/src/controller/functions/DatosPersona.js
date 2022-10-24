import * as GetProcedimientosAlmacenados from "../server/GetProcedimientosAlmacenados";




export const DatosPersona = async(email) => {

    try {
      
        const res = await GetProcedimientosAlmacenados.getAlumno(email);
        const data = await res.json();
        const { idPersona, correo, nombre } = data.alumno;
        
        return { 
            ok: true,
            idPersona, correo, nombre
        }


    } catch (error) {
        return{
            ok:false
        }
    }
}


export const ValidarCorreo = async(email) => {

    try {
      
        const res = await GetProcedimientosAlmacenados.getAlumno(email);
        const data = await res.json();
        
        if (data.Status !== 'Failed'){
            return { 
                ok: true,
                data
            }
        }else{
            return{
                ok:false
            }
        }

    } catch (error) {
        return{
            ok:false
        }
    }
}
