import router from 'next/router';
import { useEffect, useState } from "react";
import { Container, Image, Row, Col, Card, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { increment, decrement, addToCart } from "../../features/counter/counterSlice";

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

    return (

      <Container >
        <Row className="g-5 mt-5">     
         <Col>   
         <Image fluid rounded src={product.imgURL} />
         </Col>
         <Col>
         <Card>
          <Card.Body>
           <Card.Title className="text-center">
             {product.name}
           </Card.Title>
           <Card.Body>
            <ListGroup variant="flush">
             <ListGroup.Item><h3>${product.price}</h3></ListGroup.Item>
             <ListGroup.Item>{product.description}</ListGroup.Item>

            <InputGroup>
             <Button size="sm" onClick={() =>  dispatch(decrement(product))}>
              <i className='fas fa-minus'></i>
             </Button>
             <FormControl readOnly style={{width:"1px"}} value={count || 0} />
              <Button size="sm" onClick={() => { dispatch(addToCart(product)); }}>
               <i className='fas fa-plus'></i>
              </Button>
            </InputGroup>

            </ListGroup>
           </Card.Body>
          </Card.Body>
         </Card>

         </Col>
        </Row>
      </Container>
    )
}