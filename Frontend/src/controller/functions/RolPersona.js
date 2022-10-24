import * as GetProcedimientosAlmacenados from "../server/GetProcedimientosAlmacenados";

export const RolPersona = async(idPerson) => {

    try {
    
        const res = await GetProcedimientosAlmacenados.getRolPersona(idPerson);
        const data = await res.json();
        const { idPersona, rol, nro } = data.roles[0];

        return { 
            ok: true,
            idPersona, rol, nro
        }

    } catch (error) {
        return{
            ok:false
        }
    }
}

export const RolPersonaTodos = async(idPerson) => {

    try {
    
        const res = await GetProcedimientosAlmacenados.getRolPersona(idPerson);
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
