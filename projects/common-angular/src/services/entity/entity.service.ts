import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DTOResponse} from 'common-angular';
import {DTOPagerResponse} from '../../models/dtopager-response';
import {KeyValue} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export abstract class EntityService<T> {

  abstract baseUrl: string;

  protected constructor(protected readonly http: HttpClient) {
  }

  get(id: number): Observable<DTOResponse<T>> {
    return this.http.get<DTOResponse<T>>(this.baseUrl + '/' + id);
  }

  getPage(page: number, params?: KeyValue<string, string>[]): Observable<DTOPagerResponse<T>> {
    let httpParams = new HttpParams();
    if (page) {
      httpParams = httpParams.set('page', page.toString());
    }
    if (params) {
      for (const param of params) {
        httpParams = httpParams.set(param.key, param.value);
      }
    }
    return this.http.get<DTOPagerResponse<T>>(this.baseUrl, {params: httpParams});
  }

  getList(params?: KeyValue<string, string>[]) {
    let httpParams = new HttpParams();
    if (params) {
      for (const param of params) {
        httpParams = httpParams.set(param.key, param.value);
      }
    }
    return this.http.get<DTOResponse<T[]>>(this.baseUrl, {params: httpParams});
  }

  create(instance: T) {
    return this.http.post<DTOResponse<T>>(this.baseUrl, instance);
  }

  update(id: number, instance: T) {
    return this.http.put<DTOResponse<T>>(`${this.baseUrl}/${id}`, instance);
  }

  patch(id: number, fields: string[], instance: T) {
    return this.http.patch<DTOResponse<T>>(`${this.baseUrl}/${id}`, {fields, data: instance});
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
