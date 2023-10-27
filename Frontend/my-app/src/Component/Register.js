import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { test, register, handleChangeInput, registerData } =
    useContext(userContext);
  console.log(test);
  const navigate = useNavigate();
  console.log(registerData);
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "green",
      }}
    >
      <div
        style={{
          width: "396px",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Form className="d-flex flex-column align-items-center p-3">
          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              className="formStyle"
              name="name"
              value={registerData.name}
              type="text"
              placeholder="Name"
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="Password">
            <Form.Control
              className="formStyle"
              name="email"
              value={registerData.email}
              type="email"
              placeholder="Email"
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="Password">
            <Form.Control
              className="formStyle"
              name="password"
              value={registerData.password}
              type="password"
              placeholder="Password"
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Button
            onClick={() => register()}
            style={{ width: "364px", height: "48px" }}
            variant="primary"
          >
            Register
          </Button>
          <Button
            onClick={() => navigate("/")}
            style={{ width: "155px", height: "48px", marginTop: "24px" }}
            variant="success"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
