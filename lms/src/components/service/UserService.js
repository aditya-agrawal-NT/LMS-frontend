import axios from 'axios'

export async function fetchUsers (){
    const response = await axios.get('http://localhost:8080/api/user')
    return response.data
}

export async function deleteUsers (mobileNumber){
    const response = await axios.delete(`http://localhost:8080/api/user/${mobileNumber}`)
    return response.data
}

export async function fetchAllUsers (pageNumber, pageSize, search=''){
    const response = await axios.get('http://localhost:8080/api/user/paginatedUsers', {
        params: {
            pageNumber : pageNumber,
            pageSize : pageSize,
            search: search
        }
    })
    return response.data
}

export async function createUser(userData) {
    const response = await axios.post('http://localhost:8080/api/user/register', userData);
    return response.data;
}

export async function updateUser(userData, mobileNumber) {
    console.log(userData)
    const response = await axios.put(`http://localhost:8080/api/user/${mobileNumber}`, userData);
    return response.data;
}

export async function countAllUsers(){
    const response = await axios.get('http://localhost:8080/api/user/userCount')
    return response.data;
}