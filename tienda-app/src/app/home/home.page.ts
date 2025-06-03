import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false,
})
export class HomePage implements OnInit {

  productos: any[] = [];
  filtro = '';

  constructor(private router: Router,private api: ApiService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.api.getPublicProductos().subscribe((res: any) => {
      this.productos = res.results || res;  // ← asegura que sea array
    });
  }

  buscar(event: any) {
    const texto = event.detail.value.toLowerCase();
    this.filtro = texto;
  }

  filtrarLista() {
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.filtro)
    );
  }

  comprar(producto: any) {
    if (!this.api.token) {
      alert('Debes iniciar sesión para comprar.');
       this.router.navigate(['/login']); 
    } else {
      console.log('Producto agregado al carrito:', producto);
    }
  }
}
