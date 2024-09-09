import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {


  public producto : any = {
    categoria: ''
  };
  public file : File | undefined;
  public imgSelect: string | ArrayBuffer | null = 'assets/img/01.jpg';
  public token: string | null = null;
  public load_btn = false;
  public config_global : any = {}

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this._adminService.obtener_config_publico().subscribe(
      response => {
        if (response && response.data) {
          this.config_global = response.data;
          console.log(this.config_global);
        } else {
          console.warn('No se encontraron datos en la respuesta');
        }
      },
      error => {
        console.error('Error al obtener la configuración:', error);
      }
    );
    
  }

  ngOnInit(): void {
  }
  
  registro(registroForm: NgForm){
    if(registroForm.valid){
      if(this.file == undefined){

        iziToast.show({
          title: 'Error',
          titleColor: '#ff0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe subir una portada para registrar'
        });

      }else {
        console.log(this.producto);
      console.log(this.file);
      this.load_btn = true;

      this._productoService.registro_producto_admin(this.producto,this.file, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Succes',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se Registro correctamente el producto'
          });

          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },
        error=>{
          console.log(error);
          this.load_btn = false;
        }
      );
      }
      // Implementa la lógica para registrar el producto aquí
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos!'
      });
      this.load_btn = false;

      
      $('#input-portada').text('seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;///            

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
