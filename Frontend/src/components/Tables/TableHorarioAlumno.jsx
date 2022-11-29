
import { Loading2 } from 'components/Loading/Loading2';
import { HorarioModularAlumno } from 'controller/functions/HorarioModularAlumno';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    
  } from "reactstrap";

export const TableHorarioAlumno = () => {

    

        const [horario, setHorario] = useState([]);
        
        const { codigoPower } = useSelector( state => state.people );
        
        const trae_horario = async() => {
            
            const { data } = await HorarioModularAlumno(codigoPower.substr(1,10),'2020','P001');
            
            if ( data.Status === 'Failed' ){
                setHorario('Failed')
            } else {
                setHorario(data.horarioModular);
            } 
        };
    
        useEffect(() => {
            trae_horario();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
        
  return (
    <>
        { 
            horario === 'Failed' || Object(horario).length === 0?
                <Container className="mt--8" fluid>
                    <Card className="bg-default shadow">
                        <CardHeader className="bg-transparent border-0">
                            {/* <h3 className="text-white mb-0">No se encontró el horario</h3> */}
                            <Loading2 />
                        </CardHeader>
                    </Card>
                </Container>
            :
                <Container className="mt--8" fluid>
                    {/* Dark table */}
                    <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                        <CardHeader className="bg-transparent border-0">
                            <h2 className="text-white mb-0">Horario de Clases</h2>
                        </CardHeader>
                        <Table
                            className="align-items-center table-dark table-flush"
                            responsive
                        >
                            <thead>
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
                                        href="#None"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <img
                                        alt="..."
                                        src={require("../../assets/img/logos/logoQuimera.png")}
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
        }
    </>
  )
 }