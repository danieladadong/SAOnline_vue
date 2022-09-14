import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/operation/chatuserlist/'
export const getChatUserLists=(params)=>{
    return getRequest(url,params);
}
export const getChatUserList=(params)=>{
    return getRequest(url,params);
}
export const addChatUserList=(params)=>{
    return postJsonRequest(url,params);
}
export const updateChatUserList=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteChatUserList=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getChatUserListDetail=(params)=>{
    return getRequest(url+params+'/');
}