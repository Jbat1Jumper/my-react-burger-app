import { useState, useEffect } from 'react'
import './App.css'
import { Jelly, Handsprings } from '@uiball/loaders'

const menuEntryStyle = {
    margin:"10px"
}

function BurgerDetail({burger}) {
    return <div>
        <h1>{burger.name}</h1>
        <p>{burger.description}</p>
        <p>Is served in {burger.restaurant}</p>
    </div>;
}

function Menu({burgers, onBurgerSelected}) {
    return <div>
        {
            burgers.map((burger, i) => {
                return <MenuEntry 
                    key={i}
                    burger={burger} 
                    onSelected={() => onBurgerSelected(i)}
                />
            })
        }
    </div>;
}

function MenuEntry({burger, onSelected}) {
    return <div>
        <button 
          onClick={onSelected}
          style={menuEntryStyle}>{burger.name}</button>
    </div>;
}


function App() {

  const [burgers, setBurgers] = useState(null);
  const [currentBurger, setCurrentBurger] = useState(1)

  useEffect(() => {
    fetch("https://my-burger-api.herokuapp.com/burgers")
      .then((response) => response.json())
      .then((burgers) => setBurgers(burgers));
  }, []);

  if (!burgers) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return <div style={{display:"flex"}}>
    <Menu burgers={burgers} onBurgerSelected={(i) => setCurrentBurger(i)}/>
    <BurgerDetail burger={burgers[currentBurger]}/>
  </div>;
}

export default App
