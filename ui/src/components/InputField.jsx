import { Form } from "react-bootstrap"

export const InputField = ({formik, name, label, type = 'text'}) => {
    return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            id={name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.errors[name]}
            isValid={!formik.errors[name] && formik.values[name]} />
        
        {formik.errors[name] && <Form.Control.Feedback type="invalid">
            {formik.errors[name]}
        </Form.Control.Feedback>}
    </div>
}