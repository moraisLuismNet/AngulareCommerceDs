import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { IGroup } from '../ecommerce.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

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
    if (group.photo) {
      formData.append('photo', group.photo);
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

  getGroupName(idGroup: string) {
    return this.http.get(`${this.urlAPI}groups/${idGroup}`);
  }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
