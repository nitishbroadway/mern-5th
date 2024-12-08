import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../http"
import { Col, Form, Row } from "react-bootstrap"
import { InputField, Loading, SubmitBtn } from "../../components"
import { imgUrl } from "../../lib"
import { useFormik } from "formik"
import * as Yup from "yup"

export const Article = () => {
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            content: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            content: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting, resetForm}) => {
            http.post(`/articles/${params.id}/comment`, data)
                .then(() => {
                    http.get(`/articles/${params.id}`)
                    resetForm()
                })
                .then(({data}) => setArticle(data))
                .catch(() => {})
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get(`/articles/${params.id}`)
            .then(({data}) => setArticle(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3">
            <Row>
                <Col className="text-center">
                    <h1>{article.name}</h1>
                </Col>
            </Row>
            {article.image && <Row>
                <Col>
                    <img className="img-fluid" src={imgUrl(article.image)} />
                </Col>    
            </Row>}
            <Row>
                <Col className="my-3">
                    {article.content}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h4>Comments</h4>
                        </Col>
                    </Row>
                    <Row>
                        {article?.comments?.length > 0 ? 
                            <Col>
                                {article.comments.map(comment => <div key={comment._id} className="text-bg-secondary p-3 my-3">
                                    <Row>
                                        <Col>{comment.content}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <small className="fst-italic">
                                                {comment.name} ({comment.email})
                                            </small>
                                        </Col>
                                    </Row>
                                </div>)}
                            </Col> :
                            <Col>
                                <h5 className="fst-italic">No comments</h5>
                            </Col>}
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h4>Add Comment</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={formik.handleSubmit}>
                                <InputField formik={formik} name="name" label="Name" />
                                <InputField formik={formik} name="email" label="Email" type="email" />
                                <InputField formik={formik} name="content" label="Content" as="textarea" />

                                <SubmitBtn disabled={formik.isSubmitting} label="Add Comment" icon="fa-comments" />
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>
}