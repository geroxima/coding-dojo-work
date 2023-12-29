class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class UnitCard extends Card {
    constructor(name, cost, power, resilience) {
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }

    attack(target) {
        if (target instanceof UnitCard) {
            target.resilience -= this.power;
            console.log(`${this.name} ataca a ${target.name} causando ${this.power} de daño. Resiliencia de ${target.name}: ${target.resilience}`);
        } else {
            throw new Error("El objetivo debe ser una unidad.");
        }
    }
}

class EffectCard extends Card {
    constructor(name, cost, text, stat, magnitude) {
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }

    play(target) {
        if (target instanceof UnitCard) {
            if (this.stat === "Resiliencia") {
                target.resilience += this.magnitude;
            } else if (this.stat === "Poder") {
                target.power += this.magnitude;
            }
            console.log(`${this.name} se juega en ${target.name}: ${this.text}. Nuevos stats - Poder: ${target.power}, Resiliencia: ${target.resilience}`);
        } else {
            throw new Error("El objetivo debe ser una unidad.");
        }
    }
}

let ninjaCinturonRojo = new UnitCard("Ninja Cinturón Rojo", 3, 3, 4);
let ninjaCinturonNegro = new UnitCard("Ninja Cinturón Negro", 4, 5, 4);
let algoritmoDificil = new EffectCard("Algoritmo Difícil", 2, "aumentar la resistencia del objetivo en 3", "Resiliencia", 3);
let rechazoPromesaNoManejado = new EffectCard("Rechazo de promesa no manejado", 1, "reducir la resistencia del objetivo en 2", "Resiliencia", -2);
let programacionEnPareja = new EffectCard("Programación en pareja", 3, "aumentar el poder del objetivo en 2", "Poder", 2);

console.log("Turno 1:");
console.log("Jugador 1 convoca a Ninja Cinturón Rojo");
algoritmoDificil.play(ninjaCinturonRojo);

console.log("\nTurno 2:");
console.log("Jugador 2 convoca a Ninja Cinturón Negro");
rechazoPromesaNoManejado.play(ninjaCinturonRojo);

console.log("\nTurno 3:");
programacionEnPareja.play(ninjaCinturonRojo);
ninjaCinturonRojo.attack(ninjaCinturonNegro);
