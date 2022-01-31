const path = require("path");
const xlsx = require("xlsx");
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDoc = YAML.load("./api.yaml");
const fileUpload = require('express-fileupload');
const app = express();
const db = require('./demo_db_connection');

const port = 5000;

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc));
app.use(fileUpload())
app.listen(port, () => {
  console.log(`Runing  on -> ${port}`)
})



// const workbook = xlsx.readFile(filePath);
// const sheetNames = workbook.SheetNames;

// // Get the data of "Sheet1"
// const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

// /// Do what you need with the received data
// data.map(person => {
//   console.log(`${person.Name} is ${person.Age} years old`);
// })
async function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

app.post('/parser', async (req, res) => {
  try {
    db;
    let xlsFile = req.files.file;
    if (xlsFile.mimetype !== 'application/vnd.ms-excel') {
      res.send('not the file we want Only .xlsx')
    }
    let buf = await toArrayBuffer(xlsFile.data)
    let workBook = xlsx.readFile(buf);
    const sheetNames = workBook.SheetNames;

    // Get the data of "Sheet1"
    const data = xlsx.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

    /// Do what you need with the received data
    data.map(person => {
      console.log(person);
    })

    res.send(data)
  } catch (error) {
    res.send(error)
    console.log(error);
  }

})

