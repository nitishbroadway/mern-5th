import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { validationError } from "../../../lib"
import http from "../../../http"
import YupPassword from "yup-password"
import { Col, Form, Row } from "react-bootstrap"
import { InputField, StatusSelect, SubmitBtn } from "../../../components"

YupPassword(Yup)

export const Create = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.boolean().required(),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('/cms/categories', data)
                .then(() => navigate('/cms/categories'))
                .catch(({ response }) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    return <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Add Category</h1></Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />

                        <StatusSelect formik={formik} />                        

                        <SubmitBtn disabled={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}