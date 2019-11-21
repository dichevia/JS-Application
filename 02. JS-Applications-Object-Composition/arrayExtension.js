(function () {

    Array.prototype.last = function () {
        return this[this.length - 1]
    }

    Array.prototype.skip = function (n) {
        let newArray = [];
        let counter = 0;
        for (let i = n; i < this.length; i++) {
            const element = this[i];
            newArray[counter] = element;
            counter++;
        }

        return newArray;
    }

    Array.prototype.take = function (n) {
        let newArray = [];
        let counter = 0;
        for (let i = 0; i < n; i++) {
            const element = this[i];
            newArray[counter] = element;
            counter++;
        }

        return newArray;
    }

    Array.prototype.sum = function () {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            const element = this[i];
            sum += Number(element);
        }

        return sum
    }

    Array.prototype.average = function () {
        let averageSum = 0;
        for (let i = 0; i < this.length; i++) {
            const element = this[i];
            averageSum += Number(element);
        }

        return averageSum / this.length;
    }
}())

let myArray = [1, 2, 3];

console.log(myArray.average());