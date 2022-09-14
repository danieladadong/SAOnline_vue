import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/user/profiles/'
export const getUserProfiles=(params)=>{
    return getRequest(url,params);
}
export const getUserProfile=(params)=>{
    return getRequest(url,params);
}
export const addUserProfile=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUserProfile=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUserProfile=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserProfileDetail=(params)=>{
    return getRequest(url+params+'/');
}