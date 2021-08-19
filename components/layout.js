import { Navbar, Nav, Form, FormControl, Button, InputGroup, ButtonToolbar, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

export default function Layout({ children }) {

    const items = useSelector((state) => state.counter.items);
    let count = 0;

    items.forEach(element => {
      count += element.count;
    });

    return (
      <div>
        
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Online store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link href="/">      
            <i className="fas fa-home"></i> 
          </Nav.Link>
         
          <Nav.Link href="/cart">
            <i className="fas fa-shopping-cart"></i>
            <Badge pill bg="primary">
             {count}
            </Badge>      
          </Nav.Link>

         </Nav>       
  </Navbar.Collapse>

  
  <ButtonToolbar
    className="justify-content-between"
    aria-label="Toolbar with Button groups"
  >
  <InputGroup>
    <InputGroup.Text id="btnGroupAddon2">  
      <i className="fas fa-search"></i>
    </InputGroup.Text>     
    <Form className="d-flex" action="/search">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        name="product"
        aria-describedby="btnGroupAddon2"
      />     
    </Form>
    
  </InputGroup>
  </ButtonToolbar>

</Navbar>

         {children}
        </div>)
}
  