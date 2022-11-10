import * as GetProcedimientosAlmacenados from "../server/GetProcedimientosAlmacenados";




export const PlanAcademico = async(peopleId, codigoPrograma) => {

    try {
      
        const res = await GetProcedimientosAlmacenados.getPlanAcademicoAlumno(peopleId, codigoPrograma);
        const data = await res.json();
        
        return { 
            ok: true,
            data
        }


    } catch (error) {
        return{
            ok:false
        }
    }
}