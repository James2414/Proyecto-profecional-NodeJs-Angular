import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any ={}
  public usuario : any ={}
  public token: string = '';

  constructor(
    private _clienteService : ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token') ?? '';  // Si el valor es null, asigna una cadena vacía
    if (this.token) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }


  login(loginForm : NgForm){

    if (loginForm.valid) {
      console.log(this.user);
     
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response=>{
         if(response.data === undefined){
          iziToast.show({
            title: 'Error',
            titleColor: '#ff0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: response.message
          });
         }else{
          this.usuario = response.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.data._id);

          this._router.navigate(['/']);

         }
        },
        error=>{
          console.log(error);
        }
      );
      
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
