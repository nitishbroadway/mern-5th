import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import http from "../../http"
import { Loading } from "../../components"
import { imgUrl } from "../../lib"
import placeholder from "/placeholder.jpg"

export const Home = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        http.get('/home')
            .then(({data}) => setArticles(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3">
            <Row>
                {articles.map(article => <Col md="3" className="mb-3">
                    <div className="border rounded-2 shadow-sm">
                        <Row>
                            <Col xs="12">
                                <img src={article.image ? imgUrl(article.image) : placeholder} className="img-fluid" />
                            </Col>
                            <div className="col-12 text-center text-primary fw-bold my-3">
                                {article.name}
                            </div>
                            <div className="col-12 text-center my-3">
                                <a href="" className="btn btn-success btn-sm">
                                    <i className="fa-solid fa-book me-2"></i>Open Article
                                </a>
                            </div>
                        </Row>
                    </div>
                </Col>)}
            </Row>
        </Col>
    </Row>
}