/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
const axios = require("axios");
const api_base_url = "http://localhost:8080/api";

export const getProduct = async(id) => {
  const request = await axios.get(`${api_base_url}/${id}`);
  return request.data;          
}

export const getProducts = async (offset, limit) => {
  const request = await axios.post(`${api_base_url}/products`, {offset, limit});
  return request.data;
}

export const queryItems = async (item, offset, limit) => {
  const request = await axios.post(`${api_base_url}/search`, {item, offset, limit});
  return request.data;
}