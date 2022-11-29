import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatosPersona } from "controller/functions/DatosPersona";
import { RolPersona } from "controller/functions/RolPersona";
import { ProgramaPersona } from "controller/functions/ProgramaPersona";
import { startGetPersona } from "store/auth/thunks";
// import { startGetRol } from "store/auth/thunks";
import { startGetPrograma } from "store/auth/thunks";

const Header = () => {

  const [estudiante, setEstudiante] = useState([]);
  const [rol1, setRol1] = useState([]);
  const [programa, setPrograma] = useState([]);


  
  const { email } = useSelector( state => state.auth );
  const { rol } = useSelector( state => state.people );
  const { rol_activo } = useSelector( state => state.rol );
  const dispatch = useDispatch();

  const datos_alumno = async() =>{

    const resultDatos = await DatosPersona(email);
    if ( !resultDatos.ok ) return <h1>No se encontró Datos de la persona</h1>
    setEstudiante(resultDatos);
    
  };

  const trae_rol = async() =>{
    
     const resultRol = await RolPersona(estudiante.idPersona);
     if ( !resultRol.ok ) return <h1>No se encontró rol</h1>
     setRol1(resultRol);
    //  dispatch( startGetRol(resultRol) );
  };


  const trae_programa = async() =>{
    
      const resultPrograma = await ProgramaPersona(estudiante.idPersona, rol1.rol);
      if ( !resultPrograma.ok ) return <h1>No se encontró el programa</h1>
      setPrograma(resultPrograma);
      dispatch( startGetPersona(resultPrograma) );
      dispatch( startGetPrograma(resultPrograma) );
  };


  
  useEffect(()=>{
    datos_alumno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    trae_rol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[estudiante]);

  useEffect(()=>{
    trae_programa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rol1]);


  
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
