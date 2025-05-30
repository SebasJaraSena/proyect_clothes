from rest_framework import serializers
from .models import Categoria, Producto, CarritoItem
#traductor entre modelos y JSON
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CarritoItemSerializer(serializers.ModelSerializer):
    #ReadOnlyField	Sirve para mostrar nombre y precio del producto en las respuestas sin tener que hacer lógica extra en la vista
    producto_nombre = serializers.ReadOnlyField(source='producto.nombre')
    producto_precio = serializers.ReadOnlyField(source='producto.precio')

    class Meta:
        model = CarritoItem
        #fields	Controlamos exactamente qué se expone (buena seguridad)
        #id	Siempre útil para acciones como eliminar un item
        fields = ['id', #id	Siempre útil para acciones como eliminar un item
        'producto', 'producto_nombre', 'producto_precio', 'cantidad', 'agregado_en']