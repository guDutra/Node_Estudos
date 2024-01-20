<template>
    <div>
        <input type="text" name="email" id="email" placeholder="email"><br>
        <input type="text" name="nome" id="nome" placeholder="Nome:"><br>
        <button>Teste</button>
        <router-view/>
    </div>
</template>
  
<script>
export default {
    name: 'CadastroView',
    created() {
        this.parameterRoute = this.$route.params.dado;
        console.log(this.parameterRoute);
    },
    data() {
        return {
            parameterRoute: ""
        }
    }
}
</script>
  