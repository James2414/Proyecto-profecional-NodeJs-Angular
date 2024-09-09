import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  public id: string = ''; // Inicializa como una cadena vacía
  public token : string = ''
  public user : any = undefined;
  public user_lc : any = undefined;


  constructor(
    private _clienteService: ClienteService, // Assuming this is your service7
    

  ) { 
    this.token = localStorage.getItem('token') || '';
    this.id = localStorage.getItem('id') || '' // Obtiene el id del local storage o vacío si no existe   

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
          this.user = undefined;
        }
      );
    }
    
  }

  ngOnInit(): void {
  }

}
