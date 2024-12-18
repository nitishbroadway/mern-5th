import { Col, Form, Row } from "react-bootstrap"
import {useFormik} from "formik"
import * as Yup from "yup"
import { InputField, Loading, StatusSelect, SubmitBtn } from "../../../components"
import { useDispatch, useSelector } from "react-redux"
import http from "../../../http"
import { validationError } from "../../../lib"
import { setUser } from "../../../store/user.slice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const Edit = () => {
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
            status: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
            status: Yup.boolean().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch(`/cms/authors/${params.id}`, data)
                .then(() => navigate('/cms/authors'))
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)

        http.get(`/cms/authors/${params.id}`)
            .then(({data}) => {
                for(let k in formik.values) {
                    if(k in data) {
                        formik.setFieldValue(k, data[k])
                    }
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Edit Profile</h1></Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />
                        <InputField formik={formik} name="phone" label="Phone" />
                        <InputField formik={formik} name="address" label="Address" as="textarea" />

                        <StatusSelect formik={formik} />

                        <SubmitBtn disabled={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}