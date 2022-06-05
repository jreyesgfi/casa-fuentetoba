/***
 * 
 * Soy una persona que cuando se dedica a lo que le gusta da el 100%. Muy atenta en el diseño y la funcionabilidad. 
 * I am someone who combines both rational and creative thinking. A person that always gives the 100% when interested in that he's engaging in. Very careful when it comes to design and functionality.
 * 
 * Siempre me han entusiasmado los juegos de mesa por lo que volcar mis esfuerzos en mejorar un portal que ofrece esta posibilidad sería perfecto para mi. 
Me gusta la idea de trabajar en una plataforma con el espíritu de una start-up y el tamaño de una compañía. 
Además, me encantaría formar parte de un equipo que parece tan cercano, alegre y distendido como es el vuestro, pues hasta el momento me he limitado a consultorías tecnológicas con un ambiente mucho más serio.
I have always been enthusiastic about board games, therefore, putting my efforts into improving a site that offers this possibility would be perfect for me.
I like the idea of working in a platform with the heart of a start-up and the size of a company.
Furthermore, I would be keen on making part of a team that looks so friendly, upbeat and easy-going such as yours, since I have only worked in technological consultancies in a much more serious enviroment so far.


https://colonist.io/profile/Jorgeee777

JorgeRG#8373

https://www.linkedin.com/in/jorge-reyes-guerrero-b61007225



https://github.com/jreyesgfi

https://stackoverflow.com/users/17483169/jreyesgfi

Valladolid, Spain

-Dice forge: ~90hours, reach top 60 in board games arena site.
-Civilization: ~ 80hours, win an online game.
-Age of Mythology: ~400 hours, win a 1vs1 game against an IA in Titan mode.

-Chess: >1000 hours, reach 2100 elo (a bit trickie because it depends on the site, in my case lichess)
-Risk (Warzone version): >500 hours, win a FFA with lvl 60 players (or even harder win a normal 3 vs 3 in a team with my friends)
-Age of Mythology: ~400 hours, win a 1vs1 game against a IA in Titan mode.


6

- Game abandons carry unfair trades.
- Non-functional design, doesn´t work for mobile devices.


-Crear un diseño responsive que permita jugar cómodamente en vertical.
-Desarrollar un modelo con IA, clustering, que permita a un bot imitar las decisiones de un humano cuando este abandona la partida.
-Construir componentes independientes y con un código legible fácilmente reutilizables por el equipo de forma que nuevas entregas y versiones del juego se implementen rápidamente.
-Build a responsive design that allow the players to play easily.
-Design an IA model, specifically clustering, that upgrade the decisions that the bots make to imitate the leaving player behaviour.
-Build highly self-contained components with a clear and light code making easy to adapt and reuse them by any member of the team and speeding up the launch of new versions. 


-An alternative to random turn order. Each player start with the same initial amount of resources, f.e two of each resource. Then the game begins with an auction for choose your turn place (first, second, third...).
-New thief dynamic. A player can't be target of thief twice in a row.
-Anonymous trading. A player trades with the remaining players at the same time and if more than one player accepts, the turn order determines who is the selected. This way is harder to do alliances in a FFA.


(In some cases i group two actions in same line since they only have sense together. Also we wont try to trade with other players because they shouldn´t accept any trade at the ending of the game).
-Build two free roads with the card from the 6,9,10 to 5,6 and build there a village to split the largest road. VP:5
-Build a road from the 8, 10 (sheep, wood) to the 10 (wood) earning the largest road since you connected 8 roads and the current owner (orange) had 5 after your last step. VP:7.
-Upgrade to city the 6,9,10 village, winning a point, allowing to build another village and, it won't be necessary because the goal points are assumed to be 10 and we would reach that, a way to produce stone and wheat the requirements to upgrade other cities. VP:8.
-Build a village, is not too relevant where but you can choose between the 8 sheep, 9 wheat or 9, 12 wheat sheep. Worthy for one point. VP:9.
-Use the two free resources and select stone in both. With the next action it makes sense. VP:9.
-Trade 2 sheeps for one stone in your port and upgrade to city the 5,8,10 village. It is worthy cause you earn a point one free spot to build another village and a sheeps to trade producer. VP:10.
This way you end up with 3 woods, 1brick, 2 sheeps, 0 wheat, 0 stone, and a knight.
Comments: If you are interested in winning with 11 points you maybe could achieve it leaving the split of the largest road to the last step and adding an adittional action. 
This action consists in use the knight to steal an extra resource. Likely it would be stone since the bank doesnt have to much and you neither. Anyway if you obtain a wood or sheep you could build a village, in a free spot like 9 wheat, exchanging wood or sheep in a 3:1 or 2:1 for wheat respectively. If you steal wheat you could build it without any trades. If you obtain stone i would try to take a development card, exchanging 3 woods for 1 wheat, hopping it would be an extra point and finally if you get a brick you couldn't get and extra point this way. After the rest of the process and only when you have 8 points you could build the other village earning 3 points in a row (two for the largest road and 1 for the village itself).

// roll n dices function rollDices(nDices = 2, nFaces = 6) {   // define the results list   var results = [];    // roll each dice in a iteration   for (let i = 0; i < nDices; i++) {     // generate a "random" number between 1 and nFaces     const result = Math.floor(Math.random() * nFaces) + 1;     // save a particular dice result     results.push(result);   }    // return all dices list   return results }  // check if the total meet any situation function resourceRevenue(dicesValues) {   // check if not values   if (!dicesValues) {     return   }    //evaluate the sum of multiple dices   const sum = dicesValues.reduce((d1, d2) => d1 + d2);    // dictionary to safe the conditions and make them iterables   const conditions = {     3: "Ore",     4: "Wheat",     5: "Sheep"   }    // variable to safe the met conditions   var extra = '';    //check if any condition meet the criteria   for (const [key, value] of Object.entries(conditions)) {     // if it does concanate the extra value     if (sum % key === 0) {       extra += value;     }   }    //return an object with the sum and the extra value   return {     'total': sum,     'resource': extra   }  }  // Create the final text function messageConstructor(rollNo, dicesValues) {    // text related to each dice   var dicesTexts = dicesValues.map((diceValue, index) =>     // build the new segment of string     `Dice${index+1}: ${diceValue} - `   )    //concatenate all texts   var dicesTotalText = dicesTexts.reduce((t1, t2) => t1 + t2);     // object related to the total and the extra   const extraObj = resourceRevenue(dicesValues);    // final message   var message = `RollNo : ${rollNo} - ` + dicesTotalText + `Total:${extraObj.total} - Extra= ${extraObj.resource}`;    return message }  // play 100 times to roll 2 dices for (let i = 0; i < 100; i++) { 	// simulate to roll 2 dices with 6 faces   const results = rollDices();   // print in the console the results   console.log(messageConstructor(i, results)); }

A complete web, rural house for rent portal, with all material design created from scratch by my own in react.js.

Changing the style designed to imitate google material design since it is clear, useful and adapted to people with disabilities.

$16,000

12 de junio de 2022

No

A dog?

I am working on an app to optimize and monitor the public parking within the city applying IA model. I think it is going to be my most interesant contribution but I can't mention it above since I haven't finished it yet.

*/




// roll n dices
function rollDices(nDices = 2, nFaces = 6) {
    // define the results list
    var results = [];
      
    // roll each dice in a iteration
    for (let i = 0; i < nDices; i++) {
        // generate a "random" number between 1 and nFaces
      const result = Math.floor(Math.random() * nFaces)+1;
      // save a particular dice result
      results.push(result);
    }
    
    // return all dices list
    return results
  }
  
  // check if the total meet any situation
  function resourceRevenue(dicesValues){
      // check if not values
      if (!dicesValues){
        return
    }
    
    //evaluate the sum of multiple dices
    const sum = dicesValues.reduce((d1,d2)=>d1+d2);
    
    // dictionary to safe the conditions and make them iterables
    const conditions = {3:"Ore", 4:"Wheat", 5:"Sheep" }
    
      // variable to safe the met conditions
    var extra ='';
    
    //check if any condition meet the criteria
    for (const [key, value] of Object.entries(conditions)) {
        // if it does concanate the extra value
      if (sum%key===0){
              extra += value;
      }
    }
    
    //return an object with the sum and the extra value
    return {'total':sum,'resource':extra}
    
  }
  
  // Create the final text
  function messageConstructor(rollNo,dicesValues){
  
      // text related to each dice
    var dicesTexts = dicesValues.map((diceValue, index)=>
        // build the new segment of string
        `Dice${index+1}: ${diceValue} - `
    )
    
    //concatenate all texts
    var dicesTotalText = dicesTexts.reduce((t1,t2)=>t1+t2);
    
    
      // object related to the total and the extra
    const extraObj = resourceRevenue(dicesValues);
    
      // final message
      var message = `RollNo : ${rollNo} - `+dicesTotalText+`Total:${extraObj.total} - Extra= ${extraObj.resource}`;
    
    return message
  }
  
  // play 100 times to roll 2 dices
  for (let i = 0; i < 100; i++) {
    const results = rollDices();
    console.log(messageConstructor(i,results));
  }
  