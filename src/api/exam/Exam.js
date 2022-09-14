import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/exam/exampapers/'
export const getExams=(params)=>{
    return getRequest(url,params);
}
export const getExam=(params)=>{
    return getRequest(url,params);
}
export const addExam=(params)=>{
    return postJsonRequest(url,params);
}
export const updateExam=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteExam=(params)=>{
    return deleteRequest(url+params+'/');
}
export const testExam=(params)=>{
    return postJsonRequest('api/exam/calculate/',params);
}
export const getExamDetail=(params)=>{
    return getRequest(url+params+'/');
}