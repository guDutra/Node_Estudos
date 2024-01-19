<template>
  <div id="app">
    
    <div v-for="(cliente, index) in clientes" :key="cliente.id" >
      <h5>{{ index }}</h5>
      <ClienteComponent :cliente="cliente"/>
      <hr>
      <h3>Edição:</h3>
      <input type="text"  v-model="cliente.nome">
      <input type="email"  v-model="cliente.email">
    </div>

  </div>
</template>

<script>
import ClienteComponent from "./components/Cliente.vue";

export default {
  name: 'App',
  data() {
    return {
      clienteVictor: {
        nome: 'Victor',
        numero: '054-42424-4242',
        email: 'victor@gmail.com',
        idade: 23,
        descricao: 'dcoarmoerffe'
      },
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



  }
}
</script>

<style></style>
