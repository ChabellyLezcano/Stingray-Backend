const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre ) => {

    const payload = { uid, nombre };
    
    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
    
            if ( err ) {
                // TODO MAL
                console.log(err);
                reject(err);
    
            } else {
                // TODO BIEN
                resolve( token )
            }
    
        })
    });

}

module.exports = {
    generarJWT
}