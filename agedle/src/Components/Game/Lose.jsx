import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Config from "../../Configs/config";
import { Reroll } from "../../Utils/reroll";

const Lose = (props) => {
  const [isShown, setIsShown] = useState(true);
  const [validGuesses, setValidGuesses] = useState("");
  let fetchURL = Config.url + "/civs/correctguess";
  let reroll = "civ";
  let path = "/civs/";
  let source;

  if(props.isUnit){
    fetchURL = Config.url + "/unit/correctguess";
    reroll = "unit";
    path = "/units/";
  }

  useEffect(() => {
      FetchCorrectCiv();
  }, []);

  const FetchCorrectCiv = () => {
    axios
      .get(
        fetchURL,
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setValidGuesses(response.data.correctguess);
          source = path + validGuesses + "_AoE2.webp";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        show={isShown}
        onHide={() => setIsShown(false)}
        size="lg"
        centered
        className="transparentModal"
      >
        <Modal.Body>
          <div className="container lose">
            <div className="card w-100 w-md-75 text-center">
              <Modal.Header></Modal.Header>

              <div className="pb-5">
                <h1 className="pb-3">You Loss!</h1>

                <img
                  src={source}
                  alt={validGuesses}
                />

                <h2>Correct guess was: {validGuesses}</h2>

                <button className="btn btn-outline-dark mb-3 mt-1 min-vw-25" onClick={() => Reroll(reroll)} > Reroll </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Lose