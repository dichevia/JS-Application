function main(input) {

    let engineTypes = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ]

    let engineIndex = engineTypes.findIndex(engineProps => input.power<=engineProps.power);

    let wheelsArray = Array(4).fill(input.wheelsize);
    if (input.wheelsize%2==0){
        let wheelSize = input.wheelsize-1;
        wheelsArray.fill(wheelSize);
    }

    return {
        model: input.model,
        engine: engineTypes[engineIndex],
        carriage: {
            type: input.carriage,
            color: input.color
        },
        wheels: wheelsArray
    }

}

console.log(main(
    { model: 'Opel Vectra',
  power: 110,
  color: 'grey',
  carriage: 'coupe',
  wheelsize: 20 }

));