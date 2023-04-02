import { Component, OnInit } from '@angular/core';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
})

export class ListPokemonsComponent implements OnInit {
  constructor() { }

  horloge: string
  setHorloge = setInterval(() => this.horloge = new Date().toLocaleString(), 1000);

  pokemonList: object
  pokemonName: string
  pokemonImg: string|null
  pokemonHp: number
  pokemonAttaks: number
  pokemonDefense: number

  codeErreur: string

  ngOnInit(){
    console.log(`Initialisation ...`);
  }

  takePokemon(pokemonName: string){
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