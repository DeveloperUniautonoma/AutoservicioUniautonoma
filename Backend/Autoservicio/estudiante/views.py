from django.db import connection
from django.http.response import JsonResponse

# Create your views here.

# Funcion que llama al procedimiento sp_CUAC_At_DatosAlumno y lo retorna en un JsonResponse
def get_datos_alumno(self, correoInstitucional):
    try:
        with connection.cursor() as cursor:
            cursor.execute("sp_CUAC_At_DatosAlumno '{0}'".format(correoInstitucional))
            row = cursor.fetchone()
            
            # Se verifica que se encontro datos
            if row != None: 
                lista = list(row)
                header_campos = ["idPersona","correo","nombre"]
                datos = dict(zip(header_campos, lista))
                datos = {'Status': "Success", 'alumno': datos}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontro el correo institucional', 'Email': correoInstitucional}
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)


def get_rol(self, idPersona):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from Fn_cuac_At_TraeRoles ('{0}')".format(idPersona))
            data = cursor.fetchall()
            
            
            if data != []: 
                json_data=[]
                for row in data:
                    json_data.append({ "idPersona": row[0], "rol": row[1], "nro": row[2] })

                datos = {'Status': "Success", 'roles': json_data}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontro el rol para este id', 'idPersona': idPersona}
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)


def get_programa(self, idPersona, rol):
    try:
        with connection.cursor() as cursor:
            cursor.execute("select * from Fn_cuac_At_TraeProgRol ('{0}','{1}')".format(idPersona, rol))
            data = cursor.fetchall()

            # Se verifica que se encontro datos
            if data != []: 
                json_data=[]
                for row in data:
                    json_data.append({ "idPersona": row[0], "rol": row[1], "codigoPower": row[2], "codigoPrograma": row[3], "nombrePrograma": row[4] })
                datos = {'Status': "Success", 'programa': json_data}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontro el rol para este id', 'idPersona': idPersona, 'rol': rol}
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)


def get_horario_modular_alumno(self, peopleId, academicYear, academicTerm):
    try:
        with connection.cursor() as cursor:
            cursor.execute("sp_cuacav_HorarioAlumnoModular '{0}','{1}','{2}'".format(peopleId, academicYear, academicTerm))
            data = cursor.fetchall()
            
            # Se verifica que se encontro datos
            if data != []: 
                json_data=[]
                for row in data:
                    json_data.append({ "codigoCurso": row[1], "nombreCurso": row[2], "jornada": row[3], "grupo": row[4], 
                                        "fechaInicio": row[5], "fechaFin": row[6], "horario": row[7], "docente": row[8] })
                datos = {'Status': "Success", 'horarioModular': json_data}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontro el horario para este peopleId', 'peopleId': peopleId }
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)


def get_plan_academico_alumno(self, peopleId, codigoPrograma):
    try:
        with connection.cursor() as cursor:
            cursor.execute("sp_cuacav_PlanAcademico '{0}','{1}', 1".format(peopleId, codigoPrograma))
            data = cursor.fetchall()
            
            # Se verifica que se encontro datos
            if data != []: 
                
                json_data=[]
                semestres=[]
                materias=[]
                

                for row in data:    
                    if row[6] not in semestres:
                        semestres.append(row[6])           

                for semestre in semestres:
                    materias = []
                    for row in data:
                        if semestre == row[6]:
                            materias.append({ "tipo": row[0], "pensum": row[3], "semestre": row[6], "codigoCursoPensum": row[7], 
                                            "nombreCursoPensum": row[8], "creditos": row[9], "academicYear": row[10], "academicTerm": row[11],
                                            "jornada": row[12], "grupo": row[13], "eventId": row[14], "eventName": row[15],
                                            "cursoId": row[16], "repitencias": row[17], "notaFinal": row[18] })
                     
                    # json_data.append({ semestre: materias })
                    json_data.append({ 'semestre': semestre, 'materias': materias })
                datos = {'Status': "Success", 'planAcademico': json_data}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontró plan academico para peopleId', 'peopleId': peopleId }
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)