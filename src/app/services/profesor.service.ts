import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  baseUrl: string = 'http://localhost:3000'
  constructor(private httpClient: HttpClient) { }
  //Sacar todos los usuarios que es alumno
  getUsers() {
    return firstValueFrom(
      //pasar el authorization
      this.httpClient.get<any>(`${this.baseUrl}/api/profesor/alumno`)
    );
  }
  //Sacar datos de tarea por clasesid  --En proceso
  getTareabyClassId(classId: any) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/api/tarea/clase/${classId}`)
    )
  }
  //Sacar tarea por profesorId 
  getTareabyProfesorID(profesorId: any) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/api/tarea/profesor/${profesorId}`)
    )
  }

  //Insertar tarea
  createTarea(tareaValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/api/tarea`, tareaValue)
    )
  }
}
