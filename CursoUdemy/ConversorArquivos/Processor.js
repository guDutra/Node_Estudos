class Processor {
    static Process(data) {
        var dados = data.split("\r\n");
        var rows = []
        dados.forEach(row => {
            var arr = row.split(';');
            rows.push(arr);
        });
        return rows;
    }
}

module.exports = Processor;