import React from 'react'

const About = () => {
  return (
    <div id="about">
      <h3>Inspiration</h3>

      <p>This site is inspired on the infinite amount of wordle-like games online. In this case, is an Age of Empires 2: DE gamedle</p>
      <p>As a fan of the series, I spent lots of hours watching AoE2 streamings. Some creators like NachoAoE, Tatoh, Viper or Hera have taught me a lot about the game</p>
      <p>This game has born as a little project for Opinologia (@avanzadaopinologia on yt) on a special broadcast about Age of Empires.</p>
      <h3>How to play</h3>

      <p>
        After you have created your nickname, you will be assigned a champion
        that you are trying to guess.
      </p>
      <p>
        In the text box you can start typing your champions name and press enter
        or click the champion you want, to select it as your guess. After that
        click Guess button to send your guess.
      </p>
      <p>
        If your guess was actually correct or not will be determined by the
        colors below.
      </p>

      <p>
        After you guess correctly, the champion will be removed from your
        champion pool and you will not get the same champion again. Only after
        you have guessed every single champion will your champion pool reset.
      </p>

      <h4 className="pb-3">Meaning of the colors</h4>

      <div className="d-flex pb-2 align-items-center">
        <div className={`demo cb-correct`}></div>
        <p className="my-auto mx-auto">Correct guess</p>
      </div>

      <div className="d-flex pb-2 align-items-center">
        <div
          className={`demo cb-incorrect-greater`}
        ></div>
        <p className="my-auto mx-auto">Correct value is higher</p>
      </div>

      <div className="d-flex pb-2 align-items-center">
        <div className={`demo cb-partial`}></div>
        <p className="my-auto mx-auto">Value is partially correct</p>
      </div>

      <div className="d-flex pb-2 align-items-center">
        <div
          className={`demo cb-incorrect-less`}
        ></div>
        <p className="my-auto mx-auto">Correct value is lower</p>
      </div>

      <div className="d-flex">
        <div className={`demo cb-incorrect`}></div>
        <p className="my-auto mx-auto">Incorrect guess</p>
      </div>

      <h4 className="pb-3 pt-4">Acknowledgements</h4>

      <p>
        <ul>
          <li>To all gamedle creators, very funny games.</li>
          <li>Especially to Lasse Suomela (@lassesuomela GitHub) whose post of a game based on League of Legends has helped me a lot</li>
          <li>To the Opinologia team as they encouraged and helped me to upload the game</li>
          <li>To you for playing</li>
        </ul>
      </p>

      <h4 className="pb-3 pt-4">Contact Us</h4>
      <p>
        If you want to contact us regarding this site. You can do that by
        sending email to <strong>infiniteloldle@gmail.com</strong>.
      </p>
    </div>
  )
}

export default About