import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

const JWT_SEED = process.env.JWT_SEED;


export class JwtAdapter {

    static async generateToken( payload: any, duration: string = '2H'){
        console.log('entro')

            return new Promise( (resolve) => {
    
                    jwt.sign( payload, "seed" , { expiresIn: duration }, 
                    ( err, token ) => {
        
                        if(err) return resolve(null);
            
                        return resolve(token);
                    });
                
            });
    }

    static validateToken( token: string){

        return;
    }
}