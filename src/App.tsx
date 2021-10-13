import React, { useState } from "react";
import "./App.css";
import Character from "./components/Character";
import legolas from "./json/legolas.json";

function App() {
  const [textInput, setTextInput] = useState("");
  const [action, setAction] = useState("");
  const [fulano, setFulano] = useState(new Character(legolas));

  function image() {
    if (fulano.type === "human") {
      return "https://www.ariasystems.com/wp-content/uploads/final-fantasy-xiv-delivers-subscription-model_16001262_800843099_0_0_7035184_300.jpg";
    }
    if (fulano.type === "elf") {
      return "https://i.pinimg.com/originals/5b/71/14/5b7114ca6a165da031a9f8dd15ea3356.jpg";
    }
    if (fulano.type === "orc") {
      return "http://pm1.narvii.com/6855/ce5c9d02eac1b0248765a4035de79fa613866b9ev2_00.jpg";
    }
  }

  function transparency(color: string) {
    return color + "50";
  }

  function backgroundColor() {
    if (fulano.type === "human") {
      return transparency("#D50001");
    }
    if (fulano.type === "elf") {
      return transparency("#00ff00");
    }
    if (fulano.type === "orc") {
      return transparency("#DD1160");
    }
  }

  const change = (param: string, value: string) => {
    if (param === "name" || param === "type" || param === "weapon") {
      legolas[param] = value;
    }
    setFulano(new Character(legolas));
    setTextInput("");
  };

  const talk = () => {
    let command = textInput.split(" ")[0];

    if (textInput.includes("change")) {
      var param2 = textInput.indexOf("to");
      var param = textInput.substring(7, param2 - 1);
      var value = textInput.substring(param2 + 3);
      if (param in legolas) {
        return change(param, value);
      } else {
        return alert(`${param} is not a property of character.`);
      }
    }

    if (textInput.includes("walk")) {
      let walk = textInput.substr(5);
      setAction(fulano.walk(walk));
      return setTextInput("");
    }

    if (textInput.includes("fight")) {
      setAction(fulano.fight());
      return setTextInput("");
    }

    if (textInput.includes("presentation")) {
      setAction(fulano.presentation());
      return setTextInput("");
    }

    setAction(fulano.say(textInput));
    setTextInput("");
  };

  React.useEffect(() => {
    setAction(fulano.presentation());
  }, [fulano]);

  return (
    <div className="App" style={{ backgroundColor: backgroundColor() }}>
      <h1 id="character_name">{fulano.name}</h1>
      <h3 id="character_type">{fulano.type}</h3>

      <div className="image">
        <img
          src={image()}
          id="imagem"
          alt="Imagem do personagem"
          loading="lazy"
        />
      </div>

      <p id="action">{action}</p>

      <form className="form" onSubmit={talk} action="#" autoComplete="on">
        <input
          type="text"
          id="text"
          placeholder="Call an action or say something..."
          value={textInput}
          onChange={(text) => setTextInput(text.target.value)}
        />
        <input type="submit" value="OK" id="send" />
      </form>
    </div>
  );
}

export default App;
