from rest_framework import viewsets, permissions  # 👈 importante importar permissions
from .models import Categoria, Producto, CarritoItem
from .serializers import CategoriaSerializer, ProductoSerializer, CarritoItemSerializer
from rest_framework.response import Response

# Lógica del CRUD
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get_permissions(self):
        # Permitir ver productos sin estar autenticado (listado y detalle)
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = CarritoItem.objects.all() 
    serializer_class = CarritoItemSerializer
    #	Solo usuarios logueados pueden ver/modificar el carrito.
    permission_classes = [permissions.IsAuthenticated]

#Se asegura que cada usuario solo vea su propio carrito.
    def get_queryset(self):
        # Solo devolver los items del carrito del usuario autenticado
        return CarritoItem.objects.filter(usuario=self.request.user)
#Impide que un usuario cree carrito para otro; lo asocia automáticamente.
    def perform_create(self, serializer):
        # Asociar automáticamente el usuario al crear un nuevo item
        serializer.save(usuario=self.request.user)