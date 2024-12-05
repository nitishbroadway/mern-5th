import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import "./CmsLayout.css"

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import {Link, NavLink, Outlet} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { fromStorage, removeStorage } from "../lib"
import http from "../http"
import { clearUser, setUser } from "../store/user.slice"
import { Loading } from "./Loading"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const [loading, setLoading] = useState(true)

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
                    .finally(() => setLoading(false))
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [user])

    const handleLogout = () => {
        removeStorage('mern5thtoken')

        dispatch(clearUser())
    }

    return loading ? <Loading /> : <>
        {user && <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Link to="/cms" className="navbar-brand">Blog</Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        {user.role == 'Admin' && <Nav.Item>
                            <NavLink to="/cms/authors" className="nav-link">
                                <i className="fa-solid fa-users me-2"></i>Authors
                            </NavLink>
                        </Nav.Item>}

                        <Nav.Item>
                            <NavLink to="/cms/categories" className="nav-link">
                                <i className="fa-solid fa-list me-2"></i>Categories
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/articles" className="nav-link">
                                <i className="fa-solid fa-newspaper me-2"></i>Articles
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink to="/cms/comments" className="nav-link">
                                <i className="fa-solid fa-comments me-2"></i>Comments
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={<>
                            <i className="fa-solid fa-user-circle me-2"></i>{user.name}
                            </>} align="end">
                            <Link className="dropdown-item" to="/cms/edit-profile">
                                <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                            </Link>
                            <Link className="dropdown-item" to="/cms/change-password">
                                <i className="fa-solid fa-asterisk me-2"></i>Change Password
                            </Link>
                            <NavDropdown.Divider />
                            <span className="dropdown-item" onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                            </span>
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