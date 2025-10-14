const GameTitle = () => {
  return (
    <div className="container text-center" id="gameTitle">
      <div className="row">
        <div className="col-1">
          <p>Civilization</p>
        </div>
        <div className="col-2">
          <p>Civ description</p>
        </div>
        <div className="col-2">
          <p>DLC</p>
        </div>
        <div className="col-2">
          <p>Unique unit tipe</p>
        </div>
        <div className="col-1">
          <p>Has full Blacksmith?</p>
        </div>
        <div className="col-1">
          <p>Has Redemption?</p>
        </div>
        <div className="col-2">
          <p>Architecture</p>
        </div>
        <div className="col-1">
          <p>Has Cannon Galleon</p>
        </div>
      </div>
    </div>
  );
}

export default GameTitle