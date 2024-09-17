 import app from "./serviceLMS"

export async function fetchCategories (){
    const response = await app.get('http://localhost:8080/api/categories')
    return response.data
}

export async function deleteCategory (id){
    const response = await app.delete(`http://localhost:8080/api/categories/${id}`)
    return response.data
}

export async function fetchAllCategories (pageNumber, pageSize, search=''){
    const response = await app.get('http://localhost:8080/api/categories/paginatedCategories', {
        params: {
            pageNumber : pageNumber,
            pageSize : pageSize,
            search: search
        }
    })
    return response.data
}
export async function createCategory(categoryData) {
    const response = await app.post('http://localhost:8080/api/categories/addCategory', categoryData);
    return response.data;
}
export async function updateCategory(categoryData, id) {
    console.log(categoryData)
    const response = await app.put(`http://localhost:8080/api/categories/${id}`, categoryData);
    return response.data;
}

export async function countAllCategories(){
    const response = await app.get('http://localhost:8080/api/categories/categoryCount')
    return response.data;
}