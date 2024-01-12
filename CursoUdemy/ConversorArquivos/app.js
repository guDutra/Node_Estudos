const Reader = require('./Reader');
const Processor = require('./Processor');
const Table = require('./Table');
const HtmlParser = require('./HtmlParser');
const Writer = require('./Writer');
const PdfWriter = require('./PdfWriter');

var leitor = new Reader();

async function main() {
    var dados = await leitor.Read('./planilha.CSV');
    var dadosProcessados = Processor.Process(dados);
    var usuarios = new Table(dadosProcessados);
    var html = await HtmlParser.Parse(usuarios);
    var escritor = new Writer();
    PdfWriter.WriterPDF(Date.now() + '.PDF', html)
    escritor.Write(Date.now() + '.html', html);

}
main();

