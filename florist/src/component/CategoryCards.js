import axios from "axios";
import { useEffect, useReducer } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import { getError } from "../utils";
import Loading from "./Loading";
import MessageBox from "./MessageBox";
import Card from "react-bootstrap/Card";

const reducer=(state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return{...state,loading:true};
        case 'FETCH_ERROR':
            return{...state, loading:false,error:action.payload};
        case 'FETCH_SUCCESS':
            return{...state, loading:false, category: action.payload};
        default:
            return state;
    }
};


function CategoryCards(){
    const [{loading,error,category},dispatch]=useReducer(reducer,{
        loading:true,
        error:"",
        category:[],
    });
    useEffect(()=>{
        const fetch_data=async()=>{
            dispatch({type:"FETCH_REQUEST"});
            try{
                const result = await axios.get('/categories');
                console.log(result);
                dispatch({type:'FETCH_SUCCESS',payload:result.data});
            }catch(err){
                dispatch({type:'FETCH_ERROR',payload:getError(err)});
            }
        };
        fetch_data();
    },[]);

    return loading ? (
        <div className="msg">
          <Loading />
        </div>
      ): error ? (
        <div className="msg">
          <MessageBox variant="danger">{error}</MessageBox>
        </div> 
      ):(
        <div>
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
            {category.map((cat)=>(
          <Col sm={6} md={4} lg={3}>
            <Link to={`/home`}  style={{ textDecoration: 'none'}}>
              <Card className="text-center p-2 m-1" key={cat.category}>
                <Card.Img
                  variant="top"
                  src={cat.image}
                />
                <Card.Body>
                  <Card.Title>{cat.category}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
            ))}
        </Row>
      </div>
        </div>
    )
};

export default CategoryCards;