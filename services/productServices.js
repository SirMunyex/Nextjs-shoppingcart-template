import axios from "axios";
const API_base_url = "http://localhost:8080/api";

export const getProduct = async(id) => {
  const request = await axios.get(`${API_base_url}/${id}`);
  return request.data;          
}

export const getProducts = async (offset, limit) => {
  const request = await axios.post(`${API_base_url}/products`, {offset, limit});
  return request.data;
}