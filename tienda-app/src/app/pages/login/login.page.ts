import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user_id: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario = { username: '', password: '' };

  constructor(private router: Router, private api: ApiService) {}

  login() {
    this.api.login(this.usuario).subscribe(
      async (res: LoginResponse) => {
        this.api.token = res.token; // (opcional si lo usas en memoria también)
        console.log('TOKEN:', res.token);

        await this.api.storage.set('token', res.token);
         await this.api.storage.set('user_id', res.user_id);
        this.router.navigate(['/productos']);
      },
      err => {
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
