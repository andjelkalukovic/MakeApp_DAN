import axios from 'axios'

export const getAllData = async () => {
    let url = `http://makeup-api.herokuapp.com/api/v1/products.json`
    let response = await axios.get(url)
    return response
}

export const getProductById = async (id) => {
    let url = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    let response = await axios.get(url)
    return response
}