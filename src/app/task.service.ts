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

  private apiUrl = 'https://codigo-alfa.cl/bootcamp-socius2024/Api/'; 

  constructor(private http: HttpClient) { }

  getTasks(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { token };

    return this.http.post<any>(this.apiUrl+'listTareasUsuario', body, { headers });
  }

  createTask(token: string, task: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { token, TituloTarea: task.tituloTarea, DescripcionTarea: task.descripcionTarea };

    return this.http.post<any>(`${this.apiUrl}insertarTarea`, body, { headers });
  }

  updateTaskStatus(userToken:string, taskId:string,task: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { RandomTarea: taskId, ComentarioFinal: task.ComentarioFinalTarea, EstadoTarea: task.EstadoTarea, token: userToken };

    return this.http.post<any>(`${this.apiUrl}marcarTareaFinal`, body, { headers });
  }
}