import Donation from "../Components/Donation"

const Home = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="card p-5 hola1 w-md-75 text-start">  
        <h1 className="tituloHTP">How to play</h1>
        <p>
          The Civ Game is a wordle-like game. First, you choose a civ, and its characteristics are displayed.
        </p>
        <p>
          The categories chosen for this game are:
          <ul>
            <li><strong>Civ Description: </strong> Is it a Cavalry civ? A defensive one? Maybe both!</li>
            <li><strong>DLC / Original Game: </strong> In which DLC (or the original game) does the civ appear?</li>
            <li><strong>Unique Unit: </strong> What unique unit does it have?</li>
            <li><strong>Blacksmith Upgrades: </strong> Does it have full blacksmith upgrades?</li>
            <li><strong>Redemption: </strong> Does it have Redemption?</li>
            <li><strong>Architecture Type: </strong>What type of architecture does it have? Maybe Mediterranean, Western European, who knows…</li>
            <li><strong>Cannon Galleon: </strong>Does it have Cannon Galleon?</li>
          </ul>
        </p>
        <p>
          Whether your guess is correct will be indicated by the colors below.
        </p>

        <p>
          Once you guess a civ correctly, it will be removed from your civ pool, so you won't see the same civ again.
          Only after you have guessed every single civ will your civ pool reset.
        </p>

        <p>If you are tired of guessing, after the 5th attempt you can <strong>Reroll</strong>. This option will show you the civ and select a new one.</p>
        <hr className="hrline"/>
        <h4 className="pb-3">Meaning of the colors</h4>

        <div className="d-flex pb-2 align-items-center">
          <div className={`demo correct`}></div>
          <p className="my-auto mx-auto">Correct guess</p>
        </div>

        <div className="d-flex pb-2 align-items-center">
          <div className={`demo incorrect`}></div>
          <p className="my-auto mx-auto">Incorrect guess</p>
        </div>

        <div className="d-flex pb-2 align-items-center">
          <div className={`demo partial`}></div>
          <p className="my-auto mx-auto">Some values are wrong or missing</p>
        </div>

        <hr className="hrline"/>
        <h4 className="pb-3">Make it Grow!</h4>
        <p>If you find any bugs, please report them to <strong> contact.agedle@gmail.com</strong>.</p>
        <p>If you have any ideas for improvements, I'd be glad to hear about them.</p>
        <p>Little things are comming.</p>

        <Donation></Donation>
      </div>
    </div>
  )
}

export default Home