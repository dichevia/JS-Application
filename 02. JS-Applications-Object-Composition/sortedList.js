function main() {
    return {
        array: [],
        size: 0,
        add: function (element) {

            this.array[this.array.length] = element;
            this.size++;
            this.array.sort((a, b) => a - b);

        },

        remove: function (index) {
            if (index >= 0 && index < this.array.length) {
                this.size--;
                this.array.splice(index, 1)
            }
        },

        get: function (index) {
            if (index >= 0 && index < this.array.length) {
                return this.array[index];
            }
        },
    }
}


let arr = [1, 3, 2];
arr.add(4);
arr.remove(1);
console.log(arr.size);