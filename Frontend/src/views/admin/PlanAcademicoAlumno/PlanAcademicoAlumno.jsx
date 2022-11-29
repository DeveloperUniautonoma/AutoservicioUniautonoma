import { useEffect, useState } from "react";
import Chart from "chart.js";




import {
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header2 from "components/Headers/Header2.js";
import { useSelector } from "react-redux";
import { PlanAcademico } from "controller/functions/PlanAcademico";
import { Loading2 } from "components/Loading/Loading2";


export const PlanAcademicoAlumno = () => {

    const { codigoPower, codigoPrograma } = useSelector( state => state.people );
    const [planAcademico, setPlanAcademico] = useState([])
   
    
    const trae_plan_academico = async() => {
    
        const { data } = await PlanAcademico( codigoPower.substr(1,10), codigoPrograma );
        
        if ( data.Status === 'Failed' )
            setPlanAcademico('Failed');
        else
            setPlanAcademico(data.planAcademico);
        
    };

    useEffect(() => {
      trae_plan_academico();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  
    
  return (
    <>  
        <Header2 />
        {
            planAcademico === 'Failed' || Object(planAcademico).length === 0 ?
                <Container className="mt--6" fluid>
                    <Card className="bg-default shadow">
                        <CardHeader className="bg-transparent border-0">
                            <Loading2 />
                        </CardHeader>
                    </Card>
                </Container>
            :
                <Container className="mt--8" fluid>
                    <Row className="mt-5 mb-100">                    
                    {
                        planAcademico.map((result, i) => (
                            
                            <>
                                <Col className="mb-5 mb-xl-5" xl="5">
                                    <Card className="shadow" key={i}>
                                        <CardHeader className="border-0">  
                                            <Row className="align-items-center">
                                                <div className="col">
                                                    <h4 className="mb-0">{ result.semestre }</h4>
                                                </div>
                                                <div className="col text-right">
                                                    <h4 className="mb-0">Cursos Pensum</h4> 
                                                </div>
                                            </Row>
                                        </CardHeader>
                                    <Table className="align-items-center table-flush table-sm" responsive>
                                        <thead className="thead-dark text-white text-center">
                                        <tr className="col col-lg-5">
                                            <th scope="col">No</th>
                                            <th scope="col">Código Curso</th>
                                            <th scope="col">Nombre Curso</th>
                                            <th scope="col">Creditos</th>
                                        </tr>
                                        </thead>
                                        <tbody>  
                                            {
                                                result.materias.map((result2, k) => (
                                                    
                                                    <tr key={ k+1 }>
                                                        <th scope="row" className="text-center">{ k+1 }</th>
                                                        <td>{ result2.codigoCursoPensum }</td>
                                                        <td>{ result2.nombreCursoPensum }</td>
                                                        <td className="text-center">{ result2.creditos }</td>
                                                    </tr>      
                                                    
                                                ))
                                            }                                             
                                               
                                        </tbody>
                                    </Table>
                                    </Card>
                                </Col>

                                <Col xl="7">
                                    <Card className="shadow">
                                        <CardHeader className="border-0">
                                            <Row className="align-items-center"> 
                                                <div className="col text-right">
                                                    <h4 className="mb-0">Cursos Vistos</h4>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                        <Table className="align-items-center table-flush table-sm" responsive>
                                            <thead className="thead-dark text-center">
                                            <tr className="">
                                                <th scope="col">Código Curso</th>
                                                <th scope="col">Nombre Curso</th>
                                                <th scope="col">Jornada</th>
                                                <th scope="col">Grupo</th>
                                                <th scope="col">Nota</th>
                                                <th scope="col">Año Cursado</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    result.materias.map((result2, k) => (

                                                        <tr key={ k+1 }>
                                                            <th scope="row" className="text-center">{ result2.eventId}</th>
                                                            <td>{ result2.eventName }</td>

                                                            {
                                                                result2.jornada === 'S001' ?
                                                                    <td>Diurno</td>
                                                                : result2.jornada === 'S002' ?
                                                                    <td>Nocturno</td>
                                                                : result2.jornada === 'S003' ?
                                                                    <td>Continua</td>
                                                                : result2.jornada === 'S004' ?
                                                                    <td>Intersemestral</td>
                                                                : <td>{ result2.jornada }</td>
                                                            }
                                                            
                                                            <td className="text-center">{ result2.grupo }</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-2">{ result2.notaFinal }</span>
                                                                    
                                                                    <div>

                                                                        {
                                                                            result2.notaFinal < 3 ?
                                                                                <Progress
                                                                                max="5"         
                                                                                value={ result2.notaFinal }
                                                                                barClassName="bg-gradient-danger"
                                                                                />
                                                                            : result2.notaFinal >= 3 && result2.notaFinal < 4 ?
                                                                                <Progress
                                                                                max="5"
                                                                                value={ result2.notaFinal }
                                                                                barClassName="bg-gradient-warning"
                                                                                />
                                                                            : result2.notaFinal >= 4 && result2.notaFinal < 4.5 ?
                                                                                <Progress
                                                                                max="5"
                                                                                value={ result2.notaFinal }
                                                                                barClassName="bg-gradient-info"
                                                                                />
                                                                            :   <Progress
                                                                                max="5"
                                                                                value={ result2.notaFinal }
                                                                                barClassName="bg-gradient-success"
                                                                                />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center">{ result2.pensum }</td>
                                                        </tr>  
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </Card>
                                </Col>
                            </>
                        ))
                    }      
                    </Row>
                </Container>
        }
    </>
  )
}
