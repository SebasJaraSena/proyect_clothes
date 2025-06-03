from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, CarritoViewSet
from rest_framework.authtoken.views import obtain_auth_token
#rutas de la app
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'carrito', CarritoViewSet)

urlpatterns = [
    path('login/', obtain_auth_token),
]

urlpatterns += router.urls
