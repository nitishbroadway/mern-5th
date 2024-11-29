import { Form } from "react-bootstrap"

export const StatusSelect = ({formik}) => {
    return <div className="mb-3">
        <Form.Label htmlFor="status">Status</Form.Label>
        <Form.Select
            name="status"
            id="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.status && formik.errors.status}
            isValid={!formik.errors.status}>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
        </Form.Select>

        {formik.errors.status && <Form.Control.Feedback type="invalid">
            {formik.errors.status}
        </Form.Control.Feedback>}
    </div>
}