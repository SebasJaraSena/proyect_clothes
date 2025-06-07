from rest_framework import viewsets, permissions, status # 👈 importante importar permissions
from .models import Categoria, Producto, CarritoItem,  Orden, OrdenItem, CarritoItem
from .serializers import CategoriaSerializer, ProductoSerializer, CarritoItemSerializer, OrdenSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

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

class OrdenViewSet(viewsets.ModelViewSet):
    serializer_class = OrdenSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Orden.objects.all()  # ✅ Esta línea soluciona el error del router

    def get_queryset(self):
        return Orden.objects.filter(usuario=self.request.user)

    @action(detail=False, methods=['post'])
    def confirmar_compra(self, request):
        usuario = request.user

        # PASO 1: Obtener los items del carrito del usuario
        carrito_items = CarritoItem.objects.filter(usuario=usuario)

        if not carrito_items.exists():
            return Response({"error": "El carrito está vacío"}, status=status.HTTP_400_BAD_REQUEST)

        # PASO 2: Calcular el total
        total = sum(item.producto.precio * item.cantidad for item in carrito_items)

        # PASO 3: Crear la orden
        orden = Orden.objects.create(usuario=usuario, total=total)

        # PASO 4: Crear cada item dentro de la orden
        for item in carrito_items:
            OrdenItem.objects.create(
                orden=orden,
                producto=item.producto,
                cantidad=item.cantidad,
                precio_unitario=item.producto.precio
            )

        # PASO 5: Vaciar el carrito del usuario
        carrito_items.delete()

        # PASO 6: Devolver la orden como respuesta
        serializer = OrdenSerializer(orden)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
