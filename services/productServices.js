import axios from "axios";

const baseAPI = "http://localhost:8080/api";

export const getProduct = (id) => {
        
    return fetch(`${baseAPI}/${id}`)
    .then(data => data.json());
}

export const getProducts = async (offset, limit) => {
  const request = await axios.post(`${baseAPI}/products`, {offset, limit});
  return request.data;
}