import app from "./serviceLMS";

export async function fetchAllIssuances (pageNumber, pageSize, search){
    const response = await app.get('http://localhost:8080/api/issuances', {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
            search: search
        }
    })
    return response.data
}

export async function createIssuance(issuanceData){
    const response = await app.post('http://localhost:8080/api/issuances/create', issuanceData);
    return response.data;
}

export async function deleteIssuance(id){
    const response = await app.delete(`http://localhost:8080/api/issuances/${id}`)
    return response.data;
}

export async function updateIssuance(issuanceData, id){
    const response = await app.put(`http://localhost:8080/api/issuances/${id}`, issuanceData)
    return response.data;
}

export async function userHistory(mobileNumber, pageNumber, pageSize){
    const response = await app.get(`http://localhost:8080/api/issuances/user/history/${mobileNumber}`, {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize)
        }
    })
    return response.data;
}

export async function bookHistory(id, pageNumber, pageSize){
    const response = await app.get(`http://localhost:8080/api/issuances/book/history/${id}`, {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize)
        }
    })
    return response.data;
}