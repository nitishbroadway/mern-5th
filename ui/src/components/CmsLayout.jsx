import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Outlet} from "react-router-dom"

export const CmsLayout = () => {
    return <>
        <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Blog</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link>Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Link</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title="Demo User" align="end">
                            <a className="dropdown-item">Menu 1</a>
                            <a className="dropdown-item">Menu 2</a>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <Outlet />
        </Container>
    </>
}