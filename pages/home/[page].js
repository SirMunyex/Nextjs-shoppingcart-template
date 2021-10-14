import { Container, Button, Card, Row, Col, Pagination, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { increment, addToCart } from "../../features/counter/counterSlice"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const products_quantity = 12;

export default function Home({products}) {

  const dispatch = useDispatch();
   
  const router = useRouter()
  let {page}  = router.query;
  page = Number(page) || 1;
  let total = products.total;
  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(total / products_quantity); number++) {
    items.push(
      <Pagination.Item href={`/home/${number}`} 
                       key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
        
  <Container  className="mb-5">
  <Row className="g-5 mt-5 mb-5">

    {products.products.map((item, i) => { return (

      <Col key={i} xs={12} sm={4}>
        
        <Card className="text-center" style={{ width: '300px' }} >
              
        <Card.Body> 

        <Card.Link href={"/product/"+item._id}>
         <Card.Img style={{height:"200px"}} variant="top" src={item.imgURL} />
        </Card.Link>

          <Card.Title className="mt-3 mb-3">
            {item.name} <Badge  text="dark" bg="warning">${item.price}</Badge>
          </Card.Title>
         
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

export const getStaticPaths = async () => {
    
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(context){
  
  const {page} = context.params;
  const offset = (page - 1) * products_quantity;

  let url = "http://localhost:8080/api/products";

  const res =  await axios.post(url, {offset, limit:products_quantity});
  const products = await res.data;

  if (!products) {
    return {
      notFound: true,
    }
  }

  return { props: { products } }

}