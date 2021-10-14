import { useSelector } from "react-redux"
import { Card, Col,ListGroup, Row, Container, Button, Form } from "react-bootstrap";

export default function checkout({id}){
    
    const counter = useSelector(state => state.counter);
    const products = counter.items;
    const total = products.reduce((a,b) => + a + + (b.price * b.count), 0);

    return (
     <div>
      <Container>
      <Row className="g-5 mt-5 mb-5">

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

        <Card.Title className="text-center">Order summery</Card.Title>

        <Card.Body>
        <ListGroup variant="flush">
        <ListGroup.Item>Shipping: $0</ListGroup.Item>
        <ListGroup.Item>Sub total: ${total}</ListGroup.Item>
        <ListGroup.Item>Tax: $0</ListGroup.Item>
        <ListGroup.Item>Total: ${total}</ListGroup.Item>
        </ListGroup>
        </Card.Body>

      </Card>
      </Col>

      </Row>
      </Container>
     </div>
    )
}

export async function getStaticProps(context){

  const id = context.params;

  if (!id) {
    return {
      notFound: true,
    }
  }

  return { props: { id } }

}