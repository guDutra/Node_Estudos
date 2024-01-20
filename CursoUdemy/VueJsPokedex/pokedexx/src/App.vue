<template>
  <div class="column is-half is-offset-one-quarter">
    <img src="./assets/pokemonLogo.png" >
    <hr>
    <h4 class="is-size-3">Pokedex</h4><br>
    <input class="input is-rounded" type="text" v-model="busca" placeholder="Insera o nome do Pokemon">
    <button id="buscaBtn" @click="buscar" class="button is-success is-fullwidth">Buscar</button>
    <div v-for="(poke, index) in filteredPokemons" :key="poke.url">

      <PokemonComponent :num="index" :name="poke.name" :url="poke.url" />

    </div>
  </div>
</template>

<script>
import PokemonComponent from "./components/Pokemon.vue";
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: ''
    }
  },
  created: async function () {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
      const dados = await response.data;
      this.pokemons = dados.results;
      this.filteredPokemons = dados.results;
     
    } catch (err) {
      console.log(err);
    }

  },
  components: {
    PokemonComponent
  },
  methods: {
    buscar: function() {
      this.filteredPokemons = this.pokemons;
      if(this.busca == '' || this.busca == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(poke => poke.name == this.busca.toLowerCase());
      }
    }
  },
  //computed: {
    /*
    resultadoBusca: function() {
      if(this.busca == '' || this.busca == ' ') {
        return this.pokemons;
      } else {
        return this.pokemons.filter(poke => poke.name.toLowerCase() == this.busca.toLowerCase());
      }
    }*/
 // }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#buscaBtn {
  margin-top: 10px;
}
</style>
