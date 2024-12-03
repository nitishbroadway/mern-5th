import { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap"
import http from "../../../http"
import { Loading } from "../../../components"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { confirmAlert } from "react-confirm-alert"

dayjs.extend(localizedFormat)

export const List = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/categories')
            .then(({data}) => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)

                        http.delete(`/cms/categories/${id}`)
                            .then(() => http.get('/cms/categories'))
                            .then(({data}) => setCategories(data))
                            .catch(() => {})
                            .finally(() => setLoading(false))
                    },
                    className: 'text-bg-danger'
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
    }

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Categories</h1></Col>
                <Col xs="auto">
                    <Link to="/cms/categories/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus me-2"></i>Add Category
                    </Link>                
                </Col>
            </Row>
            <Row>
                <Col>
                    {categories.length > 0 ? 
                        <Table striped bordered hover size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category.status ? 'Active' : 'Inactive'}</td>
                                    <td>{dayjs(category.createdAt).format('lll')}</td>
                                    <td>{dayjs(category.updatedAt).format('lll')}</td>
                                    <td>
                                        <Link to={`/cms/categories/edit/${category._id}`} className="btn btn-dark btn-sm me-3" title="Edit">
                                            <i className="fa-solid fa-edit"></i>
                                        </Link>
                                        <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(category._id)}>
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