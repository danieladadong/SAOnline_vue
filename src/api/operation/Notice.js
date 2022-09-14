import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/operation/notices/'
export const getNotices=(params)=>{
    return getRequest(url,params);
}
export const getNotice=(params)=>{
    return getRequest(url,params);
}
export const addNotice=(params)=>{
    return postJsonRequest(url,params);
}
export const updateNotice=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteNotice=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getNoticeDetail=(params)=>{
    return getRequest(url+params+'/');
}