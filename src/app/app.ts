import { Component, signal, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }







  
  duplicaminumero(valor:number):number{
    valor = valor * 2;
    return valor;


 


  }

  pelicula = {
    nombre: "spider-man",
    fecha_lanzamiento: new Date(),
    precio: 123.33
  }

}





