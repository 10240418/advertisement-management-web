import request from '.'

export const fetchResidents = (query: any) => {
  return Promise.resolve({
    data: [
      {
        "id": 1,
        "name": "John Doe",
        "phone": "1234567890",
        "addressUnit": "101",
        "addressFloor": "1",
        "devices": {}
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "phone": "0987654321",
        "addressUnit": "102",
        "addressFloor": "2",
        "devices": {}
      },
      {
        "id": 3,
        "name": "Alice Johnson",
        "phone": "1122334455",
        "addressUnit": "103",
        "addressFloor": "3",
        "devices": {}
      },
      {
        "id": 4,
        "name": "Bob Brown",
        "phone": "5555666677",
        "addressUnit": "104",
        "addressFloor": "4",
        "devices": {}
      },
      {
        "id": 5,
        "name": "Charlie Davis",
        "phone": "7788999011",
        "addressUnit": "105",
        "addressFloor": "5",
        "devices": {}
      },
      {
        "id": 6,
        "name": "Diana Wilson",
        "phone": "1213141516",
        "addressUnit": "106",
        "addressFloor": "6",
        "devices": {}
      },
      {
        "id": 7,
        "name": "Ethan Moore",
        "phone": "1718192021",
        "addressUnit": "107",
        "addressFloor": "7",
        "devices": {}
      },
      {
        "id": 8,
        "name": "Fiona Taylor",
        "phone": "2223242526",
        "addressUnit": "108",
        "addressFloor": "8",
        "devices": {}
      },
      {
        "id": 9,
        "name": "George Anderson",
        "phone": "2728293031",
        "addressUnit": "109",
        "addressFloor": "9",
        "devices": {}
      },
      {
        "id": 10,
        "name": "Hannah Thomas",
        "phone": "3233343536",
        "addressUnit": "110",
        "addressFloor": "10",
        "devices": {}
      },
      {
        "id": 11,
        "name": "Ian Garcia",
        "phone": "3738394041",
        "addressUnit": "111",
        "addressFloor": "11",
        "devices": {}
      },
      {
        "id": 12,
        "name": "Julia Martinez",
        "phone": "4243444642",
        "addressUnit": "112",
        "addressFloor": "12",
        "devices": {}
      },
      {
        "id": 13,
        "name": "Kevin Robinson",
        "phone": "4748495051",
        "addressUnit": "113",
        "addressFloor": "13",
        "devices": {}
      },
      {
        "id": 14,
        "name": "Laura Clark",
        "phone": "5253545652",
        "addressUnit": "114",
        "addressFloor": "14",
        "devices": {}
      },
      {
        "id": 15,
        "name": "Michael Lewis",
        "phone": "5758596153",
        "addressUnit": "115",
        "addressFloor": "15",
        "devices": {}
      },
      {
        "id": 16,
        "name": "Nancy Walker",
        "phone": "6264647265",
        "addressUnit": "116",
        "addressFloor": "16",
        "devices": {}
      },
      {
        "id": 17,
        "name": "Oliver Hall",
        "phone": "6768697061",
        "addressUnit": "117",
        "addressFloor": "17",
        "devices": {}
      },
      {
        "id": 18,
        "name": "Pamela Young",
        "phone": "7273747462",
        "addressUnit": "118",
        "addressFloor": "18",
        "devices": {}
      },
      {
        "id": 19,
        "name": "Quincy Adams",
        "phone": "7778798073",
        "addressUnit": "119",
        "addressFloor": "19",
        "devices": {}
      },
      {
        "id": 20,
        "name": "Rachel Baker",
        "phone": "8283848474",
        "addressUnit": "120",
        "addressFloor": "20",
        "devices": {}
      },
      {
        "id": 21,
        "name": "Steven Carter",
        "phone": "8788858575",
        "addressUnit": "121",
        "addressFloor": "21",
        "devices": {}
      },
      {
        "id": 22,
        "name": "Tiffany Daniels",
        "phone": "9293949572",
        "addressUnit": "122",
        "addressFloor": "22",
        "devices": {}
      },
      {
        "id": 23,
        "name": "Ulysses Evans",
        "phone": "9798959673",
        "addressUnit": "123",
        "addressFloor": "23",
        "devices": {}
      },
      {
        "id": 24,
        "name": "Vanessa Flores",
        "phone": "0203040506",
        "addressUnit": "124",
        "addressFloor": "24",
        "devices": {}
      },
      {
        "id": 25,
        "name": "William Green",
        "phone": "0607080909",
        "addressUnit": "125",
        "addressFloor": "25",
        "devices": {}
      },
      {
        "id": 26,
        "name": "Xavier Harris",
        "phone": "1011121314",
        "addressUnit": "126",
        "addressFloor": "26",
        "devices": {}
      },
      {
        "id": 27,
        "name": "Yvonne King",
        "phone": "1415161718",
        "addressUnit": "127",
        "addressFloor": "27",
        "devices": {}
      },
      {
        "id": 28,
        "name": "Zachary Lee",
        "phone": "191a1b1c1d",
        "addressUnit": "128",
        "addressFloor": "28",
        "devices": {}
      },
      {
        "id": 29,
        "name": "Alice Cooper",
        "phone": "2a3b4c5d6e",
        "addressUnit": "129",
        "addressFloor": "29",
        "devices": {}
      },
      {
        "id": 30,
        "name": "Bob Dylan",
        "phone": "3a4b5c6d7e",
        "addressUnit": "130",
        "addressFloor": "30",
        "devices": {}
      },
      {
        "id": 31,
        "name": "Charlie Chaplin",
        "phone": "4a5b6c7d8e",
        "addressUnit": "131",
        "addressFloor": "31",
        "devices": {}
      },
      {
        "id": 32,
        "name": "David Bowie",
        "phone": "5a6b7c8d9e",
        "addressUnit": "132",
        "addressFloor": "32",
        "devices": {}
      },
      {
        "id": 33,
        "name": "Ella Fitzgerald",
        "phone": "6a7b8c9d0e",
        "addressUnit": "133",
        "addressFloor": "33",
        "devices": {}
      },
      {
        "id": 34,
        "name": "Frank Sinatra",
        "phone": "7a8b9c0d1e",
        "addressUnit": "134",
        "addressFloor": "34",
        "devices": {}
      },],
  })
}

export const addResident = (data: any) => {
  return request({
    url: `/admin/resident_account`,
    method: 'post',
    data,
  })
}

export const activateResident = (id: number | string) => {
  return request({
    url: `/admin/resident_account/${id}/activate`,
    method: 'put',
  })
}

export const deactivateResident = (id: number | string) => {
  return request({
    url: `/admin/resident_account/${id}/deactivate`,
    method: 'put',
  })
}

export const addresidentAccountPermission = (data: any) => {
  return request({
    url: `/admin/resident_account/permission`,
    method: 'post',
    data,
  })
}

export const deleteresidentAccountPermission = (data: any) => {
  return request({
    url: `/admin/resident_account/permission`,
    method: 'delete',
    data,
  })
}

export const deleteResident = (data: any) => {
  return request({
    url: `/admin/resident_account`,
    method: 'delete',
    data,
  })
}
