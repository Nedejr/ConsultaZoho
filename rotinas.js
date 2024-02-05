import * as fs from 'fs'; 
import moment from 'moment'



const criaArquivoCSV = (dados, cabecalho)=>{
 
  let writeStream = cabecalho + "\n"
   
  const vector = dados.forEach((e,i) => {
    const linha = Object.values(dados[i]).join() + "\n"
    writeStream = writeStream + linha
  
  });
  let nomeArquivo = "arquivo_" + moment().format('DDMMYYYY_HHmmss') + ".csv"
  fs.writeFile("./ArquivosGerados/" + nomeArquivo, writeStream, (err)=>{
    try { 
  
        console.log("Arquivo escrito com sucesso\n"); 
        console.log("O arquivo " + nomeArquivo + " tem o seguinte conteudo:" + "\n"); 
        console.log(fs.readFileSync("./ArquivosGerados/" + nomeArquivo, "utf8")); 
  
    } catch (error) {
      console.log("Erro ao escrever o arquivo  " + error)
    }
  })
  
}

const montaClausulaWHERE = ()=>{
  let arquivo = fs.readFileSync("./ArquivosGerados/clausulaWHERE.txt", "utf8").trim(); 
  return arquivo.trim()
}

const transformaAarray = ()=>{
  let arquivo = fs.readFileSync("./ArquivosGerados/clausulaWHERE2.txt", "utf8").trim();
  let novoArray = arquivo.trim().replace(/(\r\n|\n|\r)/gm, "").split(",")
  console.log(novoArray.length)
}


export {criaArquivoCSV}

transformaAarray()