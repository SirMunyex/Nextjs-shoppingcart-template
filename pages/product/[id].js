import router from 'next/router';
import { useEffect, useState } from "react";
import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { increment, addToCart } from "../../features/counter/counterSlice";

export default function product(){

    const dispatch = useDispatch();
    const {id}  = router.query;
    const [product, setProduct] = useState({});
    const products = useSelector(state => state.counter);
    let count;

    const check = products.items.some( obj => obj._id == id );
    if(check){
      count = (products.items.filter(obj => obj._id == id))[0].count;
    }

    useEffect(() => {

      if(!id) {
        return;
      }
      const getData = async() => {
          const response = await fetch(`http://localhost:8080/api/${id}`);
          setProduct(await response.json());         
      }
      getData();
    }, [id])

    return(
      <Container>
        <Row>     
         <Col>   
         <Image fluid src={product.imgURL} />
         </Col>
         <Col>
         <Card>
           <Card.Title>
             {product.name}
           </Card.Title>
           <Card.Body>
            ${product.price} <br />
            {product.description} <br />
            Quantity : {count || 0}
           </Card.Body>
           <Button onClick={() => { dispatch(addToCart(product)); }}>ADD TO CART</Button>
         </Card>
         </Col>
        </Row>
      </Container>
    )
}