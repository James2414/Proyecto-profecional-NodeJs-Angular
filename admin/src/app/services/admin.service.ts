import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  
  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', JSON.stringify(data), { headers });
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  // Método
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



  actualiza_config_admin(id: string, data: any, token: string): Observable<any> { 
    let headers: HttpHeaders;
  
    if (data.logo) {
     let headers = new HttpHeaders({ 'Authorization': token });
  
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias', JSON.stringify(data.categorias))// Asegúrate de serializar objetos si es necesario
      fd.append('logo', data.logo);
      
      // Enviar la solicitud PUT con FormData
      return this._http.put(`${this.url}actualiza_config_admin/${id}`, fd, { headers });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      
      // Enviar la solicitud PUT con datos JSON
      return this._http.put(`${this.url}actualiza_config_admin/${id}`,data, { headers });
    }
  }
  
obtener_config_admin(token: string): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});
     return this._http.get(`${this.url}obtener_config_admin`, { headers });
}

obtener_config_publico(): Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/json');
     return this._http.get(`${this.url}obtener_config_publico`,{ headers });
}

}
