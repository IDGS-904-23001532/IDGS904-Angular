import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IDGS904');
  saludo = "Hello my bitch"

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





