import { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../http"
import { Loading } from "../../../components"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)

export const List = () => {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/authors')
            .then(({data}) => setAuthors(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Authors</h1></Col>
                <Col xs="auto">
                    <Link to="/cms/authors/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Author
                    </Link>                
                </Col>
            </Row>
            <Row>
                <Col>
                    {authors.length > 0 ? 
                        <Table striped bordered hover size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map(author => <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.email}</td>
                                    <td>{author.phone}</td>
                                    <td>{author.address}</td>
                                    <td>{author.status ? 'Active' : 'Inactive'}</td>
                                    <td>{dayjs(author.createdAt).format('lll')}</td>
                                    <td>{dayjs(author.updatedAt).format('lll')}</td>
                                    <td>
                                        <Link to={`/cms/authors/${author._id}`} className="btn btn-dark btn-sm me-3" title="Edit">
                                            <i className="fa-solid fa-edit"></i>
                                        </Link>
                                        <Button variant="danger" size="sm" title="Delete">
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table> : 
                        <h4>No data found</h4>}
                </Col>
            </Row>
        </Col>
    </Row>
}