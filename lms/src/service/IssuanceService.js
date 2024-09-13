import axios from "axios"

export async function fetchAllIssuances (pageNumber, pageSize){
    const response = await axios.get('http://localhost:8080/api/issuances', {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
        }
    })
    return response.data
}

export async function createIssuance(issuanceData){
    const response = await axios.post('http://localhost:8080/api/issuances/create', issuanceData);
    return response.data;
}

export async function deleteIssuance(id){
    const response = await axios.delete(`http://localhost:8080/api/issuances/${id}`)
    return response.data;
}

export async function updateIssuance(issuanceData, id){
    const response = await axios.put(`http://localhost:8080/api/issuances/create/${id}`, issuanceData)
    return response.data;
}