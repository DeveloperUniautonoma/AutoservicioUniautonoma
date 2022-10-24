from django.urls import path


from .views import *
#from .views import Procedimientos


urlpatterns = [
    path('datos_alumno/<str:correoInstitucional>', get_datos_alumno, name='datos_alumno'),
    path('rol_persona/<str:idPersona>', get_rol, name='rol_persona'),
    path('programa_persona/<str:idPersona>/<str:rol>', get_programa, name='programa_persona'),
]
