import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/organization/teachers/'
export const getTeachers=(params)=>{
    return getRequest(url,params);
}
export const getTeacher=(params)=>{
    return getRequest(url,params);
}
export const addTeacher=(params)=>{
    return postJsonRequest(url,params);
}
export const updateTeacher=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteTeacher=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getTeacherDetail=(params)=>{
    return getRequest(url+params+'/');
}