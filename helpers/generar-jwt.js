const jwt = require('jsonwebtoken');

const generarJWT = (id = '', name = '') => {
    console.log('entro jwt------------------------')

    return new Promise( (resolve,reject) => {

        const payload = { id, name };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '6h'
        }, (err, token) => {
            
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            else{
                resolve( token );
            }
        });
    })
}

module.exports = {
    generarJWT
}