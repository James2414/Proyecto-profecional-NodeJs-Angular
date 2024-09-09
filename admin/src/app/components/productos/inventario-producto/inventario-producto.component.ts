import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id: string = ''; // Inicializa como una cadena vacía
  public token: string = '';
  public producto : any = {};
  public inventarios : Array<any>=[]; // Inicializa como un array vacío para almacenar el inventario del producto
  public load_btn = false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ) { 
    this.token = localStorage.getItem('token') || ''; // Obtiene el token del local storage o lo inicializa como una cadena vacía
  }

  ngOnInit(): void {
  
    this._route.params.subscribe(
      params => {
        this.id = params['id']; // Asigna el id obtenido de la ruta a la variable id
        console.log(this.id);
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else {

              this.producto = response.data;

              this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
                response=>{
                  this.inventarios = response.data;
                  console.log(this.inventarios);
                },
                error=>{
                  console.log(error);
                }
              );
    
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    );

  }

  eliminar(id: string): void {
    this.load_btn = true;
    const token = this.token || ''; // Asigna un string vacío si `this.token` es null

    this._productoService.eliminar_inventario_producto_admin(id, token).subscribe(
      response => {
        iziToast.show({
          title: 'Succes',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se elimino correctamente el producto'
        });
  
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;
  
        this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
          response=>{
            this.inventarios = response.data;
            console.log(this.inventarios);
          },
          error=>{
            console.log(error);
          }
        );
  
      },
      error => {
         iziToast.show({
          title: 'Succes',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
      }
    );
  }


}
