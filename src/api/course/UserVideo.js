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
    return getRequest(url,params)
}
export const addUserVideos=(params)=>{
    return postJsonRequest(url,params);
}
export const updateUserVideos=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteUserVideos=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getUserVideosDetail=(params)=>{
    return getRequest(url,params);
}