import app from "./serviceLMS"

export async function fetchUsers (){
    const response = await app.get('http://localhost:8080/api/user')
    return response.data
}

export async function deleteUsers (mobileNumber){
    const response = await app.delete(`http://localhost:8080/api/user/${mobileNumber}`)
    return response.data
}

export async function fetchAllUsers (pageNumber, pageSize, search=''){
    const response = await app.get('http://localhost:8080/api/user/paginatedUsers', {
        params: {
            pageNumber : pageNumber,
            pageSize : pageSize,
            search: search
        }
    })
    return response.data
}

export async function createUser(userData) {
    const response = await app.post('http://localhost:8080/api/user/register', userData);
    return response.data;
}

export async function updateUser(userData, mobileNumber) {
    const response = await app.put(`http://localhost:8080/api/user/${mobileNumber}`, userData);
    return response.data;
}

export async function countAllUsers(){
    const response = await app.get('http://localhost:8080/api/user/userCount')
    return response.data;
}

export async function userLogin(data) {
    const response = await app.post('http://localhost:8080/api/login', data);
    return response.data;
}

export async function getUserByToken(token){
    const response = await app.get('http://localhost:8080/api/current-user', {
        headers: {
            Authorization : token
        }})
        return response.data;
}

export const logoutUser = () => {
    window.localStorage.removeItem('authtoken')
}