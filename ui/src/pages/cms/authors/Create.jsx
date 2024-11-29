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
            phone: '',
            address: '',
            email: '',
            status: true,
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
            email: Yup.string().required().email(),
            status: Yup.boolean().required(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')]),
        }),
        onSubmit: (data, { setSubmitting }) => {
            http.post('/cms/authors', data)
                .then(() => navigate('/cms/authors'))
                .catch(({ response }) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    return <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Add Author</h1></Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />
                        <InputField formik={formik} name="email" label="Email" type="email" />
                        <InputField formik={formik} name="password" label="New Password" type="password" />
                        <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
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