import * as GetProcedimientosAlmacenados from "../server/GetProcedimientosAlmacenados";




export const ProgramaPersona = async(idPerson, rol1) => {

    try {
      
        const res = await GetProcedimientosAlmacenados.getProgramaPersona(idPerson, rol1);
        const data = await res.json();
        const { idPersona, rol, codigoPower, codigoPrograma, nombrePrograma } = data.programa[0];

        return { 
            ok: true,
            idPersona, rol, codigoPower, codigoPrograma, nombrePrograma
        }


    } catch (error) {
        return{
            ok:false
        }
    }
}

export const ProgramaPersonaTodos = async(idPerson, rol1) => {

    try {
      
        const res = await GetProcedimientosAlmacenados.getProgramaPersona(idPerson, rol1);
        const data = await res.json();
        const { idPersona, rol, codigoPower, codigoPrograma, nombrePrograma } = data.programa;
        return { 
            ok: true,
            idPersona, rol, codigoPower, codigoPrograma, nombrePrograma
        }


    } catch (error) {
        return{
            ok:false
        }
    }
}