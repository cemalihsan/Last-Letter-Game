export const randomNameGenerator = (names, last_name, difficulty) => {
    let l = last_name.length;
    let compComplexity = names.length - (names.length*difficulty)/100
    console.log(l,last_name,difficulty, compComplexity)
    //let generated = ~~(Math.random()*names.length);
    //console.log(generated)
    let shuffledNames = shuffleArray(names,compComplexity);

    for(let i = 0; i < shuffledNames.length; i++){
        if(last_name[l-1] == shuffledNames[i][0]){
            return shuffledNames[i]
        }
    }
};

export const generateNameForStart = (names) => {
    let generated = names[~~(Math.random()*names.length)];
    return generated
};

export const shuffleArray = (array,size) => {
    for(size; size > 0; size--){
        const j = Math.floor(Math.random() * size)
        const temp = array[size]
        array[size] = array[j]
        array[j] = temp
      }
      return array
}
