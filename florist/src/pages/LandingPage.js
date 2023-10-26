import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="mainBody">
      <Helmet>
        <title>Easy Florist</title>
      </Helmet>
      <div className="background">
        <h1 className="text showup">Easy Florist</h1>
        <div>
          <h1 className="text reveal">
            <span className="slidein">The garden of your dreams</span>
          </h1>
        </div>
      </div>

      <div>
        <h3
          style={{
            fontFamily: "Roboto",
            marginLeft: "12px",
            color: "rgb(59, 111, 98)",
          }}>
          Most Sought After
        </h3>
        <Row>
          <Col sm={6} md={4} lg={3}>
            <Link to={`/home`}>
              <Card className="text-center p-2 m-1">
                <Card.Img
                  variant="top"
                  src="https://i0.wp.com/beato.com.sg/wp-content/uploads/2022/07/How-to-keep-flowers-fresh-after-buying-scaled.jpg?fit=2560%2C1707&ssl=1"
                />
                <Card.Body>
                  <Card.Title>Lilies</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="text-center p-2 m-1">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/beato.com.sg/wp-content/uploads/2022/07/How-to-keep-flowers-fresh-after-buying-scaled.jpg?fit=2560%2C1707&ssl=1"
              />
              <Card.Body>
                <Card.Title>Lilies</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="text-center p-2 m-1">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/beato.com.sg/wp-content/uploads/2022/07/How-to-keep-flowers-fresh-after-buying-scaled.jpg?fit=2560%2C1707&ssl=1"
              />
              <Card.Body>
                <Card.Title>Lilies</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="text-center p-2 m-1">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/beato.com.sg/wp-content/uploads/2022/07/How-to-keep-flowers-fresh-after-buying-scaled.jpg?fit=2560%2C1707&ssl=1"
              />
              <Card.Body>
                <Card.Title>Lilies</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LandingPage;
