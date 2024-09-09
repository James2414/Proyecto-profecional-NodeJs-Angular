import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public id: string = ''; // Inicializa como una cadena vacía
  public token: string = '';
  public user : any = undefined;
  public user_lc : any = undefined;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router

  ) {
    this.token = localStorage.getItem('token') || ''; // Obtiene el token del local storage o vacío si no existe
    this.id = localStorage.getItem('id') || ''; // Obtiene el id del local storage o vacío si no existe   
 
    // Obtiene el usuario del local storage o vacío si no existe
    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id, this.token).subscribe(
        response=>{       
          this.user = response.data
          localStorage.setItem('user_data', JSON.stringify(this.user))
          
               
            const userData = localStorage.getItem('user_data');
  
            if (userData) {
            try {
              this.user_lc = JSON.parse(userData);  // Si no es null, intenta parsear
            } catch (error) {
              console.error('Error al parsear user_data:', error);
              this.user_lc = undefined;  // Si falla el parseo, asigna undefined
            }
          } else {
            this.user_lc = undefined;  // Si es null, asigna undefined
          }
  
  
  
        },
        error=>{
          console.log(error);
          
        }
      );
    }
    
    

   }

  ngOnInit(): void {
  }
  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);  // Si hay un error, redirecciona al login
  }

}

