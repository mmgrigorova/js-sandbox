'use strict';
// Coding Challenge #2
// Let's continue with our football betting app! Keep using the 'game' variable from before.
// Your tasks:
// 1. Loopoverthegame.scoredarrayandprinteachplayernametotheconsole, along with the goal number(Example: "Goal 1: Lewandowski")
// 2. Use a looptocalculatetheaverageoddandlogittotheconsole(Wealready studied how to calculate averages, you can go check if you don't remember)
// 3. Printthe3oddstotheconsole, butinaniceformattedway, exactlylikethis:
// Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉
// 4. Bonus:Createanobjectcalled'scorers'whichcontainsthenamesofthe players who scored as properties, and the number of goals as the value.In this game, it will look like this:
// {
//     Gnarby: 1,
//         Hummels: 1,
//             Lewandowski: 2
// }
// GOOD LUCK 😀

// usage of: for-of loop (nice use with destructuring), enhanced object literals, optional chaining, lloping through objects and arrays


const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ], [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    }
};

// 1.
for (const [goalIndex, name] of game.scored.entries()) {
    console.log(`Goal ${goalIndex + 1}: ${name}`);
}

// 2. 
let avg = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
    avg += odd;
}
console.log(`The average odd is ${avg / odds?.length}`);

// 3.
for (const [oddName, oddValue] of Object.entries(game.odds)) {
    // console.log(`Odd of ${(game?.[oddName] && 'victory' || '')} ${(game?.[oddName]) ?? 'draw'} : ${oddValue}`);
    console.log(`Odd of ${game[oddName] ? 'victory ' + game[oddName]
        : 'draw'}: ${oddValue}`);
}

// 4.
let scorers = {};
const scoredPlayers = game.scored.values()

for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
      */

const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [37, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [84, '🔶 Yellow card'],
]);
//1. array 'events' of the different game events that happened (no duplicates)
console.log('Unique Events: ', [...new Set(gameEvents.values())]);

//2.
console.log(gameEvents.delete(64));

//3. Basically the duration / occurrence = the time between each event from start to end divided by number of events.

/*
average between 3 events: 
17 - 0 = 17;
36 - 17 = 19;
47 - 36 = 11;

duration: 17 + 19 + 11 / 3 = 15.6 minutes;

*/
// Alternative solution (simpler)
const gameTime = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${gameTime / gameEvents.size} minutes`);

//4.
for (const [min, event] of gameEvents.entries()) {
    console.log(`${min < 45 ? '[FIRST HALF]' : '[SECOND HALD]'} ${min}: ${event
        }`);
}