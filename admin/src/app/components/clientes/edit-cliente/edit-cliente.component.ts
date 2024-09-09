import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente: any = {};  
  public id: string = ''; // Inicializa como una cadena vacía
  public token: string = '';
  public load_btn: boolean = false;
  public load_data: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router : Router
  ) { 
    this.token = this._adminService.getToken() ?? ''; // Asegura que token sea siempre un string
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id']; // Obtiene el id del cliente del parámetro de la URL

        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          response => {
            console.log(response);
            if (response.data === undefined) {
              this.cliente = undefined;
                
              this.load_data = false;
            } else {
              
              this.cliente = response.data;
              this.load_data = false; // Oculta el spinner de carga
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    );
  }

  actualizar(updateForm: NgForm) {
    if (updateForm.valid) {
      this.load_btn = true; // Muestra el botón de carga
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        response => {
         
          // Maneja la respuesta exitosa aquí
          iziToast.show({
            title: 'Succes',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se actualizo Correctamente El cliente'
          });
          this.load_btn = false; // Oculta el botón de carga
          this._router.navigate(['/panel/clientes']);
        },
        error => {
          console.error(error);
          // Maneja el error aquí
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        position: 'topRight',
        color: 'green',
        class: 'text-danger',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }
}  