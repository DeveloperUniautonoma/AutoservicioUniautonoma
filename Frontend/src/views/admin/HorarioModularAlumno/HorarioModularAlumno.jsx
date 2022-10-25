
import { HorarioModularAlumno } from "controller/functions/HorarioModularAlumno";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    
  } from "reactstrap";
  // core components
//   import Header from "components/Headers/Header.js";
  import Header from "../../../components/Headers/Header";
  
  const Tables = () => {

    const [horario, setHorario] = useState([]);
    
    const { codigoPower } = useSelector( state => state.people );
    
    const trae_horario = async() => {
        
        const resultHorario = await HorarioModularAlumno('000014622','2020','P001');
        if ( !resultHorario.ok ) return <h1>No se encontró el horario</h1>

        setHorario(resultHorario.data.horarioModular);
        console.log(resultHorario.data.horarioModular)
    };

    useEffect(() => {
        trae_horario();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
         
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Horario Modular</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr className="text-center">
                      <th scope="col">Codigo Curso</th>
                      <th scope="col">Nombre Curso</th>
                      <th scope="col">Jornada</th>
                      <th scope="col">Grupo</th>
                      <th scope="col">Fecha Inicio</th>
                      <th scope="col">Fecha Fin</th>
                      <th scope="col">Horario</th>
                      <th scope="col">Docente</th>
                    </tr>
                  </thead>
                  <tbody>


                    { horario.map((result, i) => (
                        
                        <tr key={i}>
                        <th scope="row" >
                            <Media className="align-items-center">
                            <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <img
                                alt="..."
                                src={require("../../../assets/img/logos/logoQuimera.png")}
                                />
                            </a>
                            <Media>
                                <span className="mb-0 text-sm">
                                { result.codigoCurso }
                                </span>
                            </Media>
                            </Media>
                        </th>
                        <td> { result.nombreCurso }</td>
                        <td>
                            <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            { result.jornada }
                            </Badge>
                        </td>
                        <td>{ result.grupo }</td>
                        <td>{ result.fechaInicio }</td>
                        <td>{ result.fechaFin }</td>
                        <td>{ result.horario }</td>
                        <td>{ result.docente }</td>
                        </tr>
                     ))}
                   
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Tables;
  