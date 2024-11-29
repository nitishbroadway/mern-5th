import { Col, Row } from "react-bootstrap"

export const Loading = () => {
    return <Row className="my-3">
        <Col className="text-center">
            <i className="fa-solid fa-spinner fa-spin me-2"></i>Loading...
        </Col>
    </Row>
}