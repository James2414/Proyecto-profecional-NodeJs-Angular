import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listar_clientes_filtro_admin(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(`${this.url}listar_clientes_filtro_admin/${tipo}/${filtro}`, { headers });
  }

  registro_cliente_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(`${this.url}registro_cliente_admin`, data, { headers });
  }

  obtener_cliente_admin(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.get(`${this.url}obtener_cliente_admin/${id}`, { headers: headers });
  }

  actualizar_cliente_admin(id: string, data: any, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});
       return this._http.put(`${this.url}actualizar_cliente_admin/${id}`, data, { headers });
  }

  eliminar_cliente_admin(id: string, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});
       return this._http.delete(`${this.url}eliminar_cliente_admin/${id}`, { headers });
  }
  
}
