import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
  standalone: false,
})
export class NuevoProductoPage {
  producto = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
  };

  imagen: File | null = null;
  user_id: number = 0;

  constructor(private api: ApiService, private storage: Storage) {
    this.cargarUserId();
    this.storage['create']().then(() => {
    console.log('Storage listo ✅');
  });
  }

 async cargarUserId() {
    await this.storage['create']();
    this.user_id = await this.storage['get']('user_id');

  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  async crearProducto() {
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('precio', this.producto.precio);
    formData.append('stock', this.producto.stock);
    formData.append('categoria', this.producto.categoria);

    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }

    try {
      const res = await this.api.crearProducto(formData);
      console.log('Producto creado:', res);
    } catch (err) {
      console.error('Error al crear producto:', err);
    }
  } 
}