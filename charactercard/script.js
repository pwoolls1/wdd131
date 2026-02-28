const character = {
  name: "Swamp Beast Diplomat",
  class: "Diplomat",
  level: 1,
  health: 100,
  image: "images/swamp-beast.jpg",

  attacked() {
    if (this.health <= 0) return;

    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      alert(`${this.name} has died!`);
    }

    updateDisplay();
  },

  levelUp() {
    this.level += 1;
    updateDisplay();
  }
};

function updateDisplay() {
  document.getElementById("character-name").textContent = character.name;
  document.getElementById("character-class").textContent = character.class;
  document.getElementById("character-level").textContent = character.level;
  document.getElementById("character-health").textContent = character.health;
}