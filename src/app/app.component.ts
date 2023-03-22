import { Component } from '@angular/core';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
})

export class AppComponent {
  constructor(){}

  title = 'Un titre';
  timer = 0;
  i = setInterval(() => this.timer++, 1000);
  Etat = false
  buttonValue = "Pause"

  horloge: string
  setHorloge = setInterval(() => this.horloge = new Date().toLocaleString(), 1000);

  pokemonName: string
  pokemonImg: string|null
  codeErreur: string

  ngOnInit(){
    console.log(`Initialisation ...`);    
  }

  Pause() {
    if (this.Etat == false) {
      console.log('Pause');
      clearInterval(this.i)
      this.buttonValue = "Start"
      this.Etat = true
    } else if (this.Etat == true) {
      console.log('Start');
      this.i = setInterval(() => this.timer++, 1000);
      this.buttonValue = "Pause"
      this.Etat = false
    }
  }

  takePokemonName(pokemonName: string){
    const result = P.getPokemonByName(pokemonName).then(res => {
      this.pokemonImg = res.sprites.other['official-artwork'].front_default
      this.pokemonName = res.name
    }).catch(err => {
      err.response.status == 404 ? this.codeErreur = "Le pokemon n'existe pas ou n'est pas en anglais." : this.codeErreur = "Erreur inconnue";
    })
  }
}
