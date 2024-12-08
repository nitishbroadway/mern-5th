import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"

import {Col, Container, Nav, Navbar, Row} from "react-bootstrap"
import {Link, NavLink, Outlet} from "react-router-dom"
import { useEffect, useState } from "react"
import http from "../http"
import { Loading } from "./Loading"

export const FrontLayout = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/categories')
            .then(({data}) => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <>
        <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Link to="/cms" className="navbar-brand">Blog</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        {categories.map(category => <Nav.Item key={category._id}>
                            <NavLink to={`/categories/${category._id}`} className="nav-link">{category.name}</NavLink>
                        </Nav.Item>)}
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