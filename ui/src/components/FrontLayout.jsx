import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"

import {Col, Container, Nav, Navbar, Row} from "react-bootstrap"
import {Link, Outlet} from "react-router-dom"

export const FrontLayout = () => {

    return <>
        <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Link to="/cms" className="navbar-brand">Blog</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <Outlet />

            <Row>
                <Col className="text-bg-dark py-5 text-center">
                    &copy; Blog site. All right reserved.
                </Col>
            </Row>
        </Container>
    </>
}