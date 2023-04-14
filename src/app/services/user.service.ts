import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }


  getUserByLogin() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/api/usuarios/login`)
    )
  }
}