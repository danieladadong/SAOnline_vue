import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/videos/'
export const getVideos=(params)=>{
    return getRequest(url,params);
}
export const getVideo=(params)=>{
    return getRequest(url,params);
}
export const addVideo=(params)=>{
    return postJsonRequest(url,params);
}
export const updateVideo=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteVideo=(params)=>{
    return deleteRequest(url,params);
}
export const getVideoDetail=(params)=>{
    return getRequest(url+params+'/');
}