import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';

export const Login=(params)=>{
    return postRequest('api/login/',params);
}

export const Regist=(params)=>{
    return postRequest('api/regist/',params);
}