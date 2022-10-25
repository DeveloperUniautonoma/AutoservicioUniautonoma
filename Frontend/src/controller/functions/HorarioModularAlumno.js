import * as GetProcedimientosAlmacenados from "../server/GetProcedimientosAlmacenados";


export const HorarioModularAlumno = async(peopleId, academicYear, academicTerm) => {

    try {
    
        const res = await GetProcedimientosAlmacenados.getHorarioModularAlumno(peopleId, academicYear, academicTerm);
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
