async function getImg(type, piece, object){
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    let a = 0
    let dict = [['eevee', 'raticate', 'persian', 'chansey', 'kangaskhan', 'snorlax'], ['machop', 'primeape', 'hitmonlee', 'hitmonchan', 'lucario', 'hariyama'], ['ekans', 'seviper', 'weezing', 'muk', 'nidoqueen', 'nidoking'], ['pidgey', 'noctowl', 'fearow', 'swellow', 'altaria', 'staraptor'], ['sandile', 'dugtrio', 'marowak', 'sandslash', 'donphan', 'hippowdon'], ['geodude', 'sudowoodo', 'rampardos', 'gigalith', 'rhydon', 'tyranitar'], ['caterpie', 'kricketune', 'beedrill', 'pinsir', 'heracross', 'scyther'], ['aron', 'skarmory', 'klinklang', 'bronzong', 'metagross', 'aegislash-shield'], ['misdreavus', 'spiritomb', 'banette', 'dusclops', 'cofagrigus', 'gengar'], ['charmander', 'rapidash', 'darmanitan-standard', 'magmar', 'ninetales', 'arcanine'], ['squirtle', 'kingler', 'golduck', 'poliwhirl', 'seaking', 'wailord'], ['bulbasaur', 'carnivine', 'bellossom', 'exeggutor', 'victreebel', 'vileplume'], ['pikachu', 'manectric', 'electabuzz', 'electrode', 'ampharos', 'luxray'], ['unown', 'mr-mime', 'hypno', 'wobbuffet', 'gardevoir', 'alakazam'], ['bergmite', 'vanilluxe', 'beartic', 'glalie', 'walrein', 'abomasnow'], ['axew', 'flygon', 'druddigon', 'garchomp', 'dragonair', 'salamence'], ['zorua', 'sneasel', 'houndoom', 'mightyena', 'liepard', 'absol']]    
    switch(type){
        case 'Normal':
            a = 0;
            break
        case 'Fighting':
            a = 1;
            break
        case 'Flying':
            a = 2;
            break
        case 'Poison':
            a = 3;
            break
        case 'Ground':
            a = 4;
            break
        case 'Rock':
            a = 5;
            break
        case 'Bug':
            a = 6;
            break
        case 'Ghost':
            a = 7;
            break
        case 'Steel':
            a = 8;
            break
        case 'Fire':
            a = 9;
            break
        case 'Water':
            a = 10;
            break
        case 'Grass':
            a = 11;
            break
        case 'Electric':
            a = 12;
            break
        case 'Psychic':
            a = 13;
            break
        case 'Ice':
            a = 14;
            break
        case 'Dragon':
            a = 15;
            break
        case 'Dark':
            a = 16;
            break
    }
    let url2 = url + dict[a][piece]
    const response = await fetch(url2);
    if (response.ok){
        const data = await response.json()
       return doStuff(data, object)
    }
}
function doStuff(data, object){
    const results = data;
    const url = results.sprites.front_default
    let img = document.createElement('img')
    img.classList.add('piece_img')
    img.setAttribute('src', url)
    img.setAttribute('id', object.id)
    let coords = object.pos
    document.querySelector('#t' + coords[0] + '_' + coords[1]).appendChild(img)
    object.set_pic(url, img)
    return img;
}


export default getImg;