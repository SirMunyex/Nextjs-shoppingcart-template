/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { useSelector } from "react-redux"
import { ListGroup, Alert, Col, Container, Row, Table, Image, InputGroup, Button, FormControl, Card } from "react-bootstrap";
import { decrement, addToCart, deleteItem, deleteAll } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";

export default function Cart (){

    const dispatch = useDispatch();

    const counter = useSelector(state => state.counter);

    const products = counter.items;
    
    const total = (Math.round(( products.reduce((a,b) => + a + + (b.price * b.count), 0) + Number.EPSILON ) * 100 ) / 100) || 0;

    if(total != 0){

    return (
       <Container>
        <Row className="g-5 mt-5 mb-5">

         <Col>

          <Button onClick={() => dispatch(deleteAll())} variant="outline-danger">
           <i className='fas fa-trash'></i>
           remove all
          </Button>

          <Table className="mt-5">
           <tbody>
            {products.map( (item, i) => { return (

            <tr key={i}>
             <td>
              <a href={`/product/${item._id}`}>
               <Image src={item.imgURL} rounded="true" fluid="true" style={{width:"80px"}} />
              </a>
             </td>
             <td>
              {item.name} <br />
              <Button onClick={()=> dispatch(deleteItem(item)) } variant="outline">
               <i className='far fa-trash-alt' style={{color:"red"}}></i>
              </Button>
             </td>
             <td>
              ${item.price}
             </td>
             <td>
              <InputGroup style={{"width":"110px"}}>
               <Button size="sm" onClick={() =>  dispatch(decrement(item))}>
                <i className='fas fa-minus'></i>
               </Button>
               <FormControl readOnly style={{width:"1px"}} value={item.count} />
               <Button size="sm" onClick={() => { dispatch(addToCart(item)); }}>
                <i className='fas fa-plus'></i>
               </Button>
              </InputGroup>
             </td>
             <td>
              ${ Math.round(((item.price * item.count) + Number.EPSILON) * 100 ) / 100 }
             </td>
            </tr>
            ) } )}
            </tbody>
          </Table>
         </Col>

         <Col xs lg="4">
          <Card className="mt-5">

           <Card.Title className="text-center">
            <h2>Order summery</h2>
           </Card.Title>

           <Card.Body>
            <ListGroup variant="flush">

             <ListGroup.Item>
              <h5> Shipping: $0 </h5>
             </ListGroup.Item>

             <ListGroup.Item>
              <h5>Sub total: ${total} </h5>
             </ListGroup.Item>

             <ListGroup.Item>
              <h5>Taxes: $0</h5>
             </ListGroup.Item>

             <ListGroup.Item>
              <h5>Total: ${total}</h5>
             </ListGroup.Item>

            </ListGroup>
           </Card.Body>

           <Button variant="primary" size="large" href="/checkout" >
            Checkout
           </Button>

          </Card>
         </Col>

        </Row>
       </Container>
    )
    }else{
      return (
        <Container className="g-5 mt-5 pt-5 text-center">
         <Alert variant="light">
          <h1>
           Cart is empty !
          </h1>
          <Image src="https://isehore.com/site_assets/assets/img/emptycart.png" fluid="true" /> <br />
          <Button href="/home/1" size="lg" variant="success">Let's find some products</Button>
         </Alert>
        </Container>
      )
    }
}