import React, { useState } from "react";
import "./App.scss";
import Character from "./components/Character";
import legolas from "./json/legolas.json";
import Footer from "./components/Footer";

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
    const fullCommand = textInput.split(" ");
    const fullCommandLowerCase = textInput.toLocaleLowerCase().split(" ");
    const command = fullCommand[0];

    if (fullCommandLowerCase.includes("change")) {
      var changeIndex = fullCommandLowerCase.indexOf("change");
      let param = fullCommandLowerCase[changeIndex + 1];
      var toIndex = fullCommandLowerCase.indexOf("to", changeIndex);
      var value = fullCommand[toIndex + 1];

      if (
        fullCommandLowerCase.includes("my") ||
        fullCommandLowerCase.includes("his") ||
        fullCommandLowerCase.includes("her")
      ) {
        let pronoum = fullCommandLowerCase.indexOf("my", changeIndex);

        if (pronoum === -1) {
          pronoum = fullCommandLowerCase.indexOf("his", changeIndex);
        }
        if (pronoum === -1) {
          pronoum = fullCommandLowerCase.indexOf("her", changeIndex);
        }

        param = fullCommandLowerCase[pronoum + 1];
      }

      if (value === undefined || value === "") {
        return alert(`No value found for ${param}.`);
      } else if (param === "change ") {
        return alert(`Define a valid value and parameter to change.`);
      } else if (param in legolas) {
        return change(param, value);
      } else {
        return alert(`${param} is not a property of character.`);
      }
    }

    if (
      command === "walk" ||
      command === "fight" ||
      command === "presentation"
    ) {
      setAction(fulano[command](fullCommand[1] ? fullCommand[1] : ""));
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
      <header>
        <h1>My RPG - Character</h1>
      </header>

      <div className="app-body">
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
          <input type="submit" value="Confirm" id="send" />
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default App;
