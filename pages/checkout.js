import { useSelector } from "react-redux"
import { Card, Col, Row, Container, Button, Form } from "react-bootstrap";

export default function checkout(){

    
    const counter = useSelector(state => state.counter);
    const products = counter.items;
    const total = products.reduce((a,b) => + a + + (b.price * b.count), 0);

    return (
     <div>
      <Container>
      <Row>

      <Col>
       <Form>

        <Form.Group>
         <Form.Label>First Name</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Last Name</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Email</Form.Label>
         <Form.Control type="email" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Phone number</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Credit card number</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Security code</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Form.Group>
         <Form.Label>Expiration date</Form.Label>
         <Form.Control type="text" />
        </Form.Group>

        <Button type="submit" variant="success"> Complete purchase</Button>

       </Form>
      </Col>

      <Col>
       <Card>

        <Card.Body>
            Order summery <br />
            Shipping: $0<br />              
            Sub total: ${total} <br />
            Tax: $0<br />
            Total: ${total}
        </Card.Body>

      </Card>
      </Col>

      </Row>
      </Container>
     </div>
    )
}