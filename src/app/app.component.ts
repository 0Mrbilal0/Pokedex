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
  pokemonHp: number
  pokemonAttaks: number
  pokemonDefense: number

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
    P.getPokemonByName(pokemonName.toLowerCase()).then(res => {
      this.pokemonImg = res.sprites.other['official-artwork'].front_default
      this.pokemonName = res.name
      this.pokemonName = this.pokemonName[0].toUpperCase() + this.pokemonName.slice(1)

      // Stats
      this.pokemonHp = +(res.stats[0].base_stat)
      this.pokemonAttaks = +(res.stats[1].base_stat)
      this.pokemonDefense = +(res.stats[2].base_stat)

      console.log(`Nom: ${this.pokemonName}\nHp: ${this.pokemonHp}\nAttacks: ${this.pokemonAttaks}\nDefense: ${this.pokemonDefense}`);
    }).catch(err => {
      err.response.status == 404 ? this.codeErreur = "Le pokemon n'existe pas ou n'est pas en anglais." : this.codeErreur = "Erreur inconnue";
    })
  }
}