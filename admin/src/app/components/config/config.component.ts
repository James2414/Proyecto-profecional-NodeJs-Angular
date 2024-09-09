import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token: string | null = ''
  public config: any = {};
  public file : File | undefined;
  public titulo_cat = '';
  public icono_cat = '';
  public imgSelect: string | ArrayBuffer | null | undefined;
  public url: string;

  constructor(
    private _adminService: AdminService
  ) { 
    this.token = localStorage.getItem('token');
    this.token = localStorage.getItem('token') || '';
    this.url =GLOBAL.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/'+ this.config.logo
        console.log(this.config);
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {

  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){

      console.log(uuidv4());
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        id: uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      });

      this.titulo_cat = '';
      this.icono_cat = '';

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria'
      });
    }
  }

  actualizar(confForm: NgForm){
    if(confForm.valid){
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        categorias: this.config.categorias,
        correlativo: confForm.value.correlativo,
        logo: this.file
      }

      console.log(data);
      this._adminService.actualiza_config_admin("66cc981c30d993ee17e06be8",data,this.token || '').subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCES',
            titleColor: '#ff0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se actualizo correctamente la configuracion.'
          });
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      });
    }
  }

  fileChangeEvent(event: any):void{
    
    
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
      console.log(this.imgSelect);
      
        
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded')
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');

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

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">")
  }

  eliminar_categoria(idx:number){
    this.config.categorias.splice(idx, 1)
  }

}
