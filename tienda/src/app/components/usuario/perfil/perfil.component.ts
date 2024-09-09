import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast : any;
declare var $:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente : any = {};
  public id: string = ''; // Inicializa como una cadena vacía
  public token: string = '';

  constructor(
    private _clienteService : ClienteService
  ) {
    this.id = localStorage.getItem('id') || ''; // Obtiene el id del local storage o vacío si no existe   
    this.token = localStorage.getItem('token') || ''; // Obtiene el token del local storage o vacío si no existe 

    if(this.id){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response=>{
          this.cliente = response.data;
        }
      )
    }   
  }

  ngOnInit(): void {
  }

  actualizar(actualizarForm : NgForm){
    if(actualizarForm.valid){ 
      this.cliente.password = $('#input_password').val();
      //tenemos un problema para arrglarlo
      this._clienteService.actualizar_perfil_cliente_guest(this.id, this.cliente, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Succes',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se actaulizo correctamente su perrfil'
          });
        }
      )

    }else {
      iziToast.show({
        title: 'Error',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        message: 'Los datos del formuklario no son validos',
        position: 'topRight'
      });
    }
  }

}
