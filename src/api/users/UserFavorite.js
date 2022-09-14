import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/operation/favorites/'
export const getUserFavorites=(params)=>{
    return getRequest(url,params);
}
export const getUserFavorite=(params)=>{
    return getRequest(url,params);
}
export const addUserFavorite=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUserFavorite=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUserFavorite=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserFavoriteDetail=(params)=>{
    return getRequest(url+params+'/');
}