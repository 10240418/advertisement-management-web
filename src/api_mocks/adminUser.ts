import request from '.'

export const fetchAdminUsers = () => {  return Promise.resolve({
    data:[
      {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "created_at": "2024-07-22T10:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T10:00:00Z"
      },
      {
        "id": 2,
        "name": "Bob",
        "email": "bob@example.com",
        "created_at": "2024-07-22T11:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T11:00:00Z"
      },
      {
        "id": 3,
        "name": "Charlie",
        "email": "charlie@example.com",
        "created_at": "2024-07-22T12:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T12:00:00Z"
      },
      {
        "id": 4,
        "name": "David",
        "email": "david@example.com",
        "created_at": "2024-07-22T13:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T13:00:00Z"
      },
      {
        "id": 5,
        "name": "Eve",
        "email": "eve@example.com",
        "created_at": "2024-07-22T14:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T14:00:00Z"
      },
      {
        "id": 6,
        "name": "Frank",
        "email": "frank@example.com",
        "created_at": "2024-07-22T15:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T15:00:00Z"
      },
      {
        "id": 7,
        "name": "Grace",
        "email": "grace@example.com",
        "created_at": "2024-07-22T16:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T16:00:00Z"
      },
      {
        "id": 8,
        "name": "Heidi",
        "email": "heidi@example.com",
        "created_at": "2024-07-22T17:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T17:00:00Z"
      },
      {
        "id": 9,
        "name": "Ivan",
        "email": "ivan@example.com",
        "created_at": "2024-07-22T18:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T18:00:00Z"
      },
      {
        "id": 10,
        "name": "Julia",
        "email": "julia@example.com",
        "created_at": "2024-07-22T19:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T19:00:00Z"
      },
      {
        "id": 11,
        "name": "Kevin",
        "email": "kevin@example.com",
        "created_at": "2024-07-22T20:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T20:00:00Z"
      },
      {
        "id": 12,
        "name": "Laura",
        "email": "laura@example.com",
        "created_at": "2024-07-22T21:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T21:00:00Z"
      },
      {
        "id": 13,
        "name": "Michael",
        "email": "michael@example.com",
        "created_at": "2024-07-22T22:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T22:00:00Z"
      },
      {
        "id": 14,
        "name": "Nancy",
        "email": "nancy@example.com",
        "created_at": "2024-07-22T23:00:00Z",
        "password": "********",
        "updated_at": "2024-07-22T23:00:00Z"
      },
      {
        "id": 15,
        "name": "Oliver",
        "email": "oliver@example.com",
        "created_at": "2024-07-23T00:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T00:00:00Z"
      },
      {
        "id": 16,
        "name": "Pamela",
        "email": "pamela@example.com",
        "created_at": "2024-07-23T01:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T01:00:00Z"
      },
      {
        "id": 17,
        "name": "Quinn",
        "email": "quinn@example.com",
        "created_at": "2024-07-23T02:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T02:00:00Z"
      },
      {
        "id": 18,
        "name": "Rachel",
        "email": "rachel@example.com",
        "created_at": "2024-07-23T03:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T03:00:00Z"
      },
      {
        "id": 19,
        "name": "Steve",
        "email": "steve@example.com",
        "created_at": "2024-07-23T04:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T04:00:00Z"
      },
      {
        "id": 20,
        "name": "Tina",
        "email": "tina@example.com",
        "created_at": "2024-07-23T05:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T05:00:00Z"
      },
      {
        "id": 21,
        "name": "Uma",
        "email": "uma@example.com",
        "created_at": "2024-07-23T06:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T06:00:00Z"
      },
      {
        "id": 22,
        "name": "Victor",
        "email": "victor@example.com",
        "created_at": "2024-07-23T07:00:00Z",
        "password": "********",
        "updated_at": "2024-07-23T07:00:00Z"
      },
      {
        "id": 23,
        "name": "Wendy",
        "email": "wendy@example.com",
        "created_at": "2024-07-23T08:00:00Z",
        "password": "",
"updated_at": "2024-07-23T08:00:00Z"
},
{
"id": 24,
"name": "Xavier",
"email": "xavier@example.com",
"created_at": "2024-07-23T09:00:00Z",
"password": "",
"updated_at": "2024-07-23T09:00:00Z"
},
{
"id": 25,
"name": "Yvonne",
"email": "yvonne@example.com",
"created_at": "2024-07-23T10:00:00Z",
"password": "",
"updated_at": "2024-07-23T10:00:00Z"
},
{
"id": 26,
"name": "Zach",
"email": "zach@example.com",
"created_at": "2024-07-23T11:00:00Z",
"password": "",
"updated_at": "2024-07-23T11:00:00Z"
},
{
"id": 27,
"name": "Aiden",
"email": "aiden@example.com",
"created_at": "2024-07-23T12:00:00Z",
"password": "",
"updated_at": "2024-07-23T12:00:00Z"
},
{
"id": 28,
"name": "Brenda",
"email": "brenda@example.com",
"created_at": "2024-07-23T13:00:00Z",
"password": "",
"updated_at": "2024-07-23T13:00:00Z"
},
{
"id": 29,
"name": "Cody",
"email": "cody@example.com",
"created_at": "2024-07-23T14:00:00Z",
"password": "",
"updated_at": "2024-07-23T14:00:00Z"
},
{
"id": 30,
"name": "Dylan",
"email": "dylan@example.com",
"created_at": "2024-07-23T15:00:00Z",
"password": "",
"updated_at": "2024-07-23T15:00:00Z"
}
],success:'true',
  message:'do it'
  })
}

export const addAdminUser = (data: any) => {
  return request({
    url: '/admin/account',
    method: 'post',
    data,
  })
}

export const deleteAdminUser = (data: any) => {
  return request({
    url: '/admin/account',
    method: 'delete',
    data,
  })
}
