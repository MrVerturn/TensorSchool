function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function initRandMas(count, mas, element = 0, number = 0) {

    if((number == count)){
        return true;
    }

    if((mas[element] != undefined)){
        return false;
    }
    else{
        let rand;
        
        rand = getRandomInt(0, count);
        mas[element] = rand + 1;


        if(!initRandMas(count, mas, rand, number+1)){
            mas[element] = undefined;
            initRandMas(count, mas, element, number);
        }
    }

    if((number == count - 1)){
        mas[element] = 1;
    }
    
    return true;
}

function getReverseMas(inputMas) {
    return inputMas.reverse();   
}

function getDiffMas(input1Mas, input2Mas, outputMas) {
    return input1Mas.map( (elem, index) =>  (elem - input2Mas[index]) );   
}

function getMasAVG(inputMas){
    return inputMas.reduce( (val, elem) => val + elem ) / inputMas.length;
}