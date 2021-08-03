export const getProducts = async () => {

    let url = "http://localhost:8080/product/1"; 
  
    return await fetch(url).then(data => data.json());   
  
}