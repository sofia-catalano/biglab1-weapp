import { iconUser, iconCheckAll } from "./Icon.js";
import { Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <Navbar collapseOnSelect bg="success" variant="dark" fixed="top" expand="sm">

            <Button className="navbar-toggler" variant="success" onClick={() => props.setShow(prev => !(prev))} >
                <span className="navbar-toggler-icon"></span>
            </Button>

            <Navbar.Brand >
                <Link to={{ pathname: '/' }} style={{color: "white", textDecoration: "none"}}>
                    {iconCheckAll}
                    ToDo Manager
                </Link>
            </Navbar.Brand>

            <Form inline className=" mx-auto d-none d-sm-block">
                <FormControl type="text" placeholder="Search" />
            </Form>

            <Nav.Item className="ml-md-auto">
                <Nav.Link href="#">
                    {iconUser}
                </Nav.Link>
            </Nav.Item>
        </Navbar>
    );
}

export default NavBar;