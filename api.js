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
