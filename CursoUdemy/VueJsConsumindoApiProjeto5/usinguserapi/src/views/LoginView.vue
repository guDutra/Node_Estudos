<template>
    <div>
        <br>
        <h1>Login de Usuário</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half ">
                <div v-if="error != undefined">
                    <p class="notification is-danger">
                        {{ error }}
                    </p>
                </div>
                <label for="email" class="label">Email:</label>
                <input type="email" class="input" v-model="email" placeholder="fulano@gmail.com" name="email" id="email">
                <label for="password" class="label">Senha:</label>
                <input type="password" class="input" v-model="password" name="password" id="password" placeholder="referfe">
                <hr>
                <button type="button" class="button is-success" @click="login">Logar</button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
export default {
    
    data() {
        return {
           
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:8080/login', {
                email: this.email,
                password: this.password
            }).then(res => {

                localStorage.setItem('token', res.data.token);
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