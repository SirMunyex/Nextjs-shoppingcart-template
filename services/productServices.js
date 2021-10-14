export const getProduct = (id) => {

    let url = `http://localhost:8080/api/${id}`;
        
    return fetch(url)
    .then(data => data.json());
  
  }
  