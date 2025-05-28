from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet
from rest_framework.authtoken.views import obtain_auth_token
#rutas de la app
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('login/', obtain_auth_token),
]

urlpatterns += router.urls
