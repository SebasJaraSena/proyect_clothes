import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
    standalone: false,
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.api.getCarrito().subscribe((res: any) => {
      this.carrito = res;
      this.calcularTotal();
    });
  }

  eliminarItem(itemId: number) {
    this.api.deleteFromCarrito(itemId).subscribe(() => {
      this.cargarCarrito();
    });
  }

  calcularTotal() {
    this.total = this.carrito.reduce((acc, item) => {
      return acc + item.producto_precio * item.cantidad;
    }, 0);
  }
}
