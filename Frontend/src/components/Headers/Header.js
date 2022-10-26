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
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      {/* <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col> */}
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                        
                          { estudiante.nombre }
                        </CardTitle> 
                        <span className="h4 font-weight-bold mb-0">        
                          { estudiante.correo }
                        </span>
                      </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      
                        {
                          rol_activo == null ?
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> { rol }
                          </span>
                          :
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> { rol_activo }
                          </span>
                        }
                      
                    </p>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">{ programa.nombrePrograma }</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2,356</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Sales
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
