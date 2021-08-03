import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
    return (
      <div>
        
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">Online store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
         </Nav>
         <Form className="d-flex" action="/search">
         <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          name="product"
         />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

         {children}
        </div>)
}
  