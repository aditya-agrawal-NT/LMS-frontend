import axios from "axios"

export async function fetchBooks (){
    const response = await axios.get('http://localhost:8080/api/books')
    return response.data
}

export async function deleteBooks (id){
    const response = await axios.delete(`http://localhost:8080/api/books/${id}`)
    return response.data
}

export async function fetchAllBooks (pageNumber, pageSize, search){
    const response = await axios.get('http://localhost:8080/api/books/paginatedBooks', {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
            search: search
        }
    })
    return response.data
}

export async function createBook(bookData) {
    const response = await axios.post('http://localhost:8080/api/books/addBook', bookData);
    return response.data;
}

export async function countAllBooks(){
    const response = await axios.get('http://localhost:8080/api/books/bookCount')
    return response.data;
}

export async function updateBook(bookData, id) {
    console.log(bookData)
    const response = await axios.put(`http://localhost:8080/api/books/${id}`, bookData);
    return response.data;
}
