import { useState, useEffect } from "react";
import axios from "axios";
import GameTitle from "../Components/Game/GameTitle";
import CivDetails from "../Components/Game/CivDetails";
import Victory from "../Components/Game/Victory";
import Lose from "../Components/Game/Lose";
import { saveGamesPlayed, saveTries, saveFirstTries} from "../Utils/saveStats";
import Config from "../Configs/config";

const CivGame = () => {
    const [validGuesses, setValidGuesses] = useState([]);
    const [civs, setCivs] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setGuess] = useState(validGuesses[0]);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [title, setTitle] = useState("");
    const [showLose, setShowLose] = useState(false);
    const [discarded, setDiscarded] = useState(new Set());

    useEffect(() => {
        FetchCivs();
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

    const Guess = (civValue) => {
        if (!civValue) {
            return;
        }

        if (guesses.includes(civValue)) {
            return;
        }

        // setValidGuesses(validGuesses.filter((item) => item.label !== currentGuess));
        setGuesses((guesses) => [...guesses, civValue]);

        axios
            .post(
            Config.url + "/guess/civ",
            { guess: civValue },
            {
                headers: { authorization: "Bearer " + localStorage.getItem("token") },
            }
            )
            .then((response) => {
            if (response.data.status !== "success") {
                return;
            }
            saveTries(1);

            const correct = response.data.correctGuess;
            const data = response.data.properties;

            setCivs((civs) => [data, ...civs]);

            if (correct) {
                if (guesses.length === 0) {
                    saveFirstTries();
                }
                saveGamesPlayed();
                setCorrectGuess(true);
                setTitle(response.data.title);
            }
            })
            .catch((error) => {
                console.log(error);
                setCivs([]);
            });
        };

    const Restart = () => {
        FetchCivs();

        setGuesses([]);
        setCivs([]);
        setGuess();
        setCorrectGuess(false);
    };

    const handleRightClick = (event, civLabel) => {
        event.preventDefault();

        setDiscarded(prev => {
            const newSet = new Set(prev);
            if (newSet.has(civLabel)) {
                newSet.delete(civLabel);
            } else {
                newSet.add(civLabel);
            }
            return newSet;
        });
    };

    return (
    <div className="container main pt-4 pb-5 mb-5">

        <h3 className="text-center pb-3">Guess the civ!</h3>

        <div className="d-flex justify-content-center mt-4 mb-3">
            <div className="civ-grid-form-container" id="guess-form">
                {}
                <div className="civ-grid-container">
                    <div className="civ-grid">
                        {
                            validGuesses.map((civ) => {
                                const isGuessed = guesses.includes(civ.label);
                                const isCorrect = correctGuess && isGuessed && civs[0] && civs[0][0].guessedCiv === civ.label;

                                return (
                                    <button
                                        key={civ.value}
                                        className={`civ-button
                                            ${isGuessed ? (isCorrect ? 'correct-guess' : 'disabled') : ''}
                                            ${discarded.has(civ.label) ? (isGuessed ? '' : 'discarded') : ''}`}
                                        onClick={() => Guess(civ.label)}
                                        onContextMenu={(e) => handleRightClick(e, civ.label)}
                                        disabled={correctGuess || isGuessed}
                                        type="button"
                                    >
                                        <img
                                        src={"/civs/" + civ.label + "_AoE2" + ".webp"}
                                        alt={civ.label}
                                        loading="lazy"
                                        className="civ-image"
                                        />
                                        <span className="civ-name">{civ.label}</span>
                                        {isGuessed ? (isCorrect ? <div className="correct-indicator">✓</div> : <div className="wrong-indicator">✗</div>) : ''}
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-evenly">
                    {correctGuess ? (
                        <>
                            <button
                                className="btn btn-outline-dark mb-3 mt-1 min-vw-25"
                                onClick={Restart}
                            >
                                Next
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                    {!correctGuess && guesses.length >= 5 ? (
                        <button
                        className="btnEspecial btn btn-outline-dark mb-3 mt-1 min-vw-25"
                        onClick={() => setShowLose(true)}
                        >
                            Reroll
                        </button>
                    ) : (
                        <></>
                    )}
                    {showLose ? <Lose isUnit={false}/> : <></>}
                </div>
            </div>
        </div>

        <div className="scroll-container">
            {civs.length > 0 ? <GameTitle /> : ""}

        <div id="civs">
            {civs.map((civ) => (
            <CivDetails
                key={civ[0].guessedCiv}
                type={civ[0].type}
                dlc={civ[0].dlc}
                hasFullBlacksmith={civ[0].hasFullBlacksmith}
                UUType={civ[0].UUType}
                hasRendemption={civ[0].hasRendemption}
                architectureSet={civ[0].architectureSet}
                name={civ[0].guessedCiv}
                hasCannonGalleon={civ[0].hasCannonGalleon}
                similarites={civ[1]}
            />
            ))}
        </div>
        </div>

        {correctGuess ? (
        <Victory
            id="victory"
            civKey={civs[0][0].name}
            civ={civs[0][0].guessedCiv}
            tries={guesses.length}
            title={title}
        />
        ) : (
        ""
        )}
    </div>
    );
}

export default CivGame