function EnviarEmail(corpo, para, callback) {
        setTimeout(() => {
            console.log(`
            Para: ${para}
            -------------------------------------------
            Corpo: ${corpo}
            -------------------------------------------
            De: Gustavo Dutra`)
            callback('OK', 5, '5s');
        }, 5000)
}

EnviarEmail("Oi seja bem vindo ao Senac RS", "felipe@gmail.com", (status, amount, time) => {
    console.log(`
    Status: ${status}
    ---------------
    Contatos: ${amount}
    --------------
    Tempo: ${time}`);
    console.log("Tudo ok!");
});

console.log('Envio de email iniciado');
