<template>
  <div id="app">
    <!-- Add this line to the head of your HTML file -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

    <h3>Cadastro</h3>
    <div id="formulario">
      <small class="alert alert-danger" v-show="deuErro"> Erro no formulário</small>
      <input class="form-control" v-model="nomeField" type="text" name="nome" id="nome" placeholder="Nome:"><br>
      <input class="form-control" v-model="emailField" type="email" name="email" id="email" placeholder="Email:"><br>
      <input class="form-control" v-model="numeroField" type="text" name="numero" id="numero" placeholder="Numero:"><br>
      <input class="form-control" v-model="idadeField" type="number" name="idade" id="idade" placeholder="Idade:"><br>
      <textarea class="form-control" v-model="descricaoField" name="descricao" id="descricao" placeholder="Descrição:"
        cols="30" rows="10"></textarea><br>
      <button class="btn btn-success" @click="cadastarUsuario()">Cadastrar</button>
    </div>



    <div v-for="(cliente, index) in orderClientes" :key="cliente.id">
      <h5>{{ index + 1 }}</h5>
      <ClienteComponent :cliente="cliente" @removal="deletarUsuario($event)" />
      <hr>
      <h3>Edição:</h3>
      <input type="text" v-model="cliente.nome">
      <input type="email" v-model="cliente.email">
    </div>


  </div>
</template>

<script>
import _ from "lodash";
import ClienteComponent from "./components/Cliente.vue";

export default {
  name: 'App',
  data() {
    return {
      deuErro: false,
      nomeField: "",
      idadeField: 19,
      descricaoField: "",
      emailField: "",
      numeroField: "",
      clientes: [{
        id: 2,
        nome: 'Gustavo Dutra',
        numero: '054-98432-2121',
        email: 'gudutra05@outlook.com',
        idade: 43,
        descricao: 'alto baixo gradned deajfdpowef'
      },
      {
        id: 22,
        nome: 'Joao ',
        numero: '054-98432-2121',
        email: 'gudutra05@outlook.com',
        idade: 18,
        descricao: 'alto baixo gradned deajfdpowef'
      },
      {
        id: 45,
        nome: 'Leonardo',
        numero: '054-98432-2121',
        email: 'gudutra05@outlook.com',
        idade: 20,
        descricao: 'alto baixo gradned deajfdpowef'
      },
      {
        id: 29,
        nome: 'Bruno',
        numero: '054-98432-2121',
        email: 'gudutra05@outlook.com',
        idade: 16,
        descricao: 'alto baixo gradned deajfdpowef'
      },
      {
        id: 98,
        nome: 'Rafael',
        numero: '054-98432-2121',
        email: 'gudutra05@outlook.com',
        idade: 24,
        descricao: 'alto baixo gradned deajfdpowef'
      }
      ]
    }
  },
  components: {
    ClienteComponent



  },
  methods: {
    cadastarUsuario: function () {
      if (this.nomeField == "" || !isNaN(this.nomeField)) {
        this.deuErro = true;
      } else {
        this.clientes.push({
          id: Date.now(), nome: this.nomeField, numero: this.numeroField, email: this.emailField,
          idade: this.idadeField, descricao: this.descricaoField
        });
        this.nomeField = "";
        this.idadeField = "";
        this.numeroField = "";
        this.emailField = "";
        this.descricaoField = "";
      }
    },
    deletarUsuario: function ($event) {
      var id = $event.idDoCliente;
      var novoArray = this.clientes.filter(cliente => cliente.id != id);
      this.clientes = novoArray;
    }
  },
  computed: {
    orderClientes: function () {
      return _.orderBy(this.clientes,['nome'], ['asc']);
    }
  }
}
</script>

<style>
#formulario {
  width: 600px;

}
</style>
