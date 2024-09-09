import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
//son 11 mentes 5basquet y 12 en beisbol 
registro_producto_admin(data: any, file: File | undefined, token: any): Observable<any> {
  let headers = new HttpHeaders({'Authorization': token});


  const fd = new FormData();
  fd.append('titulo', data.titulo);
  fd.append('stock', data.stock);
  fd.append('precio', data.precio);
  fd.append('descripcion', data.descripcion);
  fd.append('contenido', data.contenido);
  fd.append('categoria', data.categoria);

  // Asegúrate de que `file` es del tipo `File` y lo añades al FormData
  if (file) {
    fd.append('portada', file);
  }

  return this._http.post(`${this.url}registro_producto_admin`, fd, { headers });
}

listar_producto_admin(filtro: any, token: any): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
  return this._http.get(`${this.url}listar_producto_admin/${filtro}`, { headers });
}

obtener_producto_admin(id: string, token: any): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
  return this._http.get(`${this.url}obtener_producto_admin/${id}`, { headers });
}

actualizar_producto_admin(data: any, id: string, token: any): Observable<any> {
  let headers;

  if (data.portada) {
    headers = new HttpHeaders({ 'Authorization': token });

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', data.portada);

    // Enviar la solicitud POST con FormData
    return this._http.put(`${this.url}actualizar_producto_admin/${id}`, fd, { headers });
  } else {
    headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    
    // Enviar la solicitud PUT con datos JSON
    return this._http.put(`${this.url}actualizar_producto_admin/${id}`, data, { headers });
  }
}

eliminar_producto_admin(id: string,token: any): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
  return this._http.delete(`${this.url}eliminar_producto_admin/${id}`, { headers });
}

listar_inventario_producto_admin(id: string,token: any): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
  return this._http.get(`${this.url}listar_inventario_producto_admin/${id}`, { headers });
}

eliminar_inventario_producto_admin(id: string,token: any): Observable<any> {
  let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
  return this._http.get(`${this.url}eliminar_inventario_producto_admin/${id}`, { headers });
}

actualizar_producto_variedades_admin(data: any, id: string, token: any): Observable<any> {
  
   let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });  
    // Enviar la solicitud PUT con datos JSON
    return this._http.put(`${this.url}actualizar_producto_variedades_admin/${id}`, data, { headers });
  }
}



