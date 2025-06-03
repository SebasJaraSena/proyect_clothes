import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false,
})
export class ProductosPage {
  productos: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  async ionViewWillEnter() {
    try {
      const res: any = await this.api.getProductos();
      this.productos = res;
    } catch (err) {
      console.error('Error cargando productos:', err);
      alert('No autorizado. Inicia sesión nuevamente.');
    }
  }
 comprar(producto: any) {
  if (!this.api.token) {
    alert('Debes iniciar sesión para comprar.');
    this.router.navigate(['/login']);
  } else {
    // Agregar el producto al carrito
    const data = {
      producto: producto.id,
      cantidad: 1
    };
    this.api.addToCarrito(data).subscribe(() => {
      // Redirigir al carrito después de agregar
      this.router.navigate(['/carrito']);
    });
  }
}


}
