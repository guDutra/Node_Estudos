<template>
    <div>
        <br>
        <h1>Registro de Usuário</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half ">
                <div v-if="error != undefined">
                    <p class="notification is-danger">
                        {{ error }}
                    </p>
                </div>
                <label for="name" class="label">Nome:</label>
                <input type="text" class="input" v-model="name" placeholder="Fulano da Silva" name="name" id="name">
                <label for="email" class="label">Email:</label>
                <input type="email" class="input" v-model="email" placeholder="fulano@gmail.com" name="email" id="email">
                <label for="password" class="label">Senha:</label>
                <input type="password" class="input" v-model="password" name="password" id="password" placeholder="referfe">
                <hr>
                <button type="button" class="button is-success" @click="register">Cadastrar</button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        register() {
            axios.post('http://localhost:8080/user', {
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                this.$router.push({ name: 'home' });
            }).catch(error => {
                const msgError = (error.response && error.response.data) ? error.response.data.err : 'An error occurred';
                this.error = msgError;
            });
        }
    }

}
</script>
<style></style>