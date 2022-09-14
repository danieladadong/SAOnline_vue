import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/operation/comments/'
export const getComments=(params)=>{
    return getRequest(url,params);
}
export const getComment=(params)=>{
    return getRequest(url,params);
}
export const addComment=(params)=>{
    return postJsonRequest(url,params);
}
export const updateComment=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteComment=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getCommentDetail=(params)=>{
    return getRequest(url+params+'/');
}