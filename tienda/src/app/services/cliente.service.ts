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

  login_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}login_cliente`, data, { headers });
  }

  obtener_cliente_guest(id: string, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.get(`${this.url}obtener_cliente_guest/${id}`, { headers: headers });
  }
///solucionar este service
actualizar_perfil_cliente_guest(id: string, data: any, token: any): Observable<any> {
  console.log('Token enviado:', token); // Agregar este log para verificar el token

  let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

  return this._http.put(`${this.url}actualizar_perfil_cliente_guest/${id}`, data, { headers });
}


public isAuthenticated(allowRoles: string[]): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

  
  if (!decodedToken) {
    console.log('token no VALIDO')
    localStorage.removeItem('token');
    return false;
  }
  } catch (error) {
    localStorage.removeItem('token');
    return false;
  }


  return allowRoles.includes(decodedToken['role']);
}



  obtener_config_publico(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
       return this._http.get(`${this.url}obtener_config_publico`,{ headers });
  }

}
