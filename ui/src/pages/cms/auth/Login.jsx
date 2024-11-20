import { Button, Col, Form, Row } from "react-bootstrap"

export const Login = () => {
    return <Row>
        <Col lg="4" className="bg-white py-3 my-5 mx-auto rounded-2 shadow-sm">
            <Row>
                <Col className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control name="email" id="email" required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" name="password" id="password" required />
                        </div>
                        <div className="mb-3">
                            <Form.Check>
                                <Form.Check.Input name="remember" id="remember" value={true} />
                                <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                            </Form.Check>
                        </div>
                        <div className="d-grid">
                            <Button variant="dark" type="submit">
                                Log In
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}