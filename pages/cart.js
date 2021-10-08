import { useSelector } from "react-redux"
import { Col, Container, Row, Table, Image, InputGroup, Button, FormControl, Card } from "react-bootstrap";
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
        <Row>
         <Col>
         <Button onClick={() => dispatch(deleteAll())} variant="outline-danger">
         <i className='fas fa-trash'></i>
          remove all
         </Button>
          <Table>
            <tbody>
            {products.map( (item, i) => { return (

        <tr key={i}>
         <td>
          <Image src={item.imgURL} rounded fluid style={{width:"80px"}} />
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
            <Button size="sm" onClick={() => { console.log(item._id); dispatch(addToCart(item)); }}>
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
            <Button size="large" href="/">
                Continue shopping
            </Button>
            <Card.Body>
              Order summery <br />
              Shipping: $0<br />              
              Sub total: ${total} <br />
              Tax: $0<br />
              Total: ${total}
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