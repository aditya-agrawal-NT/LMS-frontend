import app from "./serviceLMS"

export async function fetchBooks (){
    const response = await app.get('http://localhost:8080/api/books')
    return response.data
}

export async function deleteBooks (id){
    const response = await app.delete(`http://localhost:8080/api/books/${id}`)
    return response.data
}

export async function fetchAllBooks (pageNumber, pageSize, search){
    const response = await app.get('http://localhost:8080/api/books/paginatedBooks', {
        params : {
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
            search: search
        }
    })
    return response.data
}

export async function createBook(bookData) {
    const response = await app.post('http://localhost:8080/api/books/addBook', bookData);
    return response.data;
}

export async function countAllBooks(){
    const response = await app.get('http://localhost:8080/api/books/bookCount')
    return response.data;
}

export async function updateBook(bookData, id) {
    console.log(bookData)
    const response = await app.put(`http://localhost:8080/api/books/${id}`, bookData);
    return response.data;
}
