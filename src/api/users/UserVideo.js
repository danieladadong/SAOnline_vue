import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/u_videos/'
export const getUserVideos=(params)=>{
    return getRequest(url,params);
}
export const getUserVideo=(params)=>{
    return getRequest(url,params);
}
export const addUserVideo=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUserVideo=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUserVideo=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserVideoDetail=(params)=>{
    return getRequest(url+params+'/');
}