import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import http from "../../http"
import { Loading } from "../../components"
import { imgUrl } from "../../lib"
import placeholder from "/placeholder.jpg"
import { Link, useParams } from "react-router-dom"

export const Category = () => {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`/categories/${params.id}`)
            .then(({data}) => {
                setCategory(data)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3">
            <Row>
                <Col className="text-center">
                    <h1>{category.name}</h1>
                </Col>
            </Row>
            <Row>
                {category?.articles?.map(article => <Col md="3" className="mb-3">
                    <div className="border rounded-2 shadow-sm">
                        <Row>
                            <Col xs="12">
                                <img src={article.image ? imgUrl(article.image) : placeholder} className="img-fluid" />
                            </Col>
                            <div className="col-12 text-center text-primary fw-bold my-3">
                                {article.name}
                            </div>
                            <div className="col-12 text-center my-3">
                                <Link to={`/articles/${article._id}`} className="btn btn-success btn-sm">
                                    <i className="fa-solid fa-book me-2"></i>Open Article
                                </Link>
                            </div>
                        </Row>
                    </div>
                </Col>)}
            </Row>
        </Col>
    </Row>
}