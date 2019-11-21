class Hex {
    constructor(value) {
        this.value = Number(value);
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toLocaleUpperCase()}`;
    }

    plus(number) {
        if (number instanceof Hex) {
            return new Hex(number.valueOf() + this.valueOf());
        }

        return new Hex(Number(number) + this.valueOf())
    }

    minus(number) {
        if (number instanceof Hex) {
            return new Hex(this.valueOf() - number.valueOf());
        }

        return new Hex(this.valueOf() - Number(number))
    }

    parse(string) {
        return parseInt(string, 16);
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = 5;
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === '0xF');
console.log(FF.parse('0xFF'));

