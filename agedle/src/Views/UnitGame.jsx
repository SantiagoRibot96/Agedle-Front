import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Select from "react-select";
import CivImg from "../Components/Game/CivImg";
import Config from "../Configs/config";
import Lose from "../Components/Game/Lose";
import Victory from "../Components/Game/Victory";
import { saveGamesPlayed, saveTries, saveFirstTries } from "../Utils/saveStats";
import { Reroll } from "../Utils/reroll";

const UnitGame = () => {
  const [validGuesses, setValidGuesses] = useState([]);
  const [civs, setCivs] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setGuess] = useState(validGuesses[0]);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [sprite, setSprite] = useState("");
  const [title, setTitle] = useState("");
  const [showLose, setShowLose] = useState(false);
  const [revealPercent, setRevealPercent] = useState(30);

  useEffect(() => {
    FetchCivs();
    FetchUnit();
  }, []);

  const FetchCivs = () => {
    axios
      .get(Config.url + "/civs")
      .then((response) => {
        if (response.data.status === "success") {
          const data = response.data.civs;
          data.sort((a, b) => a.value.localeCompare(b.value));
          const transformedData = data.map((civ) => ({
            value: civ.value,
            label: civ.value,
            image: civ.name,
          }));
          setValidGuesses(transformedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FetchUnit = () => {
    axios
      .get(Config.url + "/unit", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.status === "success") {
          if (response.data.result) {
            setSprite(response.data.result);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Guess = (e) => {
    e.preventDefault();

    if (!currentGuess) {
      return;
    }

    if (guesses.indexOf(currentGuess) !== -1) {
      return;
    }

    setValidGuesses(validGuesses.filter((item) => item.label !== currentGuess));
    setGuesses((guesses) => [...guesses, currentGuess]);

    axios
      .post(
        Config.url + "/guess/unit",
        { guess: currentGuess },
        {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        if (response.data.status !== "success") {
          return;
        }
        saveTries(1);

        const isCorrect = response.data.isCorrect;
        const name = response.data.name;

        // Use object instead of tuple
        setCivs((civs) => [{isCorrect, name }, ...civs]);

        const spriteImg = document.getElementById("spriteImg");

        if (isCorrect) {
          if (guesses.length === 0) {
            saveFirstTries();
          }
          saveGamesPlayed();
          setCorrectGuess(true);
          setTitle(response.data.name);

          spriteImg.style.filter = "";
        } else {
          ApplyBlur(guesses.length + 1);
          ApplyCrop(guesses.length + 1);
        }
      })
      .catch((error) => {
        console.log(error);
        setCivs([]);
      });
  };

  const ApplyBlur = useCallback(
    (guessCount) => {
      const spriteImg = document.getElementById("spriteImg");
      if (!spriteImg) return;

      const initialBlur = 0.5;
      let blurVal = initialBlur;

      for (let i = 0; i < guessCount; i++) {
        blurVal -= blurVal * 0.2;
      }

      spriteImg.style.filter = `blur(${blurVal.toFixed(3)}em)`;
    },
    []
  );

  const ApplyCrop = useCallback((guessCount) => {
    const spriteImg = document.getElementById("spriteImg");
    if (!spriteImg) return;

    // Cuánto mostrar (porcentaje)
    const minPercent = 30;  // muestra solo el centro
    const maxPercent = 100; // imagen completa
    const increment = 10;   // se agranda cada intento

    let visible = minPercent + guessCount * increment;
    if (visible > maxPercent) visible = maxPercent;

    setRevealPercent(visible);

    const clipValueVer = (100 - visible) / 2;
    const clipValueHor = ((100 - visible) - 20) / 2;
    spriteImg.style.clipPath = `inset(${clipValueVer}% ${clipValueHor}% ${clipValueVer}% ${clipValueHor}%)`;
  }, []);

  useEffect(() => {
    if (sprite) {
      ApplyBlur(guesses.length);
      ApplyCrop(guesses.length);
    }
  }, [sprite, guesses, ApplyBlur, ApplyCrop]);

  const Restart = () => {
    setTimeout(() => ApplyBlur(0), 0);

    FetchUnit();
    FetchCivs();

    setGuesses([]);
    setCivs([]);
    setGuess();
    setCorrectGuess(false);
    setSprite("");
  };

  return (
    <div className="container main pt-4 pb-5 mb-5">
      <h3 className="text-center pb-3">Whose unique unit is this?</h3>

      <div
        className="container d-flex justify-content-center shadow"
        id="spriteContainer"
      >
        <img
          src={`/units/${sprite}_AoE2.webp`}
          className="rounded p-4"
          id="spriteImg"
          alt="Unique unite civ game."
          draggable="false"
          style={{
            transition: "clip-path 0.5s ease-in-out, filter 0.5s ease-in-out",
            objectFit: "cover",
            filter: "blur(1.5em)",
            clipPath: "inset(45% 45% 45% 45%)"
          }}
        />
      </div>

      <div className="d-flex justify-content-center mt-4 pt-3 mb-3">
        <form
          className="form-control row g-3 mb-2"
          onSubmit={Guess}
          id="guess-form"
        >
          <Select
            className="select"
            options={validGuesses}
            onChange={(selectedOption) => setGuess(selectedOption.value)}
            isDisabled={correctGuess}
            placeholder="Type civs name"
            formatOptionLabel={(data) => (
              <div className="select-option">
                  <img
                    src={"/civs/" + data.label + "_AoE2.webp"}
                    alt="Civ icon"
                    loading="lazy"
                  />
                <span>{data.label}</span>
              </div>
            )}
          />

          <div className="d-flex justify-content-evenly">
            {correctGuess ? (
              <button
                className="btn btn-outline-dark mb-3 mt-1 min-vw-25"
                onClick={Restart}
              >
                Next
              </button>
            ) : (
              <button className="btn btn-dark mb-3 mt-1 min-vw-25">
                Guess
              </button>
            )}
            {!correctGuess && guesses.length >= 5 ? (
              <button
                className="btn btn-outline-dark mb-3 mt-1 min-vw-25"
                onClick={() => {
                  setGuesses([]);
                  setCivs([]);
                  setShowLose(true);
                }}
              >
                Reroll
              </button>
            ) : (
              ""
            )}
            {showLose ? <Lose isUnit={true}/> : ""}
          </div>
        </form>
      </div>

      <div id="civsImgs" className="container">
        {civs.map((civ) => (
          <CivImg
            key={civ.name}
            civKey={civ.name}
            isCorrect={civ.isCorrect}
            name={civ.name}
          />
        ))}
      </div>

      {correctGuess ? (
        <Victory
          id="victory"
          civKey={civs[0].name}
          civ={currentGuess}
          tries={guesses.length}
          title={title}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UnitGame