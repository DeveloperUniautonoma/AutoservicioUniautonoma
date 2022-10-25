from django.db import connection
from django.http.response import JsonResponse

# Create your views here.

# Funcion que llama al procedimiento sp_CUAC_At_DatosAlumno y lo retorna en un JsonResponse
def get_datos_alumno(self, correoInstitucional):
    try:
        with connection.cursor() as cursor:
            cursor.execute("sp_CUAC_At_DatosAlumno '{0}'".format(correoInstitucional))
            row = cursor.fetchone()
            #print(row)
            # Se verifica que se encontro un alumno
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
            
            # print(cursor.fetchall())
            # Se verifica que se encontro la persona
            if data != None: 
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
            if data != None: 
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
            if data != None: 
                json_data=[]
                for row in data:
                    json_data.append({ "codigoCurso": row[1], "nombreCurso": row[2], "jornada": row[3], "grupo": row[4], "fechaInicio": row[5], "fechaFin": row[6], "horario": row[7], "docente": row[8] })
                datos = {'Status': "Success", 'horarioModular': json_data}
                connection.close()
            else:
                datos = {'Status': "Failed", 'message': 'No se encontro el horario para este peopleId', 'peopleId': peopleId }
            return JsonResponse(datos)
    except Exception as ex:
        print(ex)