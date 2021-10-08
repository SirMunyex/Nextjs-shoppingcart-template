export const getProduct = (id) => {

    let url = `http://localhost:8080/api/${id}`;

    console.log(url);
    
    return fetch(url)
    .then(data => data.json());
  
  }
  