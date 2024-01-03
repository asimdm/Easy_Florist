import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React from "react";

function PopUp(props) {
  console.log("in popup");
  const { visibility, message, onClose } = props;
  return (
    <div>
      <Popup open={visibility} closeOnDocumentClick onClose={onClose} modal>
        <div className="popup">
          <p>{message}</p>
        </div>
      </Popup>
    </div>
  );
}
export default PopUp;
