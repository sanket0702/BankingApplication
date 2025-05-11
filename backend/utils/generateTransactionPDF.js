const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateTransactionPDF = (transactions, userName) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../temp/${userName}_statement.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text(`Transaction Statement for ${userName}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(12);
  transactions.forEach((tx, index) => {
    doc.text(`${index + 1}. ${tx.timestamp.toLocaleString()}`);
    doc.text(`   Transaction ID: ${tx.transactionId}`);
    doc.text(`   Type: ${tx.type}`);
    doc.text(`   Amount: ₹${tx.amount}`);
    doc.text(`   Message: ${tx.message || '-'}`);
    doc.text(`   Balance after Txn: ₹${tx.balance}`);
    doc.moveDown(1);
  });

  doc.end();
  return filePath;
};

module.exports = generateTransactionPDF;
