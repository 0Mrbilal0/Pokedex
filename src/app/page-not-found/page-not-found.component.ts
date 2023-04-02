import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <div>
    <p>Cette page n'existe pas !</p>
    <a routerLink="/pokemons"> Retour </a>
  </div>

  `,
  styles: [
  ]
})
export class PageNotFoundComponent {

}
