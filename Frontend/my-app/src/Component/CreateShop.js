import { useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../Context/ShopContext";

function CreateShop() {
  const { Authen } = useContext(userContext);
  const {hagdleCreateShop,createShop,createNewShop,shopdata,setShopData,upDateShop,deleteShop} =useContext(shopContext)
  const navigate = useNavigate();
  Authen();
  console.log(shopdata);
  console.log(createShop);
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
          <div className="d-flex flex-column align-items-center">
            <Card.Img
              variant="top"
              src={
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              style={{
                width: "100%",
                height: "200px",

                backgroundPosition: "cover",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <Button
              className="mt-2"
              onClick={async () => {}}
              style={{ width: "auto", height: "48px" }}
              variant="primary"
            >
              Upload Banner
            </Button>
          </div>
          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              style={{ marginTop: "16px" }}
              className="formStyle"
              name="name"
              value={createShop.name}
              type="text"
              placeholder={shopdata?shopdata.name:"Shop Name"}
              onChange={hagdleCreateShop}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="Password">
            <Form.Control
              className="formStyle"
              name="title"
              value={createShop.title}
              type="text"
              placeholder={shopdata?shopdata.title:"Title"}
              onChange={hagdleCreateShop}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="Password">
            <Form.Control
              className="formStyle"
              name="map"
              value={createShop.map}
              type="text"
              placeholder={shopdata?shopdata.map:"Google map"}
              onChange={hagdleCreateShop}
            />
          </Form.Group>
          {shopdata?
           <Button
           onClick={()=>
            upDateShop(shopdata.id)
            // console.log(shopdata.id)
          }
           style={{ width: "364px", height: "48px" }}
           variant="warning"
         >
           Edit
         </Button>
        :
          <Button
            onClick={()=>createNewShop()}
            style={{ width: "364px", height: "48px" }}
            variant="primary"
          >
            Submit
          </Button>
        
        }
        {
          shopdata&&
          <Button
           onClick={()=>
            deleteShop(shopdata.id)
            // console.log(shopdata.id)
          }
          className="mt-2"
           style={{ width: "364px", height: "48px" }}
           variant="danger"
         >
           Delete
         </Button>
        }
          <Button
            onClick={async () => {
              navigate("/home");
              setShopData(null)
            }}
            style={{ marginTop: "16px", width: "364px", height: "48px" }}
            variant="primary"
          >
            Back
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default CreateShop;
