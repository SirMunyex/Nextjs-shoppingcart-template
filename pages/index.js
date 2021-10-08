import { Container, Button, Card, Row, Col, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { increment, addToCart } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { matchPath } from "react-router";

const offset = 0;
const products_quantity = 12;


export default function Home({products}) {

 
  
  console.log(params);

  const dispatch = useDispatch();
   
  const router = useRouter()
  let {page}  = router.query;
  page = Number(page) || 1;
  let total = products.total;
  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(total / products_quantity); number++) {
    items.push(
      <Pagination.Item href={`/?page=${number}`} 
                       key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
        
  <Container>
<Row xs={1} md={3} className="g-4">

    {products.products.map((item, i) => { return (

      <Col key={i}>

      <Card style={{ width: '18rem' }}>
        
        <Card.Link href={"/product/"+item._id}>
         <Card.Img style={{height:"250px"}} variant="top" src={item.imgURL} />
        </Card.Link>

        <Card.Body>
          <Card.Title>{item.name}, Q{item.price}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
         
          <Button variant="success" onClick={() => { dispatch(addToCart(item)); }}> 
            Add to cart <i className="fas fa-shopping-cart"></i> 
          </Button>
        </Card.Body>
      </Card>

      </Col>
    )})}

</Row>

  <Pagination>{items}</Pagination>

  </Container>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

export async function getStaticProps({ params }){

  
  let url = "http://localhost:8080/api/products";
  let offset = (2  - 1) * products_quantity;

  const res =  await axios.post(url, {offset, limit:products_quantity});
  const products = await res.data;

  if (!products) {
    return {
      notFound: true,
    }
  }

  return { props: { products } }

}