import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React from "react";
import Button from "react-bootstrap/esm/Button";

function PopUp(props) {
  const { visibility, message, code, onClose } = props;
  return (
    <div className="popup-wrapper">
      <Popup open={visibility} closeOnDocumentClick onClose={onClose} modal>
        <div className="popup">
          {code === "cart" ? (
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          ) : code === "error" ? (
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          ) : (
            <p></p>
          )}
          <p>{message}</p>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "#66b0de",
              color: "white",
              border: "none",
            }}>
            Close
          </Button>
        </div>
      </Popup>
    </div>
  );
}
export default PopUp;
