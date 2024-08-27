 import axios from "axios"

export async function fetchCategories (){
    const response = await axios.get('http://localhost:8080/api/categories')
    return response.data
}

export async function deleteCategory (id){
    const response = await axios.delete(`http://localhost:8080/api/categories/${id}`)
    return response.data
}

export async function fetchAllCategories (pageNumber, pageSize, search=''){
    const response = await axios.get('http://localhost:8080/api/categories/paginatedCategories', {
        params: {
            pageNumber : pageNumber,
            pageSize : pageSize,
            search: search
        }
    })
    return response.data
}
export async function createCategory(categoryData) {
    const response = await axios.post('http://localhost:8080/api/categories/addCategory', categoryData);
    return response.data;
}
export async function updateCategory(categoryData, id) {
    console.log(categoryData)
    const response = await axios.put(`http://localhost:8080/api/categories/${id}`, categoryData);
    return response.data;
}

export async function countAllCategories(){
    const response = await axios.get('http://localhost:8080/api/categories/categoryCount')
    return response.data;
}