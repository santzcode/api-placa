const http = require("http");

async function consultaPlacasApp(placa){

    const res = await fetch("https://www.placas.app.br/",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "User-Agent":"Mozilla/5.0",
            "Origin":"https://www.placas.app.br",
            "Referer":"https://www.placas.app.br/"
        },
        body:`plate=${placa}`
    });

    const html = await res.text();

    const dados = {};

    const regex = /<th.*?>(.*?)<\/th>\s*<td.*?>(.*?)<\/td>/gi;

    let match;

    while((match = regex.exec(html)) !== null){

        const key = match[1]
        .toLowerCase()
        .replace(/ /g,"_")
        .replace(/[^a-z0-9_]/g,"");

        dados[key] = match[2];

    }

    return {
        marca: dados.marca || null,
        modelo: dados.modelo || null,
        ano: dados.ano_modelo || dados.ano || null,
        cor: dados.cor || null,
        chassi: dados.chassi || null,
        motorizacao: dados.motor || null
    };

}

const server = http.createServer(async (req,res)=>{

    if(req.url.startsWith("/placa/")){

        const placa = req.url.split("/")[2];

        try{

            const dados = await consultaPlacasApp(placa);

            res.writeHead(200,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify({
                placa:placa,
                veiculo:dados
            }));

        }catch(e){

            res.writeHead(500,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify({
                erro:"não foi possível consultar a placa"
            }));

        }

    }else{

        res.writeHead(200,{
            "Content-Type":"text/plain"
        });

        res.end("API consulta placa rodando");

    }

});

server.listen(3000,"0.0.0.0",()=>{

    console.log("API rodando na porta 3000");

});
