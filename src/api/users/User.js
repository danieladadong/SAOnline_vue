import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/user/user/'
export const getUsers=(params)=>{
    return getRequest(url,params);
}
export const getUser=(params)=>{
    return getRequest(url,params);
}
export const getUserDetail=(params)=>{
    return getRequest(url+params+'/');
}