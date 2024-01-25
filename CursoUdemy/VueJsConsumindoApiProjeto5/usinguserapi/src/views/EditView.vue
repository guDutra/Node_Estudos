<template>
    <div>
        <br>
        <h1>Edição de Usuário</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half ">
                <div v-if="error != undefined">
                    <p class="notification is-danger">
                        {{ error }}
                    </p>
                </div>
                <label for="name" class="label">Nome:</label>
                <input type="text" class="input" v-model="name" name="name" id="name">
                <label for="email" class="label">Email:</label>
                <input type="email" class="input" v-model="email" name="email" id="email">
                <label for="role" class="label">Cargo: (0 Comum | 1 Admin)</label>
                <input type="number" class="input" v-model="role" name="role" id="role" min="0" max="1">

                <hr>
                <button type="button" class="button is-success" @click="update">Editar</button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
export default {
    async created() {
        try {
            const req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            };
            const userResponse = await axios.get('http://localhost:8080/user/' + this.$route.params.id, req);
            this.name = userResponse.data.name;
            this.email = userResponse.data.email;
            this.id = userResponse.data.id;
            this.role = userResponse.data.role;

        } catch (error) {
            console.log(error);
            this.$router.push({ name: 'home' });
        }

    },
    data() {
        return {
            name: '',
            email: '',
            role: -1,
            id: -1,
            error: undefined
        }
    },
    methods: {
        update() {
            const req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            };

            axios.put('http://localhost:8080/user', {
                id: this.id,
                name: this.name,
                email: this.email,
                role: this.role
            }, req).then(res => {
                console.log(res);
                this.$router.push({ name: 'Users' });
            }).catch(error => {
                const msgError = (error.response && error.response.data) ? error.response.data.err : 'An error occurred';
                this.error = msgError;
            });
        }
    }

}
</script>
<style></style>