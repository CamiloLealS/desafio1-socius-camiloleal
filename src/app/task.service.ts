import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface Task {
  id: number;
  mensaje: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://codigo-alfa.cl/bootcamp-socius2024/Api/listTareasUsuario'; 

  constructor(private http: HttpClient) { }

  getTasks(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { token };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  createTask(token: string, tituloTask: string, descripcionTask: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { token, tituloTask, descripcionTask};

    return this.http.post<any>(`${this.apiUrl}createTask`, body, { headers });
  }
}