import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any> = [];
  public filtro_apellidos = '';
  public filtro_correo = '';
  

  public page = 1;
  public pageSize = 1000;
  public token: string | null;
  public load_data = true;


  constructor(
    private _clienteService : ClienteService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_Data();
    this.load_data = false;
    // setTimeout(() =>{
    //   this.load_data = false;
    // }, 600);
  }

  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(
      response=>{
        
        this.clientes = response.data;
      },
      error=>{
        console.log(error);
      }
    );

  }

  filtro(tipo: any){
     
    if(tipo == 'apellidos'){
      if(this.filtro_apellidos){
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
          response=>{

            this.clientes = response.data;
            this.load_data = false;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_Data()
      }

    }else if(tipo == 'correo'){
      if(this.filtro_correo){
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo, this.token).subscribe(
          response=>{

            this.clientes = response.data;
            this.load_data = false;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_Data()
      }
    }

 

   }
eliminar(id: string): void {
  const token = this.token || ''; // Asigna un string vacío si `this.token` es null

  this._clienteService.eliminar_cliente_admin(id, token).subscribe(
    response => {
      iziToast.show({
        title: 'Succes',
        titleColor: '#1DC74C',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Se elimino correctamente el cliente'
      });

      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');
      

      this.init_Data();

    },
    error => {
      console.log(error);
    }
  );
}


}
