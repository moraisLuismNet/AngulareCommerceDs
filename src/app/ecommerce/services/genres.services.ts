// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { AuthGuard } from '../../guards/auth-guard.service';
// import { IGenre } from '../ecommerce.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class GenresService {
//   urlAPI = environment.urlAPI;
//   constructor(private http: HttpClient, private authGuard: AuthGuard) {}

//   getGenres(): Observable<IGenre[]> {
//     const headers = this.getHeaders();
//     return this.http.get<IGenre[]>(`${this.urlAPI}musicGenres`, {
//       headers,
//     });
//   }

  // addGenero(Genero: IGenero): Observable<IGenero> {
  //   const headers = this.getHeaders();
  //   return this.http.post<IGenero>(`${this.urlAPI}Generos`, Genero, {
  //     headers,
  //   });
  // }

  // updateGenero(Genero: IGenero): Observable<IGenero> {
  //   const headers = this.getHeaders();
  //   return this.http.put<IGenero>(
  //     `${this.urlAPI}Generos/${Genero.idGenero}`,
  //     Genero,
  //     {
  //       headers,
  //     }
  //   );
  // }

  // deleteGenero(id: number): Observable<IGenero> {
  //   const headers = this.getHeaders();
  //   return this.http.delete<IGenero>(`${this.urlAPI}Generos/${id}`, {
  //     headers,
  //   });
  // }

//   getHeaders(): HttpHeaders {
//     const token = this.authGuard.getToken();
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     });
//     return headers;
//   }

// }
