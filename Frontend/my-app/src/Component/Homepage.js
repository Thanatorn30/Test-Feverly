import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { userContext } from "../Context/UserContext";
import { shopContext } from "../Context/ShopContext";
import Loading from "../utillity/loading";

function Homepage() {
  const { Authen, logOut, user } = useContext(userContext);
  const { GetShop, allShop, setShopData, upDateShop } = useContext(shopContext);
  const navigate = useNavigate();
  Authen();
  GetShop();
  

  return (
    <div>
      <Button onClick={() => navigate("/createshop")} variant="primary">
        Create shop
      </Button>{" "}
      <Button onClick={() => logOut()} variant="danger">
        Log Out
      </Button>{" "}
      <div className="d-flex">
        {allShop ? (
          allShop.map((item) => (
            <div key={item.id} className="m-2">
              <Card style={{ width: "18rem" }}>
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
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.title}</Card.Text>
                  {user.id === item.user_id ? (
                    <Button
                      onClick={() => {
                          // console.log(item.user_id);
                        setShopData(item);
                        navigate("/createshop");
                      }}
                      variant="warning"
                    >
                      Edit shop
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button variant="info">
                    <a href={`${item.map}`} target="_blank">
                      Map
                    </a>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Homepage;
