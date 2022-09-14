import{
    postJsonRequest,
    postRequest,
    getRequest,
    putJsonRequest,
    deleteRequest
} from '@/api/axios'
import cookie from 'js-cookie';
let url = 'api/organization/organizations/'
export const getOrganizations=(params)=>{
    return getRequest(url,params);
}
export const getOrganization=(params)=>{
    return getRequest(url,params);
}
export const addOrganization=(params)=>{
    return postJsonRequest(url,params);
}
export const updateOrganization=(id,params)=>{
    return putJsonRequest(url+id+'/',params);
}
export const deleteOrganization=(params)=>{
    return deleteRequest(url+params+'/');
}
export const getOrganizationDetail=(params)=>{
    return getRequest(url+params+'/');
}