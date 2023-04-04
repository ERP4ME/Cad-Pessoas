const { defineConfig } = require('cypress')
var path = require('path');

const fs = require('fs')
const dir = 'cypress/Downloads';

let noteId

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1400,
  projectId: 'ehz3wk',
  retries: {
    runMode: 1,
    openMode: 0,


  },

  e2e: {
    baseUrl: 'https://erpforme-hml.alterdata.com.br/',

    setupNodeEvents(on, config) {

      on('task', {
        listarArquivosEPastasDeUmDiretorio(diretorio, arquivos) {

          if (!arquivos)
            arquivos = [];

          let listaDeArquivos = fs.readdirSync(diretorio);
          for (let k in listaDeArquivos) {
            let stat = fs.statSync(diretorio + '/' + listaDeArquivos[k]);
            if (stat.isDirectory())
              listarArquivosEPastasDeUmDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
            else
              arquivos.push(diretorio + '/' + listaDeArquivos[k]);
          }

          return arquivos;

        },

        lerArquivo(dir) {
          let mensagemSucesso = 'falhou'
          fs.readdir(dir, (err, arquivos) => {
            arquivos.forEach(arquivo => {
              const caminho = arquivos

              fs.rename(`cypress/Downloads/${caminho}`, 'cypress/Downloads/documento.pdf', function (err) {
                //Caso a execução encontre algum erro
                if (err) {
                  //Mensagem Sucesso
                  mensagemSucesso = err
                  throw err;
                } else {
                  //Mensagem sucesso
                  mensagemSucesso = 'Arquivo renomeado'

                }
              });

            });

          })

          return mensagemSucesso

        },
         
       
       
        excluirArquivo() {
          const fs = require('fs');
          const path = 'cypress/Downloads/documento.pdf';
          if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
              if (err) throw err;
              console.log('Arquivo excluído com sucesso!');
            });
          } else {
            console.log('O arquivo não existe na pasta.');
          }
          return null
        

        },
       

         compareXMLs(filePath1, filePath2, tagsToIgnore) {
          // Reading the contents of the files
          const xml1 = fs.readFileSync(filePath1, 'utf8');
          const xml2 = fs.readFileSync(filePath2, 'utf8');

          // Parsing the XML strings to objects
          const parser = new xml2js.Parser({ ignoreAttrs: true, explicitArray: false });
          parser.parseString(xml1, (err, result1) => {
            if (err) throw err;
            parser.parseString(xml2, (err, result2) => {
              if (err) throw err;

              // Removing the ignored tags from both objects
              removeTags(result1, tagsToIgnore);
              removeTags(result2, tagsToIgnore);

              // Comparing the objects
              const isEqual = JSON.stringify(result1) === JSON.stringify(result2);
              console.log(`The two XML files are ${isEqual ? 'equal' : 'not equal'}.`);
            });
          });
         
        },

        removeTags(obj, tagsToIgnore) {
          for (const tag of tagsToIgnore) {
            if (obj[tag]) delete obj[tag];
            for (const prop in obj) {
              if (obj[prop] instanceof Object) {
                removeTags(obj[prop], tagsToIgnore);
              }
            }
          }
        },
        
        saveNodeId(id) {
          noteId = id
          return noteId
        },

        getNoteId() {
          return noteId
        }


      })

    },

    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    experimentalMemoryManagement: true,
   // experimentalSessionAndOrigin: true,
   // experimentalRunAllSpec: true
  },


})
