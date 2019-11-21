function modifyProperties(worker){
    if (worker.dizziness){
        let waterToWork = 0.1*Number(worker.weight)*Number(worker.experience);
        worker.levelOfHydrated += waterToWork;
        worker.dizziness = false;
        return worker;
    }
    return worker;
}

console.log(modifyProperties({ weight: 95,
    experience: 3,
    levelOfHydrated: 0,
    dizziness: false }
  
  ));