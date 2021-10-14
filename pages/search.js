import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Col, Image, Container, Row, ListGroup, Card, Pagination } from 'react-bootstrap';

export default function search(){
    
    const router = useRouter()
    const {item}  = router.query;
    const page = Number(router.query.page) || 1; 
    const products_quantity = 10;
    const offset = (page  - 1) * products_quantity;
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0)

    let active = page;
    let items = [];
    for (let number = 1; number <= Math.ceil(total / products_quantity); number++) {
      items.push(
        <Pagination.Item href={`/search?page=${number}&item=${item}`} 
                         key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
  
    
    useEffect(() => {
        if(!item) {
          return;
        }

        const getData = async() => {
            const response = await axios.post('http://localhost:8080/api/search', {name:item, offset, limit:10});
            setProducts(await response.data.products);
            setTotal(await response.data.total);
        }
        getData();
      }, [item])
  
    return(
      <div>

      <Container>
      <Row className="justify-content-md-center g-5 mt-5">     
  
          {products.map((e, i) => {
          return (

         <Card style={{ width: '58rem' }}>

          <a href={`/product/${e._id}`} style={{color: "inherit", textDecoration:"none"}}>

              <Row>

                <Col sm={3}>
                <Card.Body>
                 <Card.Img style={{height:"150px"}} fluid src={e.imgURL} fluid rounded />  
                 </Card.Body>
                </Col>

                <Col sm={9}>
                <Card.Body>       
                  <Col>{e.name}</Col>    
                  <Col>Q{e.price}</Col>
                  <Col>{e.description}</Col> 
               </Card.Body>

                </Col>

              </Row>
           
              </a>

          </Card>
          )
          }) }

        </Row>

        <Pagination>{items}</Pagination>

        </Container>
      </div>
    )
}