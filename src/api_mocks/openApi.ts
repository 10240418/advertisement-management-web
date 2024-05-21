import request from '.'

export const fetchOpenApi = (query: any) => {
    return request({
        url: `/client/openApi`,
        method: 'get',
        params: query,
    });
};

export const addOpenApi = (data: any) => {
    return request({
        url: `/client/openApi`,
        method: 'post',
        data,
    });
}

export const activateOpenApi = (id: number | string) => {
    return request({
        url: `/client/openApi/${id}/activate`,
        method: 'put',
    });
}

export const deactivateOpenApi = (id: number | string) => {
    return request({
        url: `/client/openApi/${id}/deactivate`,
        method: 'put',
    });
}