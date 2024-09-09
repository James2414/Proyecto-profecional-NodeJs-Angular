import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';


declare var iziToast : any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : any = {};
  public imgSelect: string | ArrayBuffer | null | undefined
  public load_btn = false;
  public id: string = ''; // Inicializa como una cadena vacía
  public token: string = '';
  public url: string;
  public file : File | undefined;

  constructor(
    private _route : ActivatedRoute,
    private _productoService : ProductoService,
    private _router : Router

  ) {
    
    this.token = localStorage.getItem('token') || ''; // Obtiene el token del local storage
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id']; // Asigna el id obtenido de la ruta a la variable id
        console.log(this.id)
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else {

              this.producto = response.data;
              this.imgSelect = this.url +'obtener_portada/'+this.producto.portada
      
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    );
  }


  actualizar(actualizarForm: NgForm){
    if(actualizarForm.valid){
    
      var data : any = {};

      if(this.file != undefined){
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.descripcion = this.producto.descripcion;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.contenido = this.producto.contenido;
      data.categoria = this.producto.categoria;

      this.load_btn = true;
      this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(
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
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
        }
      );

    }else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
      this.load_btn = false;
    }

  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
        this.file = <File>event.target.files[0];
    } else {
        iziToast.show({
            title: 'ERROR NO ACCES',
            titleColor: '#ff0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'No IMAGE NO ACCES..'
        });
    }

    // Validación de tamaño y tipo de archivo
    if (this.file && this.file.size <= 4 * 1024 * 1024){
      if(this.file.type === 'image/png' || 
         this.file.type === 'image/webp' || 
         this.file.type === 'image/jpg' || 
         this.file.type === 'image/gif' || 
         this.file.type === 'image/jpeg'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
          // Asegúrate de que la imagen se lea correctamente
        console.log(this.imgSelect);
        reader.readAsDataURL(this.file);

        $('#input-portada').text(this.file.name)
        this.file = this.file

      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Solo se permiten imágenes en formato PNG, JPEG, JPG, GIF o WEBP'
        });

        $('#input-portada').text('seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;

      }
    } else {
      iziToast.show({
        title: 'ERROR TAMANIO',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen es demasiado grande. Máximo 4MB'
      });

      $('#input-portada').text('seleccionar imagen')
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;

    }
    console.log(this.file)
 }

}
