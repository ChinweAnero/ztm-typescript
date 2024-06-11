import { rejects } from "assert";
import bcrypt from "bcrypt";
import { error } from "console";
import { resolve } from "path";

//number of times to hash password
const saltRounds = 10;

export class HashedPassword{
    constructor(readonly hashed: string){

    }
    
}
export async function hashPassword(plain:string): Promise<HashedPassword>{
    return await new Promise((resolve, reject) =>{
        bcrypt.hash(plain, saltRounds, (error,hashed) =>{
            if(error !== undefined){
                reject(error)
            }else{
                resolve(new HashedPassword(hashed))
            }
        })
    })
}

export async function comparePassword(plain:string, storedHash:HashedPassword):Promise<boolean> {
    return await bcrypt.compare(plain, storedHash.hashed)
    
}
   
    

