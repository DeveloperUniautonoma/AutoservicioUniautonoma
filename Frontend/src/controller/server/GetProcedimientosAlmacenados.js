const API_TRAE_ALUMNO = "http://127.0.0.1:8000/procedimiento/datos_alumno/";
const API_ROL_PERSONA = "http://127.0.0.1:8000/procedimiento/rol_persona/";
const API_TRAE_PROGRAMA_PERSONA = "http://127.0.0.1:8000/procedimiento/programa_persona/";
const API_TRAE_HORARIO_MODULAR_ALUMNO = "http://127.0.0.1:8000/procedimiento/horario_modular_alumno/";


// consulta al usuario con el correo institucional
export const getAlumno = async (correoInstitucional) => {
    return await fetch(`${API_TRAE_ALUMNO}${correoInstitucional}`);
};

// con el id del usuario se consulta el rol
export const getRolPersona = async (idPersona) => {
    return await fetch(`${API_ROL_PERSONA}${idPersona}`);
};

// con el id y rol se trae el programa
export const getProgramaPersona = async (idPersona, rol) => {
    return await fetch(`${API_TRAE_PROGRAMA_PERSONA}${idPersona}/${rol}`);
};

// con el id y rol se trae el programa
export const getHorarioModularAlumno = async (peopleId, academicYear, academicTerm) => {
    return await fetch(`${API_TRAE_HORARIO_MODULAR_ALUMNO}${peopleId}/${academicYear}/${academicTerm}`);
};