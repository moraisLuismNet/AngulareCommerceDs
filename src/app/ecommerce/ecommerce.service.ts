import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre, IGroup } from './ecommerce.interface';
import { AuthGuard } from '../guards/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

  getGenres(): Observable<IGenre[]> {
    const headers = this.getHeaders();
    return this.http.get<IGenre[]>(`${this.urlAPI}musicGenres`, {
      headers,
    });
  }

  addGenre(genre: IGenre): Observable<IGenre> {
    const headers = this.getHeaders();
    return this.http.post<IGenre>(`${this.urlAPI}MusicGenres`, genre, {
      headers,
    });
  }

  updateGenre(Genre: IGenre): Observable<IGenre> {
    const headers = this.getHeaders();
    return this.http.put<IGenre>(
      `${this.urlAPI}MusicGenres/${Genre.idMusicGenre}`,
      Genre,
      {
        headers,
      }
    );
  }

  deleteGenre(id: number): Observable<IGenre> {
    const headers = this.getHeaders();
    return this.http.delete<IGenre>(`${this.urlAPI}MusicGenres/${id}`, {
      headers,
    });
  }

  getGroups(): Observable<IGroup[]> {
    const headers = this.getHeaders();
    return this.http.get<IGroup[]>(`${this.urlAPI}groups`, {
      headers,
    });
  }

  addGroup(group: IGroup): Observable<IGroup> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nameGroup', group.nameGroup);
    // formData.append('photo', group.photo!);
    if (group.photo) {
      formData.append('photo', group.photo); // Verifica que esto contenga datos
      // console.log('Enviando archivo:', group.photo);
    }
    formData.append('musicGenreId', group.musicGenreId?.toString()!);
    return this.http.post<IGroup>(`${this.urlAPI}groups`, formData, {
      headers,
    });
  }

  updateGroup(group: IGroup): Observable<IGroup> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('nameGroup', group.nameGroup);
    formData.append('musicGenreId', group.musicGenreId?.toString()!);
    if (group.photo) {
      formData.append('photo', group.photo);
      // console.log('Enviando archivo:', group.photo);
    }

    return this.http.put<IGroup>(
      `${this.urlAPI}groups/${group.idGroup}`,
      formData,
      { headers }
    );
  }

  deleteGroup(id: number): Observable<IGroup> {
    const headers = this.getHeaders();
    return this.http.delete<IGroup>(`${this.urlAPI}groups/${id}`, {
      headers,
    });
  }






  // getBooks(): Observable<IBook[]> {
  //   const headers = this.getHeaders();
  //   return this.http.get<IBook[]>(`${this.urlAPI}books`, { headers });
  // }

  // addBook(book: IBook): Observable<IBook> {
  //   const headers = this.getHeaders();
  //   const formData = new FormData();
  //   formData.append('title', book.title);
  //   formData.append('pages', book.pages.toString());
  //   formData.append('price', book.price.toString());
  //   formData.append('authorId', book.authorId?.toString()!);
  //   formData.append('publishingHouseId', book.publishingHouseId?.toString()!);
  //   formData.append('discontinued', book.discontinued ? 'true' : 'false');
  //   formData.append('photo', book.photo!);

  //   return this.http.post<IBook>(`${this.urlAPI}books`, formData, {
  //     headers,
  //   });
  // }

  // deleteBook(id: number): Observable<IBook> {
  //   const headers = this.getHeaders();
  //   return this.http.delete<IBook>(`${this.urlAPI}books/${id}`, {
  //     headers,
  //   });
  // }

  // updateBook(book: IBook): Observable<IBook> {
  //   const headers = this.getHeaders();
  //   const formData = new FormData();
  //   formData.append('idBook', book.isbn.toString());
  //   formData.append('title', book.title);
  //   formData.append('pages', book.pages.toString());
  //   formData.append('price', book.price.toString());
  //   formData.append('authorId', book.authorId?.toString()!);
  //   formData.append('publishingHouseId', book.publishingHouseId?.toString()!);
  //   formData.append('discontinued', book.discontinued ? 'true' : 'false');
  //   if (book.photo) {
  //     formData.append('photo', book.photo);
  //   }

  //   return this.http.put<IBook>(`${this.urlAPI}books/${book.isbn}`, formData, { headers: this.getHeaders() });
  // }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
