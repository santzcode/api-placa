const http = require("http");

async function consultaPlacasApp(placa){

    const res = await fetch("https://www.placas.app.br/",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "User-Agent":"Mozilla/5.0"
        },
        body:`plate=${placa}`
    });

    const html = await res.text();

    const regex = /<th>(.*?)<\/th>\s*<td>(.*?)<\/td>/g;

    let dados = {};
    let match;

    while((match = regex.exec(html)) !== null){

        let key = match[1].toLowerCase().replace(/ /g,"_");
        let value = match[2];

        dados[key] = value;

    }

    return {
        marca: dados.marca,
        modelo: dados.modelo,
        ano: dados.ano_modelo || dados.ano,
        cor: dados.cor,
        chassi: dados.chassi,
        motorizacao: dados.motor
    };

}

async function consultaPlacaFipe(placa){

    const res = await fetch(`https://placafipe.com/api/placa/${placa}`);
    const json = await res.json();

    return {
        marca: json.marca,
        modelo: json.modelo,
        ano: json.ano,
        cor: json.cor,
        chassi: json.chassi,
        motorizacao: json.motor
    };

}

async function consultaConsultaPlaca(placa){

    const res = await fetch(`https://consultaplaca.com.br/api/${placa}`);
    const json = await res.json();

    return {
        marca: json.marca,
        modelo: json.modelo,
        ano: json.ano,
        cor: json.cor,
        chassi: json.chassi,
        motorizacao: json.motor
    };

}

async function consultar(placa){

    placa = placa.toLowerCase().replace(/[^a-z0-9]/g,"");

    const fontes = [
        {nome:"placas.app.br", fn:consultaPlacasApp},
        {nome:"placafipe", fn:consultaPlacaFipe},
        {nome:"consultaplaca", fn:consultaConsultaPlaca}
    ];

    for(const fonte of fontes){

        try{

            const dados = await fonte.fn(placa);

            if(dados && dados.modelo){

                return {
                    fonte: fonte.nome,
                    dados
                };

            }

        }catch(e){}

    }

    throw new Error("nenhuma fonte respondeu");

}

const server = http.createServer(async (req,res)=>{

    if(req.url.startsWith("/placa/")){

        const placa = req.url.split("/")[2];

        try{

            const resultado = await consultar(placa);

            res.writeHead(200,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify({
                placa,
                fonte:resultado.fonte,
                veiculo:resultado.dados
            },null,2));

        }catch(e){

            res.writeHead(500,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify({
                erro:"não foi possível consultar a placa"
            }));

        }

    }else{

        res.end("API Consulta Veicular");

    }

});

server.listen(3000,()=>{

    console.log("API rodando em http://localhost:3000");

});
