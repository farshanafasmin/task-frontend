
import { BaseUrl } from "./BaseUrl";
import { commonApi } from "./CommonApi";

// register
export const registerApi=async (bodyData)=>{
   return await commonApi('POST',`${BaseUrl}/user/register`,bodyData)
}

// login
export const loginApi=async (bodyData)=>{
    return await commonApi('POST',`${BaseUrl}/user/login`,bodyData)
 }

 // add task
export const addTaskApi=async (bodyData)=>{
    return await commonApi('POST',`${BaseUrl}/user/addtask`,bodyData)
 }

// view task
export const viewTaskApi = async (userId) => {
    return await commonApi('GET', `${BaseUrl}/user-tasks/${userId}`);
}
 
// view single task
export const singleTaskApi = async (taskId) => {
    return await commonApi('GET', `${BaseUrl}/user-stask/${taskId}`);
}
 
// delete task

export const deleteTask=async(taskId)=>{
    return await commonApi("DELETE",`${BaseUrl}/user/delete-task/${taskId}`,{})
}

// edit task

export const editTask=async(taskId,body)=>{
    return await commonApi("PUT",`${BaseUrl}/edit-task/${taskId}`,body)
}