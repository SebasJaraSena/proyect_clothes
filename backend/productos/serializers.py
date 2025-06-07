from rest_framework import serializers
from .models import Categoria, Producto, CarritoItem,  Orden, OrdenItem
#traductor entre modelos y JSON
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

    #ReadOnlyField	Sirve para mostrar nombre y precio del producto en las respuestas sin tener que hacer lógica extra en la vista
    #fields	Controlamos exactamente qué se expone (buena seguridad)
        #id	Siempre útil para acciones como eliminar un item
class CarritoItemSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    producto_precio = serializers.ReadOnlyField(source='producto.precio')

    class Meta:
        model = CarritoItem
        
        fields = ['id', 'producto', 'producto_nombre', 'producto_precio', 'cantidad', 'agregado_en']

#Serializa cada producto dentro de una orden 
    # ReadOnlyField para mostrar producto.nombre sin escribirlo manualmente
class OrdenItemSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')

    class Meta:
            model = OrdenItem
            fields = ['producto', 'producto_nombre', 'cantidad', 'precio_unitario']

#Serializa la orden completa incluyendo usuario y sus ítems
   #StringRelatedField para mostrar el nombre de usuario
    #read_only=True evita errores de escritura innecesaria desde el cliente
class OrdenSerializer(serializers.ModelSerializer):
    items = OrdenItemSerializer(many=True, read_only=True)
 
    usuario = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Orden
        fields = ['id', 'usuario', 'total', 'creada_en', 'items']