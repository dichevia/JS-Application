function createComputerHierarchy() {
    class Manufacturer {
        constructor(manufacturer) {
            if (new.target === Manufacturer) {
                throw new TypeError(`Abstract class cannot be instantiated directly`);
            }
            this.manufacturer = manufacturer;
        }
    }
    
    class Keyboard extends Manufacturer {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }
    
    class Monitor extends Manufacturer {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }
    
    class Battery extends Manufacturer {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }
    
    class Computer extends Manufacturer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new TypeError(`Abstract class cannot be instantiated directly`);
            }
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }
    
    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
    
        }
    
        get battery() {
            return this._battery;
        }
    
        set battery(battery) {
            if (battery instanceof Battery) {
                return this._battery = battery;
            }
            throw new TypeError(`${battery} is not of the expected instance`)
        }
    }
    
    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }
    
        get keyboard() {
            return this._keyboard;
        }
    
        set keyboard(keyboard) {
            if (keyboard instanceof Keyboard) {
                return this._keyboard = keyboard;
            }
            throw new TypeError(`${keyboard} is not of the expected instance`)
        }
    
        get monitor() {
            return this._monitor;
        }
    
        set monitor(monitor) {
            if (monitor instanceof Monitor) {
                return this._monitor = monitor;
            }
            throw new TypeError(`${monitor} is not of the expected instance`)
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}


let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let keyboard = new Keyboard('Logitech',70);
let monitor = new Monitor('Benq',28,18);

let laptop = new Laptop("Hewlett Packard",2.4,4,0.5,3.12,"Silver","pesho");
console.log(laptop);