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
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/comments')
            .then(({data}) => setComments(data))
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

                        http.delete(`/cms/comments/${id}`)
                            .then(() => http.get('/cms/comments'))
                            .then(({data}) => setComments(data))
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
                <Col><h1>Comments</h1></Col>
            </Row>
            <Row>
                <Col>
                    {comments.length > 0 ? 
                        <Table striped bordered hover size="sm">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Article</th>
                                    <th>Content</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map(comment => <tr key={comment._id}>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.article.name}</td>
                                    <td>{comment.content}</td>
                                    <td>{dayjs(comment.createdAt).format('lll')}</td>
                                    <td>{dayjs(comment.updatedAt).format('lll')}</td>
                                    <td>
                                        <Button variant="danger" size="sm" title="Delete" onClick={() => handleDelete(comment._id)}>
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