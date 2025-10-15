import Donation from "../Components/Donation"

const About = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="card p-5 hola w-md-75 text-start">  
        <h3 className="pb-3 pt-4">Inspiration</h3>

        <p>This site is inspired by the countless wordle-like games online. In this case, it is an Age of Empires II: DE gamedle.</p>
        <p>As a fan of the series, I've spent many hours watching AoE2 streamings. Some creators, such as NachoAoE, Tatoh, Viper, and Hera, have taught me a lot about the game.</p>
        <p>This game was born as a small project for Opinologia (@avanzadaopinologia on YouTube) during a special broadcast about Age of Empires.</p>

        <hr className='hrline'/>
        <h3 className="pb-3 pt-4">Acknowledgements</h3>
        <p>
            <p className='nodeco'>To all gamedle creators, for making such fun games.</p>
            <p className='nodeco'>To the Opinologia team, for encouraging me and helping me upload the game.</p>
            <p className='nodeco'>Especially to Lasse Suomela (@lassesuomela on GitHub), whose post about a League of Legends-based game helped me a lot.</p>
            <br /><br />
            <p className='nodeco'>And to you, for playing.</p>
        </p>

        <hr className='hrline'/>
        <h3 className="pb-3 pt-4">Contact Us</h3>
        <p>
          If you want to contact me regarding this site, you can do so by sending an email to:
          <strong> contact.agedle@gmail.com</strong>.
        </p>

        <hr className='hrline'/>
        <h3 className="pb-3 pt-4">Legals</h3>
        <p>
          Age of Empires II © Microsoft Corporation.
          Agedle was created under Microsoft's "Game Content Usage Rules" using assets from Age of Empires II: DE,
          and it is not endorsed by or affiliated with Microsoft. 
        </p>

        <Donation></Donation>
      </div>
    </div>
  )
}

export default About