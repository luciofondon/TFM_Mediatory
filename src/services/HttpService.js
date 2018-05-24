

/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para realizar peticion HTTP
 */

var request = require('request'),
    Promise = require('promise');

const config = require('../../config/config');

module.exports = {
    /**
     * @param  {} ip Direccion ip del servidor que se va atacar
     * @param  {} resource Recurso de la API a la que atacar
     * @param  {} data Informacion que se va a mandar en formato JSON
     * @description Realizar una peticion post
     */
    post: function(ip, header, resource, data) {
        return post(ip, header, resource, data);
    },

    /**
     * @param  {} ip Direccion ip del servidor que se va atacar
     * @param  {} resource Recurso de la API a la que atacar
     * @description Realizar una peticion get
     */
    get: function(ip, header, resource) {
        return get(ip, header, resource);
    }
}

function get(ip, header, resource){
    let promise = new Promise(function(resolve, reject){
        request(
            {
                method: 'GET',
                uri: 'http://' + ip + "/" + resource,
                headers: header
            },
            function (error, response, body) {
                if(error || response.statusCode >= 400 )
                    reject({error: error, response: response, body: body});
                else
					resolve({error: error, response: response, body: body});
            }
        );
    });
    return promise;
}

function post(ip, header, resource, data){
    let promise = new Promise(function(resolve, reject){
        request(
            {
                method: 'POST',
                uri: 'http://' + ip + resource,
                headers: header,
                json: data
            },
            function (error, response, body) {
                if(error || response.statusCode >= 400 )
                    reject({error: error, response: response, body: body});
                else
                    resolve({error: error, response: response, body: body});
            }
        );
    });
    return promise;
}


/*

function post(server, port, resource, header, body, res){
    let options = {
        method: 'POST',
        url: 'http://' + server + ':' + port + resource,
        headers: header,
        body: body,
        json: true
    };

    request(options, function (error, response, body) {



    });
}
*/



/*

console.log(body)

        //if (error) throw new Error(error);



          if(response.statusCode == 401)
                res.status(400).json({error: 'Credenciales no válidos'});
            else if(response.statusCode == 400 && body.errors.projectName != undefined)
                res.status(400).json({error: "El nombre del proyecto ya existe"});
            else if(response.statusCode == 400 && body.errors.projectKey != undefined)
                res.status(400).json({error: "La clave ya existe"});


			   if(response != undefined){
				if(response.statusCode == 201)
					res.status(200).json({error: 'Proyecto creado correctamente'});
				else
					res.status(400).json({error: body.errors});
			}else
				res.status(400).json({error: 'El servidor no es válido'});
				*/
