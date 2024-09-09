import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent {

  // Definimos una lista de objetos con la información de cada producto
  public producto : any= {};
  public id: string = ''; // Inicializa como una cadena vacía
  public token: string | null;
  public nueva_variedad = '';
  public load_btn = false;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){
    
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id']; // Asigna el id obtenido de la ruta a la variable id

        
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else {

              this.producto = response.data;         
            }
            console.log(this.producto);

          },
          error=>{
            console.log(error);
          }
        )
      }
    );
  }

  ngOnInit(): void {

  }

  agregar_variedad(){
    if(this.nueva_variedad){

      this.producto.variedades.push({titulo: this.nueva_variedad})
      this.nueva_variedad = '';
    }else{
      iziToast.error({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        message: 'El campo de la variedad debe ser completado',
        position: 'topRight'
      });
      
    }
  }

  
  eliminar_variedad(idx:number){
    this.producto.variedades.splice(idx, 1)
  }

  actualizar(){
    if(this.producto.titulo_variedad){
      if(this.producto.variedades.length >= 1){
        //actualizar
        this.load_btn = true
        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        },this.id,this.token ).subscribe(
          response=>{
            console.log(response);

            iziToast.show({
              title: 'SUCCES',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizo correctamente el producto'
            });

            this.load_btn = false
          }
        )

      }else {
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          message: 'Debe agregar al menos una variedad',
          position: 'topRight'
        });

      }
    }else {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        message: 'Debe completar el titulo de la variedad',
        position: 'topRight'
      });
    }
  }

}
