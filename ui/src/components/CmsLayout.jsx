import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Outlet} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { fromStorage, removeStorage } from "../lib"
import http from "../http"
import { setUser } from "../store/user.slice"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!user) {
            const token = fromStorage('mern5thtoken')

            if(token) {
                http.get('/profile/details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        removeStorage('mern5thtoken')
                    })
            }
        }
    }, [user])

    return <>
        {user && <Navbar bg="dark" expand="lg" data-bs-theme="dark">
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
                        <NavDropdown title={user.name} align="end">
                            <a className="dropdown-item">Menu 1</a>
                            <a className="dropdown-item">Menu 2</a>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>}

        <Container>
            <Outlet />
        </Container>
    </>
}