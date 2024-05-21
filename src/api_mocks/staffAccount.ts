import request from '.'

export const fetchStaffAccounts = (query: any) => {
    return request({
        url: `/admin/staff_account`,
        method: 'get',
        params: query,
    });
};

export const addStaffAccount = (data: any) => {
    return request({
        url: `/admin/staff_account`,
        method: 'post',
        data,
    });
}

export const activateStaffAccount = (id: number | string) => {
    return request({
        url: `/admin/staff_account/${id}/activate`,
        method: 'put',
    });
}

export const deactivateStaffAccount = (id: number | string) => {
    return request({
        url: `/admin/staff_account/${id}/deactivate`,
        method: 'put',
    });
}

export const addStaffAccountPermission = (data: any) => {
    return request({
        url: `/admin/staff_account/permission`,
        method: 'post',
        data,
    });
}

export const deleteStaffAccountPermission = (data: any) => {
    return request({
        url: `/admin/staff_account/permission`,
        method: 'delete',
        data
    });
}

export const deleteStaffAccount = (data: any) => {
    return request({
        url: `/admin/staff_account`,
        method: 'delete',
        data
    });
}