import jwt from "jsonwebtoken";
import { envs } from "../config/envs";
import { resolve } from 'path';

const JWT_SEED = process.env.JWT_SEED || 'E99878F9A6F071FD40D5863BCB2075C78FF2010EF4D2289E884848160D2716BD';


export class JwtAdapter {

    static async generateToken( payload: any, duration: string = '2H'){

            return new Promise( (resolve) => {
    
                    jwt.sign( payload, JWT_SEED, { expiresIn: duration }, 
                    ( err, token ) => {
        
                        if(err){
                            console.log(err)
                            return resolve(null);

                        }
            
                        return resolve(token);
                    });
                
            });
    }

    static validateToken( token: string){

        return new Promise( (resolve) => {
            jwt.verify( token, JWT_SEED, (err, decoded) => {
                if(err) return resolve(null)

                resolve( decoded )
            });
        });
    }
}