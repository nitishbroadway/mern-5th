import { Col, Form, Row } from "react-bootstrap"
import {useFormik} from "formik"
import * as Yup from "yup"
import { InputField, SubmitBtn } from "../../../components"
import { useDispatch, useSelector } from "react-redux"
import http from "../../../http"
import { validationError } from "../../../lib"
import { setUser } from "../../../store/user.slice"

export const Edit = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: user?.name,
            phone: user?.phone,
            address: user?.address,
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch('/profile/update', data)
                .then(() => http.get('/profile/details'))
                .then(({data}) => dispatch(setUser(data)))
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    return <Row>
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

                        <SubmitBtn disabled={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}