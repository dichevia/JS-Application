function main() {
    return {
        __proto__: {},
        extend: function (template) {
            Object.entries(template).map(([key, value]) =>
                typeof value === "function" ?
                    Object.getPrototypeOf(this)[key] = value :
                    this[key] = value
            )
        }
    }
}


let template = {
    extensionMethod: function () {
        console.log("From extension method")
    }
};

let testObject = main();
testObject.extend(template);
console.log(testObject.__proto__.extensionMethod);

