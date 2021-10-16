import { useSelector } from "react-redux"
import { ListGroup, Col, Container, Row, Table, Image, InputGroup, Button, FormControl, Card } from "react-bootstrap";
import { decrement, addToCart, deleteItem, deleteAll } from "../features/counter/counterSlice";
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
         <div>
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
         </div>
         </Col>






         <Col xs lg="4">
          <Card>
             <Card.Title className="text-center">
               <h2>Order summery</h2>
               </Card.Title>
            <Card.Body>
             <ListGroup variant="flush">
              <ListGroup.Item>
                <h5> Shipping: $0 </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Sub total: ${Math.round(( total + Number.EPSILON ) * 100 ) / 100} </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Tax: $0</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Total: ${Math.round(( total + Number.EPSILON ) * 100 ) / 100}</h5>
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
      </div>
    )
}