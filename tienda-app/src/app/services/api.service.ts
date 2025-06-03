import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:8000/api/';
  token: string = '';

  constructor(private http: HttpClient, public storage: Storage) {
    this.initStorage();
  }

  // Headers autenticados
  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Token ' + this.token
      })
    };
  }

  async initStorage() {
    await this.storage.create();
  }

  login(data: any) {
    return this.http.post<LoginResponse>(this.url + 'usuarios/login/', data);
  }

  register(data: any) {
    return this.http.post(this.url + 'usuarios/', data);
  }

  getPublicProductos() {
    return this.http.get(this.url + 'productos/');
  }

  async getProductos() {
    const token = await this.storage.get('token');
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + token
    });
    return this.http.get(this.url + 'productos/', { headers }).toPromise(); // ← importante usar .toPromise() para await
  }

  getCarrito() {
    return this.http.get(this.url + 'carrito/', this.authHeaders());
  }

  addToCarrito(data: { producto: number, cantidad: number }) {
    return this.http.post(this.url + 'carrito/', data, this.authHeaders());
  }

  deleteFromCarrito(id: number) {
    return this.http.delete(this.url + 'carrito/' + id + '/', this.authHeaders());
  }

  updateCarritoItem(id: number, data: { cantidad: number }) {
    return this.http.put(this.url + 'carrito/' + id + '/', data, this.authHeaders());
  }

}
