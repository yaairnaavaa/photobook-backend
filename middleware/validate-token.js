const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.get('authorization');

    if (!authorization) {
        return res.status(401).json({ error: 'Acceso denegado' });
    } 

    try {
        let token = null;
    
        if(authorization.toLocaleLowerCase().startsWith('bearer')){
            token = authorization.substring(7);
        }
    
        if(!token){
            return res.status(401).json({error: 'No se encontró Token'});
        }
    
        const decodedToken = JWT.verify(token,'NoobCoder');
        
        if(!decodedToken){
            return res.status(401).json({error: 'Token expiró o es inválido'});
        }
    
        next();
    } catch (error) {
        res.status(400).json({error: 'El Token no es válido'});
    }
}