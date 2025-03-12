import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { IRecord } from '../ecommerce.interface';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

  getRecords(): Observable<IRecord[]> {
    const headers = this.getHeaders();
    return this.http.get<IRecord[]>(`${this.urlAPI}records`, { headers });
  }

  addRecord(record: IRecord): Observable<IRecord> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('titleRecord', record.titleRecord);
    if (record.yearOfPublication !== null) {
      formData.append('yearOfPublication', record.yearOfPublication.toString());
    } else {
      formData.append('yearOfPublication', '');
    }
    formData.append('photo', record.photo!);
    formData.append('price', record.price.toString());
    formData.append('stock', record.stock.toString());
    formData.append('discontinued', record.discontinued ? 'true' : 'false');
    formData.append('groupId', record.groupId?.toString()!);

    return this.http.post<IRecord>(`${this.urlAPI}records`, formData, {
      headers,
    });
  }

  updateRecord(record: IRecord): Observable<IRecord> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('titleRecord', record.titleRecord);
    if (record.yearOfPublication !== null) {
      formData.append('yearOfPublication', record.yearOfPublication.toString());
    } else {
      formData.append('yearOfPublication', '');
    }
    formData.append('price', record.price.toString());
    formData.append('stock', record.stock.toString());
    formData.append('discontinued', record.discontinued ? 'true' : 'false');
    formData.append('groupId', record.groupId?.toString()!);

    if (record.photo) {
      formData.append('photo', record.photo);
    }

    return this.http.put<IRecord>(
      `${this.urlAPI}records/${record.idRecord}`,
      formData,
      { headers }
    );
  }

  deleteRecord(id: number): Observable<IRecord> {
    const headers = this.getHeaders();
    return this.http.delete<IRecord>(`${this.urlAPI}records/${id}`, {
      headers,
    });
  }

  getRecordsByGroup(idGroup: string): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`${this.urlAPI}groups/recordsByGroup/${idGroup}`);
  }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }
}
