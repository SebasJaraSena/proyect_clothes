import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  usuario = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router) {}

  registrar() {
    this.api.register(this.usuario).subscribe(
      res => {
        alert('¡Usuario registrado con éxito!');
        this.router.navigate(['/login']);
      },
      err => {
        alert('Error al registrar. Verifica los datos.');
      }
    );
  }
}
