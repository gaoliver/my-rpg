export interface ICharacter {
  name: string;
  type: string;
  weapon: string;
}

export default class Character {
  name: string;
  type: string;
  weapon: string;
  constructor({ name, type, weapon }: ICharacter) {
    this.name = name;
    this.type = type;
    this.weapon = weapon;
  }

  presentation() {
    return `${this.name}: "Hello, my name is ${this.name} and I am ${this.type}. Beware my ${this.weapon}!"`;
  }

  walk(condition: string | undefined) {
    return `${this.name} is walking ${condition}`;
  }

  fight() {
    return `${this.name} is fighting using his ${this.weapon}`;
  }

  MyType() {
    return `${this.name} is a ${this.type}`;
  }

  say(text: string) {
    return `${this.name}: "${text}"`;
  }
}
