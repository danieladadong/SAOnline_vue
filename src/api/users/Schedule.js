import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/course/schedule/'
export const getSchedules=(params)=>{
    return getRequest(url,params);
}
export const getSchedule=(params)=>{
    return getRequest(url,params);
}
export const addSchedule=(params)=>{
    return postJsonRequest(url,params);
}
export const updateSchedule=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteSchedule=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getScheduleDetail=(params)=>{
    return getRequest(url+params+'/');
}