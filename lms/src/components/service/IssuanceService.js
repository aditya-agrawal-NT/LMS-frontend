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