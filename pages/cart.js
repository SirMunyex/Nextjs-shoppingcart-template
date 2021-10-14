import { useSelector } from "react-redux"
import { ListGroup, Col, Container, Row, Table, Image, InputGroup, Button, FormControl, Card } from "react-bootstrap";
import { increment, decrement, addToCart, deleteItem, deleteAll } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";

export default function Cart (){

    const dispatch = useDispatch();

    const counter = useSelector(state => state.counter);

    const products = counter.items;

    const total = products.reduce((a,b) => + a + + (b.price * b.count), 0);

    return (
      <div>
       <Container>
        <Row className="g-5 mt-5 mb-5">
         <Col>
         <Button onClick={() => dispatch(deleteAll())} variant="outline-danger">
         <i className='fas fa-trash'></i>
          remove all
         </Button>
          <Table className="mt-3">
            <tbody>
            {products.map( (item, i) => { return (

        <tr key={i}>
         <td>
           <a href={`/product/${item._id}`}>
          <Image src={item.imgURL} rounded fluid style={{width:"80px"}} />
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
          <InputGroup>
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
             ${item.price * item.count}
         </td>
        </tr>

            ) } )}
            
            </tbody>
          </Table>
         </Col>
         <Col xs lg="4">
          <Card>
             <Card.Title className="text-center">Order summery</Card.Title>
            <Card.Body>
             <ListGroup variant="flush">
              <ListGroup.Item> Shipping: $0</ListGroup.Item>
              <ListGroup.Item>Sub total: ${total}</ListGroup.Item>
              <ListGroup.Item>Tax: $0</ListGroup.Item>
              <ListGroup.Item>Total: ${total}</ListGroup.Item>
             </ListGroup>
            </Card.Body>
             <Button size="large" href="/checkout" >
                Checkout
             </Button>
          </Card>
         </Col>
        </Row>
       </Container>
      </div>
    )
}




