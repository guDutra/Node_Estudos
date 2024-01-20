<template>
    
    <div id="pokemon">
       
        <div class="card">
            <div class="card-image">
                <figure>
                    <img :src="currentImg" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">

                    <div class="media-content">
                        <p class="title is-4">{{ num + 1 }} - {{ upper(name) }}</p>
                        <p class="subtitle is-6">{{ pokemon.type }}</p>
                    </div>
                </div>

                <div class="content">
                    <button class="button is-normal is-fullwidth" @click="mudarSprite">Mudar Sprite</button>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'PokemonComponent',
    props: {
        num: Number,
        name: String,
        url: String
    },

    created: function () {

        axios.get(this.url).then(res => {
            this.pokemon.type = res.data.types[0].type.name;
            this.pokemon.front = res.data.sprites.front_default;
            this.pokemon.back = res.data.sprites.back_default;
            this.currentImg = this.pokemon.front;
            
        }).catch(error => {
            console.log(error);
        });



    },
    data() {
        return {
            isFront: true,
            currentImg: '',
            pokemon: {
                type: '',
                front: '',
                back: ''
            }
        }
    },
    methods: {
        upper: function (name) {
            var newName = name.charAt(0).toUpperCase() + name.slice(1);
            return newName;
        },
        mudarSprite: function () {
            if(this.isFront) {
                this.currentImg = this.pokemon.back;
                this.isFront = false;
            } else {
                this.currentImg = this.pokemon.front;
                this.isFront = true;
            }
        }
    }
}
</script>
<style>
#pokemon {
    margin-bottom: 10px;
    margin-top: 0;
}
</style>