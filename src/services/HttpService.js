var request = require('request'),
    config = require('../../config/config');

exports.post = function(server, port, resource, header, body, res) {
    post(server, port, resource, header, body, res);
}

function post(server, port, resource, header, body, res){
    let options = { 
        method: 'POST',
        url: 'http://' + server + ':' + port + resource,
        headers: header,
        body: body,
        json: true 
    };
    
    request(options, function (error, response, body) {

        console.log(body)

        //if (error) throw new Error(error);

        /*

          if(response.statusCode == 401)
                res.status(400).json({error: 'Credenciales no válidos'});
            else if(response.statusCode == 400 && body.errors.projectName != undefined) 
                res.status(400).json({error: "El nombre del proyecto ya existe"});
            else if(response.statusCode == 400 && body.errors.projectKey != undefined) 
                res.status(400).json({error: "La clave ya existe"});

                */
        if(response != undefined){
            if(response.statusCode == 201)
                res.status(200).json({error: 'Proyecto creado correctamente'});
            else
                res.status(400).json({error: body.errors});
        }else
            res.status(400).json({error: 'El servidor no es válido'});
        
    });

}




