// Injectable  para poder  inyectar dependencias en otros componentes 
import { Injectable } from '@angular/core';
// Para  PETICIONES HTTP
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// Para  observABLES 
import { Observable, throwError } from 'rxjs';
// PARA OPERADORES 
import { catchError, map } from 'rxjs/operators';
// PARA LA INTERFAZ DE DRAGONBALL
import { DragonBall } from '../interfaces/dragonball.interface';

// EL INYECTABLE SIRVE PARA PODER USAR ESTA CLASE EN CUALQUIER LUGAR DE LA APLICACION
@Injectable({ providedIn: 'root' })
export class ApiService {
  // la endpoint de la api xd
  private apiUrl = 'https://dragonball-api.com/api/characters';

 // el constructor es para poder inyectar dependencias 
  constructor(private http: HttpClient) {}

  // en estra funcion mandamos la peticion a la api y recibimos los datos
  getDragonBall(page: number = 1, limit: number = 12): Observable<{ items: DragonBall[], meta: any }> {
    return this.http.get<{ items: DragonBall[], meta: any }>(`${this.apiUrl}?page=${page}&limit=${limit}`).pipe(
      catchError(this.handleError)
    );
  }

  // aqui obtenemos el personaje por su id 
  getCharacterById(id: number): Observable<DragonBall> {
    return this.http.get<DragonBall>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  // en caso de error dependiendo de la situacion nos mandara un mensaje de error 

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Manejo de errores mediante HttpErrorResponse
    let errorMessage = 'Error desconocido al traer datos del servidor';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend retornó un código de respuesta no exitoso
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}