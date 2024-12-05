import { Col, Form, Row } from "react-bootstrap"
import {useFormik} from "formik"
import * as Yup from "yup"
import { InputField, Loading, StatusSelect, SubmitBtn } from "../../../components"
import { useDispatch, useSelector } from "react-redux"
import http from "../../../http"
import { imgUrl, validationError } from "../../../lib"
import { setUser } from "../../../store/user.slice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const Edit = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState([])
    const [image, setImage] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
            categoryId: '',
            status: true,
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            content: Yup.string().required(),
            categoryId: Yup.string().required(),
            status: Yup.boolean().required(),
            image: Yup.mixed().nullable().test('imageType', 'file must me an image', image => {
                if (image && !image.type.startsWith('image')) {
                    return false
                }
                return true
            })
        }),
        onSubmit: (data, {setSubmitting}) => {
            const fd = new FormData

            for (let k in data) {
                fd.append(k, data[k])
            }

            http.patch(`/cms/articles/${params.id}`, fd, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(() => navigate('/cms/articles'))
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        /* http.get('/cms/categories')
            .then(({ data }) => {
                setCategories(data)

                return http.get(`/cms/articles/${params.id}`)
            })
            .then(({data}) => {
                for(let k in formik.values) {
                    if(k in data) {
                        formik.setFieldValue(k, data[k])
                    }
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false)) */

            Promise.all([
                    http.get('/cms/categories'),
                    http.get(`/cms/articles/${params.id}`),
                ])
                .then(([{data: catList}, {data: art}]) => {
                    setCategories(catList)
                    for (let k in formik.values) {
                        if (k in art && k != "image") {
                            formik.setFieldValue(k, art[k])
                        }
                    }

                    if(art.image) {
                        setImage(art.image)
                    }
                })
                .catch(() => { })
                .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Edit Article</h1></Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />

                        <InputField formik={formik} name="content" label="Content" as="textarea" />

                        <div className="mb-3">
                            <Form.Label htmlFor="categoryId">Category</Form.Label>
                            <Form.Select
                                name="categoryId"
                                id="categoryId"
                                value={formik.values.categoryId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.categoryId && formik.errors.categoryId}
                                isValid={formik.values.categoryId && !formik.errors.categoryId}
                                required>
                                <option value="">Select a category</option>
                                {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                            </Form.Select>

                            {formik.errors.categoryId && <Form.Control.Feedback type="invalid">
                                {formik.errors.categoryId}
                            </Form.Control.Feedback>}
                        </div>

                        <div className="mb-3">
                            <Form.Label htmlFor="image">Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                id="image"
                                onChange={event => formik.setFieldValue('image', event.target.files[0])}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.image && formik.errors.image}
                                isValid={formik.touched.image && !formik.errors.image && formik.values.image}
                                accept="image/*" />

                            {formik.errors.image && <Form.Control.Feedback type="invalid">
                                {formik.errors.image}
                            </Form.Control.Feedback>}

                            {image && <Row>
                                <Col lg="3" className="mt-3">
                                    <img src={imgUrl(image)} className="img-fluid" />
                                </Col>    
                            </Row>}
                        </div>

                        <StatusSelect formik={formik} />

                        <SubmitBtn disabled={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}