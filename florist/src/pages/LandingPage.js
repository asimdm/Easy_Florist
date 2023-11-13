import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { getError } from "../utils";
import Loading from "../component/Loading";
import MessageBox from "../component/MessageBox";

const reducer = (state,action)=>{
  switch(action.type){
    case 'FETCH_REQUEST': 
      return {...state,loading:true};
    case 'FETCH_ERROR':
      return {...state, loading:false, error: action.payload};
    case 'FETCH_SUCCESS':
      return {...state, loading:false, category:action.payload};
    default:
      return state;
  }
}

function LandingPage() {
  const[{loading,error,category},dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    category: [],
  });

  useEffect(()=>{
    const fetch_data=async()=>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get('/category');
        dispatch({type:'FETCH_SUCCESS', payload:result.data});
      }catch(err){
        dispatch({type:'FETCH_ERROR', payload:getError(err)})
      }
    };
    fetch_data();
  });

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
          <Button variant="secondary">View</Button>
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
        loading ? (
          <div className="msg">
            <Loading />
          </div>
        ): error ? (
          <div className="msg">
            <MessageBox variant="danger">{error}</MessageBox>
          </div> 
        ): (
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
        )
      </div>
    </div>
  );
}

export default LandingPage;
