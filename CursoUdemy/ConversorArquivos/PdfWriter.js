const htmlPdf = require('html-pdf');

class PdfWriter {
    static WriterPDF(filename, html) {
        htmlPdf.create(html, {}).toFile(filename, (err) => {});
    }
};

module.exports = PdfWriter;