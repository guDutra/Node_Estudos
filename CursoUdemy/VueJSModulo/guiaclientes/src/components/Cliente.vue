<template>
    <div :class="{ 'cliente': !isPremium, 'cliente-premium': isPremium }">
        <!-- 2 condicionais adicionadas aonde o lado esquerda é a classe adicionada e o lado direito a condição  -->
        <h4>Nome: {{ cliente.nome }} </h4>
        <h5 v-if="showAge === true || showAge === undefined">Idade: {{ cliente.idade }}</h5>
        <h5 v-else> Usuário não infomrou a idade</h5>
        <hr>
        <p>{{ descricao }}</p>
        <hr>
        <p>Número: {{ cliente.numero }}</p>
        <p>EMail: {{ cliente.email }}</p>
        <p>Descrição: {{ cliente.descricao }}</p>
        <button class="btn btn-primary" @click="mudarCor($event)">Mudar cor</button>
        <button class="btn btn-danger" @click="emitirEventoDelete" type="button">Deletar</button>


    </div>
</template>

<script>
export default {
    name: 'ClienteComponent',
    data() {
        return {
            isPremium: false

        }
    },
    props: {
        cliente: Object,
        showAge: Boolean
    },
    methods: {
        mudarCor : function($event) {
            console.log($event);
            this.isPremium = !this.isPremium;
        },
        emitirEventoDelete: function() {
            console.log("filho");
            this.$emit("removal",{ idDoCliente: this.cliente.id})
        }
    }
}
</script>

<style scoped>
.cliente {
    max-width: 600px;
    height: 350px;
    background-color: #ECE5E3;
    padding: 1%;
    margin-top: 2%;
}

.cliente-premium {
    color: goldenrod;
    background-color: black;
    max-width: 600px;
    height: 350px;
    padding: 1%;
    margin-top: 2%;
}
</style>