import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: false,
})
export class HistorialPage implements OnInit {

  ordenes: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getOrdenesAuth().subscribe({
      next: (res: any) => {
        this.ordenes = res;
      },
      error: err => {
        console.error('Error cargando historial', err);
      }
    });
  }
  }



