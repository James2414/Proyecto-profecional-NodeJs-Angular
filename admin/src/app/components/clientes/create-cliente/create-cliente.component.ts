import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    genero: '' 
  };

  public token: string | null;
  public load_btn: boolean = false; // el valor que prefieras


  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm): void {
    if (registroForm.valid) {
      this.load_btn = true; // cambiar a true para mostrar el spinner
      console.log('Formulario válido, datos:', this.cliente);
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(

        response=>{
          console.log(response);
          iziToast.show({
            title: 'Succes',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se Registro Correctamente El cliente'
          });

          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            email: '',
            f_nacimiento: '',
            dni: '',
            telefono: '',
          }
          
          this.load_btn = false; // cambiar a false para mostrar el botón de regresar

          this._router.navigate(['/panel/clientes']);

        },
        error=>{
          console.log(error);
        }
      );
      // Aquí puedes agregar la lógica para enviar los datos al backend
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Datos del formulario inválidos'
      });
    }
  }
}
