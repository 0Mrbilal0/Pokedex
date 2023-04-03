import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonDescComponent } from './pokemon-desc/pokemon-desc.component';

const routes: Routes = [
  { path:'pokemons', component: ListPokemonsComponent },
  { path:'pokemon/:id', component: PokemonDescComponent },
  { path:'', redirectTo:'pokemons', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }