import { Container, Button, Card, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { increment, addToCart } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";

export default function Home({products}) {

  const dispatch = useDispatch();

  return (
        
  <Container>

<Row xs={1} md={3} className="g-4">

    {products.map((item, i) => { return (

      <Col  key={i}>

      <Card style={{ width: '18rem' }}>
        
        <Card.Link href={"/product/"+item._id}>
         <Card.Img style={{height:"300px"}} variant="top" src={item.imgURL} />
        </Card.Link>

        <Card.Body>
          <Card.Title>{item.name}, Q{item.price}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
         
          <Button variant="success" onClick={() => { dispatch(addToCart(item)); }}> 
            Add to cart <i className="fas fa-shopping-cart"></i> 
          </Button>
        </Card.Body>
      </Card>

      </Col>
    )})}

</Row>

  </Container>
  )
}

export async function getStaticProps(){

  let url = "http://localhost:8080/product/1";
  
  const res =  await fetch(url);
  const products = await res.json();

  if (!products) {
    return {
      notFound: true,
    }
  }

  return { props: { products } }

}