import router from 'next/router';
import { useEffect, useState } from "react";
import { Container, Image, Row, Col, Card, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux"
import { decrement, addToCart } from "../../features/counter/counterSlice";
import { getProduct } from '../../services/productServices';

export default function product(){

    const dispatch = useDispatch();
    const {id}  = router.query;
    const [product, setProduct] = useState({});
    const products = useSelector(state => state.counter);
    let count = 0;

    /*
     Check if the product has been added to the cart, 
     if yes let's retrieve the ammount 
    */
   
    if(products.items.some( obj => obj._id == id )){
      count = (products.items.filter(obj => obj._id == id))[0].count;
    }

    useEffect(() => {
      if(!id) {return;}
      async function fetchData(){
        setProduct(await getProduct(id));
      }
      fetchData();      
    }, [id])

    return (

    <Container >
     <Row className="g-5 mt-5"> 

      <Col>   
       <Image fluid="true" rounded="true" src={product.imgURL} />
      </Col>

      <Col>
       <Card>
        <Card.Body>

         <Card.Title className="text-center">
          <h3>{product.name}</h3>
         </Card.Title>

         <ListGroup variant="flush">

          <ListGroup.Item>
           <h3>${product.price}</h3>
          </ListGroup.Item>

          <ListGroup.Item>
           <h6>{product.description}</h6>
          </ListGroup.Item>   

          <ListGroup.Item>
           <h5><strong>Brand:</strong> {product.brand}</h5>
          </ListGroup.Item>

          <ListGroup.Item>
           <h5><strong>Manufacturer:</strong>{product.manufacturer}</h5>
          </ListGroup.Item>

          <ListGroup.Item>
           <InputGroup style={{width:"110px"}}>
            <Button size="sm" onClick={() =>  dispatch(decrement(product))}>
             <i className='fas fa-minus'></i>
            </Button>
            <FormControl readOnly style={{width:"1px"}} value={count} />
            <Button size="sm" onClick={() => { dispatch(addToCart(product)); }}>
             <i className='fas fa-plus'></i>
            </Button>                
           </InputGroup>              
          </ ListGroup.Item>

         </ListGroup>

        </Card.Body>
       </Card>
      </Col>

     </Row>
    </Container>
    )
}