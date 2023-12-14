import axios from 'axios'
import {selectFields, module, query, limit} from './query.js'
import {criaArquivoCSV} from './rotinas.js'
import fs from 'fs'
import dotenv from 'dotenv'


console.log('Consultando Zoho...')
dotenv.config()
const token = process.env.ZOHO_ACESS_TOKEN



const queryRecords = async ({selectFields, module, query, limit, token} ) => {
    let registros = []

    //teste via arquivo
    query = fs.readFileSync("./ArquivosGerados/clausulaWHERE.txt", "utf8").trim().replace(/(\r\n|\n|\r)/gm, ""); 
    //

    const url = "https://www.zohoapis.com/crm/v3/coql";
    const requestBody = { "select_query": `select ${selectFields} from ${module} where ${query} limit ${limit}` }

    const requestDetails = {
        method: "POST",
        headers: { 'Authorization': `Zoho-oauthtoken ${token}` },
        body: JSON.stringify(requestBody),
        encoding: "utf8",
        throwHttpErrors: false
    }

    
    await axios.post(`${url}`, requestDetails.body, requestDetails)
        .then(response =>{
            registros = response.data.data
            //console.log(registros)
            criaArquivoCSV(registros, selectFields)
        })
        .catch(error => {
            console.log("Erro : " + JSON.stringify(error.response.data));
        }
    )
    return registros
}

queryRecords({selectFields, module, query, limit, token})


