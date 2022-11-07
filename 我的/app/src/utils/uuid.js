import { v4 as uuidv4 } from 'uuid';

export const getUUID = ()=>{
    let uuid = localStorage.getItem("uuid")
    //先看本地有没有uuid

    if(!uuid){
        //如果没有
        uuid = uuidv4()
        localStorage.setItem("uuid",uuid)
    }

    return uuid
}