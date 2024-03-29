/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { Col, Badge, Container, Row, Card, Pagination } from 'react-bootstrap';
import { queryItems } from '../services/productServices';

export default function search(){
    
  const router = useRouter()
  const {item}  = router.query;
  const page = Number(router.query.page) || 1; 
  const limit = 10;
  const offset = (page  - 1) * limit;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0)
  let active_page = page;
  let pagination_items = [];

  for (let number = 1; number <= Math.ceil(total / limit); number++) {
    pagination_items.push(
     <Pagination.Item href={`/search?page=${number}&item=${item}`} 
       key={number} active={number === active_page}>
       {number}
     </Pagination.Item>,
    );
  }
      
  useEffect(() => {
    if(!item) {
     return;
    }
    async function getData (){
      const request = await queryItems(item, offset, limit);
      setProducts(await request.products);
      setTotal(await request.total);
    }
    getData();
  }, [item])
  
  return(

  <Container>
   <Row className="justify-content-md-center g-5 mt-5 mb-5">     
    {products.map((e, i) => {
      return (
      <Card style={{ width: '58rem' }} key={i}>
       <a href={`/product/${e._id}`} style={{color: "inherit", textDecoration:"none"}}>
        <Row>

         <Col sm={3}>
          <Card.Body>
           <Card.Img style={{height:"150px"}} fluid="true" src={e.imgURL} fluid="true" rounded="true" />  
          </Card.Body>
         </Col>

         <Col sm={9}>
          <Card.Body>     

           <Col>
            <Card.Title><strong>{e.name}</strong></Card.Title>
           </Col>

           <Col>
            <Card.Title>
             <Badge bg="warning" style={{fontSize:"20px", "color":"black"}} >
               ${e.price}
             </Badge>
            </Card.Title>
           </Col>

           <Col style={{height:"80px"}} className="overflow-hidden">
            {e.description}
           </Col>

          </Card.Body>
         </Col>

        </Row>
       </a>
      </Card>
      )
    }) }
   </Row>
   <Pagination className="justify-content-center">{pagination_items}</Pagination>
   </Container>
  )
}