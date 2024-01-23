<template>
    <h1 class="title is-1 has-text-centered">Tela de Usuários</h1>
    <div v-if="error != undefined">
        <p class="notification is-danger">
            {{ error }}
        </p>
    </div>
    <div class="columns is-centered is-7 mx-auto">
        <table class="table is-striped is-bordered is-fullwidth ">

            <thead>
                <th class="has-text-centered">ID</th>
                <th class="has-text-centered">Nome</th>
                <th class="has-text-centered">Email</th>
                <th class="has-text-centered">Cargo</th>
                <th class="has-text-centered">Ações</th>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td> {{ user.id }}</td>
                    <td> {{ user.name }}</td>
                    <td> {{ user.email }}</td>
                    <td> {{ this.processRole(user.role) }}</td>
                    <td><button class="button is-success">Editar</button>|<button class="button is-danger"
                            @click="showModalScreen(user.id)"> Deletar </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div :class="{ modal: true, 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Você quer confirmar a deleção desse usuário?
                        </p>

                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p> !!!</p>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser()">Sim, quero deletar</a>
                    </footer>
                </div>
            </div>
            <button class=" modal-close is-large" aria-label="close" @click="hideModal()">
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created() {
        const req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8080/users', req).then(res => {
            this.users = res.data;
        }).catch(error => {
            console.error(error);
        })
    },
    data() {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1,
            error: undefined
        }
    },
    methods: {
        processRole(value) {
            if (value == 0) {
                return 'Usuário comum';
            } else {
                return 'Administrador';
            }
        },
        hideModal() {
            this.showModal = false;
        },
        showModalScreen(id) {
            this.deleteUserId = id;
            this.showModal = true;
        },
        async deleteUser() {
            try {
                const req = {
                    headers: {
                        Authorization: 'Bearer ' +  localStorage.getItem('token')
                    }
                }
                const resultDelete = await axios.delete('http://localhost:8080/user/' + this.deleteUserId, req);
                console.log(resultDelete);
                const resultUsers = await axios.get('http://localhost:8080/users', req);
                this.users = resultUsers.data;
                this.showModal = false;
            } catch (error) {
                console.error(error);
                const msgError = (error.response && error.response.data && error.response.data.err) ? error.response.data.err : 'Aconteceu um erro no sistema';
                this.error = msgError;
                this.showModal = false;
            }
        }
    }
}
</script>

<style scoped></style>