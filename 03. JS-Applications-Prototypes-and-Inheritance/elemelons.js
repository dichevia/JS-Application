function main() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError(`Abstract class cannot be instantiated directly`);
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            return `Sort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        toString() {
            return `Element: Water\n` + super.toString()
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        toString() {
            return `Element: Fire\n` + super.toString()
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        toString() {
            return `Element: Earth\n` + super.toString()
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        toString() {
            return `Element: Air\n` + super.toString()
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elements = ["Water", "Fire", "Earth", "Air"];
        }

        morph() {
            let currentElement = this.elements.shift();
            this.elements.push(currentElement);

            return this
        }

        toString() {
            return `Element: ${this.elements[0]}\n` + `Sort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}

let melolemonmelon = new Melolemonmelon(12.5, "Kingsize");
melolemonmelon.morph();
console.log(melolemonmelon.toString());
