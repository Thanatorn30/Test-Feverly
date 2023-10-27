import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, handleChangeInputLogin, loginData } =
    useContext(userContext);

  const navigate = useNavigate();
  console.log(loginData);
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
          height: "318px",
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
              name="email"
              value={loginData.email}
              type="email"
              placeholder="Email"
              onChange={handleChangeInputLogin}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="Password">
            <Form.Control
              className="formStyle"
              name="password"
              value={loginData.password}
              type="password"
              placeholder="Password"
              onChange={handleChangeInputLogin}
            />
          </Form.Group>
          <Button
            onClick={async () => {
              login();
            }}
            style={{ width: "364px", height: "48px" }}
            variant="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            style={{ width: "155px", height: "48px", marginTop: "24px" }}
            variant="success"
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
