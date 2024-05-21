import request from '.'

export const getAdminAccount = () => {
    return request({
        url: '/admin/account',
        method: 'get'
    })
}

export const addAdminAccount = (data: any) => {
    return request({
        url: '/admin/account',
        method: 'post',
        data
    })
}

export const deleteAdminAccount = (data: any) => {
    return request({
        url: '/admin/account',
        method: 'delete',
        data
    })
}
