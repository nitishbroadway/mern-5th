import { Col, Form, Row } from "react-bootstrap"
import {useFormik} from "formik"
import * as Yup from "yup"
import { InputField, SubmitBtn } from "../../../components"
import http from "../../../http"
import { validationError } from "../../../lib"
import { setUser } from "../../../store/user.slice"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Password = () => {
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().required().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')]),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.patch('/profile/password', data)
                .then(() => {})
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    return <Row>
        <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
            <Row>
                <Col><h1>Change Password</h1></Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="oldPassword" label="Old Password" type="password" />
                        <InputField formik={formik} name="newPassword" label="New Password" type="password" />
                        <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />

                        <SubmitBtn disabled={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}