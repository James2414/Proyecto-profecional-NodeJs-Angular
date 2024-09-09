import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var noUiSlider: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit, AfterViewInit {

  public config_global: any = {}

  constructor(
    private _clienteService: ClienteService // Agregamos el servicio de cliente
  ) {
    this._clienteService.obtener_config_publico().subscribe(
      response => {
        this.config_global = response.data;
        console.log(this.config_global);
      },
    );
  }



  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const slider: any = document.getElementById('slider');

    // Verificamos que el slider exista antes de crearlo
    if (slider) {
      noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
          'min': 0,
          'max': 1000
        },
        tooltips: [true, true],
        pips: {
          mode: 'count',
          values: 5,
        }
      });

      slider.noUiSlider.on('update', (values: string[]) => {
        // Aseguramos que los valores sean accesibles correctamente
        (document.querySelector('.cs-range-slider-value-min') as HTMLInputElement).value = values[0];
        (document.querySelector('.cs-range-slider-value-max') as HTMLInputElement).value = values[1];
      });

      // Cambiamos el estilo de las tooltips
      const tooltips = document.querySelectorAll('.noUi-tooltip');
      tooltips.forEach((tooltip) => {
        (tooltip as HTMLElement).style.fontSize = '11px';
      });
    } else {
      console.error('Slider element not found');
    }
  }
}
