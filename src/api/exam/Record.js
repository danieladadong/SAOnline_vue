import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/exam/records/'
export const getRecords=(params)=>{
    return getRequest(url,params);
}
export const getRecord=(params)=>{
    return getRequest(url,params);
}
export const addRecords=(params)=>{
    return postJsonRequest(url,params);
}
export const updateRecords=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteRecords=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getRecordsDetail=(params)=>{
    return getRequest(url+params+'/');
}