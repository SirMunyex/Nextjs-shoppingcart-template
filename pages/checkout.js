/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { useSelector } from "react-redux"
import { Card, Badge, Col, ListGroup, Row, Container, Button, Form, InputGroup } from "react-bootstrap";

export default function checkout(){
    
  const counter = useSelector(state => state.counter);
  const products = counter.items;
  const total = (Math.round(( products.reduce((a,b) => + a + + (b.price * b.count), 0) + Number.EPSILON ) * 100 ) / 100) || 0;

  return (
  <Container>
   <Row className="g-5 mt-5 mb-5">

    <Col>
     <h3>
      <Badge pill bg="primary">
       <i className='far fa-credit-card'></i> Card details
      </Badge>
     </h3>

     <Form className="mt-5">

      <Row className="mb-3">
       <Form.Group as={Col}>
        <Form.Label>First Name</Form.Label>
        <Form.Control required type="text" />
       </Form.Group>

       <Form.Group as={Col}>
        <Form.Label>Last Name</Form.Label>
        <Form.Control required type="text" />
       </Form.Group>
      </Row>

      <Form.Group className="mb-3">
       <Form.Label>Address</Form.Label>
       <Form.Control required type="name" />
      </Form.Group>
              
      <Form.Group className="mb-3">
       <Form.Label>Email</Form.Label>
       <Form.Control required type="email" />
      </Form.Group>

      <Form.Group className="mb-3">
       <Form.Label>Phone number</Form.Label>
       <Form.Control required type="text" />
      </Form.Group>
        
      <Row className="mb-3">
       <Form.Group as={Col}>
        <Form.Label>Name on the card</Form.Label>
        <Form.Control required type="text" />
       </Form.Group>

       <Form.Group as={Col}>
        <Form.Label>Card number</Form.Label>
        <InputGroup className="mb-3">
         <Form.Control required type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />
         <InputGroup.Text id="basic-addon1"> 
          <span>
           <i className='far fa-credit-card'></i>
          </span>
         </InputGroup.Text>
        </InputGroup>
       </Form.Group>
      </Row>

      <Row className="mb-3">
       <Form.Group as={Col}>
        <Form.Label>Expiration</Form.Label>
        <InputGroup className="mb-3" >
         <Form.Control required placeholder="MM" /> 
         <Form.Control required placeholder="YY" />
        </InputGroup>
       </Form.Group>

       <Form.Group as={Col}>
        <Form.Label>CVV</Form.Label>
        <Form.Control required/> 
       </Form.Group>
      </Row>

      <Button type="submit" variant="primary"> Complete purchase</Button>

     </Form>
    </Col>

    <Col>
     <Card className="mt-5">
      <Card.Title className="text-center">
        <h2>Order summery</h2>
      </Card.Title>
      <Card.Body>
       <ListGroup variant="flush">
        <ListGroup.Item><h5>Shipping: $0</h5></ListGroup.Item>
        <ListGroup.Item><h5>Sub total: ${total}</h5></ListGroup.Item>
        <ListGroup.Item><h5>Tax: $0</h5></ListGroup.Item>
        <ListGroup.Item><h5>Total: ${total}</h5></ListGroup.Item>
       </ListGroup>
      </Card.Body>
     </Card>
    </Col>

   </Row>
  </Container>
  )
}
