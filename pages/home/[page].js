import { addToCart } from "../../features/counter/counterSlice"
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { getProducts } from "../../services/productServices";
import { Container, Button, Card, Row, Col, Pagination, Badge } from "react-bootstrap";

const limit = 12;
let offset;

export default function Home({products}) {

  const dispatch = useDispatch();   
  const router = useRouter()
  let products_total = products.total;
  let active_page = Number(router.query.page) || 1;
  let pagination_items = [];

  for (let number = 1; number <= Math.ceil(products_total / limit); number++) {
    pagination_items.push(
      <Pagination.Item href={`/home/${number}`} 
                       key={number} active={number === active_page}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
        
  <Container  className="mb-5">
   <Row className="g-5 mt-5 mb-5">
    {products.products.map((item, i) => { return (
     <Col key={i} xs={12} sm={4}>  
      <Card className="text-center" style={{ width: '300px' }} >              
       <Card.Body> 
         
        <Card.Link href={`/product/${item._id}`}>
         <Card.Img style={{height:"200px"}} variant="top" src={item.imgURL} />
        </Card.Link>

        <Card.Title style={{height:"70px"}} className="overflow-hidden mt-3">
         {item.name}
        </Card.Title> 

        <Badge style={{fontSize:"20px", color:"black"}} className="mt-1 mb-3" bg="warning">${item.price}</Badge> <br />

        <Button className="mb-3" variant="success" onClick={() => { dispatch(addToCart(item)); }}> 
          Add to cart <i className="fas fa-shopping-cart"></i> 
        </Button>  

       </Card.Body>
      </Card>
     </Col>
    )})}
   </Row>

  <Pagination className="justify-content-center">{pagination_items}</Pagination>

  </Container>
  )
}

export async function getServerSideProps(context){
  
  const {page} = context.params;
  offset = (Number(page) - 1) * limit;
  const products = await getProducts(offset, limit);

  if (!products) {
    return { notFound: true }
  }
  return { props: { products } }
}