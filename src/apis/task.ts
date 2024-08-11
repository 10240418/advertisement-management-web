import { describe } from 'node:test'
import request from './'


export const addTask = (data: any) => {
  return request({
    url: '/admin/task',
    method: 'post',
    data:{
        name: data.name,
        tag: data.tag,
        operation: data.operation,
        editable: data.editable,

        interval: data.interval,
        startAt: data.startAt,
        
        gatewayId: data.gatewayId,
        meterId: data.meterId
    }
  })
}

export const fetchTasks = (query: any) => {
  return request({
    url: '/admin/task',
    method: 'get',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum,
      desc: query.desc?query.desc:false,
    }
  })
}


export const fetchTask = (data: any) => {
  return request({
    url: `/admin/task/${data.id}`,
    method: 'get',
    
  })
}

export const deleteTask = (ids: number[]) => {
  return request({
    url: '/admin/task',
    method: 'delete',
    data: ids
  })
}

export const updateTask = (data: any) => {
  return request({
    url: '/admin/task',
    method: 'put',
    data:{
        id: data.id,
        name: data.name,
        tag: data.tag,
        operation: data.operation,
        editable: data.editable,

        interval: data.interval,
        startAt: data.startAt,

        gatewayId: data.gatewayId,
        meterId: data.meterId
        
    }
  })
}

export const fetchScheduleTasks = (query: any) => {
  return request({
    url: '/admin/task/schedule',
    method: 'get',
    params: {
      pageSize: query.pageSize,
      pageNum: query.pageNum,
      desc: query.desc?query.desc:false,
    }
  })
}


export const fetchScheduleTask = (id: number) => {
  return request({
    url: '/admin/task/schedule',
    method: 'get',
    params: {
      id: id
    }
  })
}

