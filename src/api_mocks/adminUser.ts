import request from '.'

export const fetchAdminUsers = () => {
  return Promise.resolve({
    data:[
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 3,
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 4,
        "name": "Bob Brown",
        "email": "bob.brown@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 5,
        "name": "Charlie Davis",
        "email": "charlie.davis@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 6,
        "name": "Diana Wilson",
        "email": "diana.wilson@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 7,
        "name": "Ethan Moore",
        "email": "ethan.moore@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 8,
        "name": "Fiona Taylor",
        "email": "fiona.taylor@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 9,
        "name": "George Anderson",
        "email": "george.anderson@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 10,
        "name": "Hannah Thomas",
        "email": "hannah.thomas@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 11,
        "name": "Ian Garcia",
        "email": "ian.garcia@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 12,
        "name": "Julia Martinez",
        "email": "julia.martinez@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 13,
        "name": "Kevin Robinson",
        "email": "kevin.robinson@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 14,
        "name": "Laura Clark",
        "email": "laura.clark@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 15,
        "name": "Michael Lewis",
        "email": "michael.lewis@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 16,
        "name": "Nancy Walker",
        "email": "nancy.walker@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 17,
        "name": "Oliver Hall",
        "email": "oliver.hall@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 18,
        "name": "Pamela Young",
        "email": "pamela.young@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 19,
        "name": "Quincy Adams",
        "email": "quincy.adams@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 20,
        "name": "Rachel Baker",
        "email": "rachel.baker@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 21,
        "name": "Steven Carter",
        "email": "steven.carter@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 22,
        "name": "Tiffany Daniels",
        "email": "tiffany.daniels@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 23,
        "name": "Ulysses Evans",
        "email": "ulysses.evans@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 24,
        "name": "Vanessa Flores",
        "email": "vanessa.flores@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 25,
        "name": "William Green",
        "email": "william.green@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 26,
        "name": "Xavier Harris",
        "email": "xavier.harris@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 27,
        "name": "Yvonne King",
        "email": "yvonne.king@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 28,
        "name": "Zachary Lee",
        "email": "zachary.lee@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 29,
        "name": "Alice Cooper",
        "email": "alice.cooper@example.com",
        "actions": "Edit/Delete"
      },
      {
        "id": 30,
        "name": "Bob Dylan",
        "email": "bob.dylan@example.com",
        "actions": "Edit/Delete"
      }
    ]
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
