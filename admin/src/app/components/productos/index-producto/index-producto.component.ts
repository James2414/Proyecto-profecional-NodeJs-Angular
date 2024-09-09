import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public token: string | null;
  public filtro: string = '';
  public load_data = true;
  public productos: Array<any> = [];
  public url: string;
  public page = 1;
  public pageSize = 1000;
  public load_btn = false;

  constructor(
    private _productoService : ProductoService,
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    //RECUERDENNNNN EL CRACKK
    this.init_data();
  
  }

  init_data(): void{
    this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
      response=>{
        console.log(response);
        this.productos = response.data;
        this.load_data = false;
      },
      error=>{
        console.log(error);
      }
    )
  }

  filtrar(){
    if(this.filtro){

      this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
        response=>{
          console.log(response);
          this.productos = response.data;
          this.load_data = false;
        },
        error=>{
          console.log(error);
        }
      )

    }else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'iNGRESA FILTRO PARA BUSCAR'
      });
    }
  }

  resetear(){
    this.filtro = '';
    this.init_data();
  }

  eliminar(id: string): void {
    this.load_btn = true;
    const token = this.token || ''; // Asigna un string vacío si `this.token` es null

    this._productoService.eliminar_producto_admin(id, token).subscribe(
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
  
        this.init_data();
  
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
