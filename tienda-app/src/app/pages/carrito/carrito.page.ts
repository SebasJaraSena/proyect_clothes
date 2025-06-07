import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  standalone: false,
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];
  total: number = 0;

  constructor(private api: ApiService, private router: Router) { }

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

  confirmarCompra() {
    this.api.confirmarCompra().subscribe({
      next: (res) => {
        alert('Compra realizada con éxito');
        this.carrito = [];
        this.total = 0;
        this.router.navigate(['/productos']); // O donde quieras redirigir después
      },
      error: (err) => {
        alert('Error al confirmar la compra');
        console.error(err);
      }
    });
  }
}
