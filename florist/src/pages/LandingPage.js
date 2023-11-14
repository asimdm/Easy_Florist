import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/esm/Button";
import CategoryCards from "../component/CategoryCards";
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
        <div>
          <Link to={"/home"}>
            <Button variant="secondary">View Bouquet</Button>
          </Link>
        </div>
      </div>
      <CategoryCards />
    </div>
  );
}

export default LandingPage;
