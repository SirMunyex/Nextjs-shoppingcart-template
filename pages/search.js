import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Image, Row, Col, Container } from 'react-bootstrap';

export default function search(){
    
    const router = useRouter()
    const {item}  = router.query;
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        if(!item) {
          return;
        }

        const getData = async() => {
            const response = await axios.post('http://localhost:8080/api/search', {name:item, offset:0, limit:10});
            console.log(await response.data);
            setProducts(await response.data.products);
        }
        getData();
      }, [item])
  
    return(
      <div>

        {/* <Container>
        {products.map((e, i) => {
          return (
          <Row key={i}>
            <Col>
              <Image src={e.imgURL} style={{width:"200px"}} />             
            </Col>
            <Col>
              {e.name}
            </Col>
          </Row>
          )
          }) }
               </Container> */}

      <Container>
        <Table>
        <tbody>
          {products.map((e, i) => {
          return (
            <tr key={i} >
             <td style={{textAlign:"center"}}>
             <a href={`/product/${e._id}`}>
              <Image src={e.imgURL} rounded style={{width:"150px"}} />             
             </a>
             </td>
             <td style={{textAlign:"left"}}>
               {e.name} <br />
              Q{e.price} <br />
              {e.description}
             </td>
            </tr>
          )
          }) }
        </tbody>         
        </Table>
        </Container>
      </div>
    )
}