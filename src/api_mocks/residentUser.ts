//  getResidentUsers, addResidentUser, updateResidentUser, deleteResidentUser
import { resident_user_type } from "../data/resident_user";


// export type resident_user_type ={
//     id: number,
//     name: string,
//     email: string,
//     password: string,
//     created_at: string,
//     updated_at: string
//     unity_id: number
//     active: boolean
// }
export const getResidentUsers = ()=>{
    return Promise.resolve({
        data: [
            {
                id: 1,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 2,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 3,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 24,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 15,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 62,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 17,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 82,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 91,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 211,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 121,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },
            {
                id: 223,
                name:"patrick",
                email:"patrick@gmail.com",
                password:"123456",
                created_at:"2023-04-01T09:00:00.000Z",
                updated_at:"2023-04-01T09:00:00.000Z",
                unity_id:1,
                active:true
            },

        ],
        message: "success",
        success: "true"
    })
}
export const addResidentUser = (data: any) => {
    return Promise.resolve({
        data:data,
        message:'success',
        success:'true'
    })
}

export const deleteResidentUser = (data: any) => {
    return Promise.resolve({
        data:data,
        message:'success',
        success:'true'
    })
}

export const updateResidentUser=(data:any)=>{

    return Promise.resolve({
        data:data,
        message:'success',
        success:'true'
    })
}
