class Gladiator{

	constructor(health, power, speed, name){
		this.health = health;
		this.power = power;
		this.speed = speed;
		this.name = name;
	}	
}


let gladiators = [];


for(let i = 0; i < 5; i++) {
	let health = Math.floor(Math.random() * (100 - 80 + 1) ) + 80;
	let power = (Math.random() * (5 - 2 + 1) + 1).toFixed(1);
	let speed = (Math.random() * (5 - 1 + 1)).toFixed(3);
	let name = faker.name.firstName();

	let gladiator = new Gladiator(health, power, speed, name);

	gladiators.push(gladiator);
}


console.log(gladiators);



function hit(gladiatorIndex){

	let opponentIndex = findOpponent(gladiatorIndex);
	let gladiator = gladiators[gladiatorIndex];
	let opponent = gladiators[opponentIndex];
	let initialHealth = opponent.health;

	opponent.health = opponent.health - gladiator.power;
	updateSpeed(opponent, initialHealth);

	let msg = `${gladiator.name} hits ${opponent.name} with power ${gladiator.power}`;
	console.log(msg);
	showDom(msg);

	return checkHealth(opponentIndex)
		
}

function findOpponent(gladiatorIndex){

	let opponentIndex = Math.floor(Math.random() * gladiators.length );

	while(gladiatorIndex == opponentIndex){
		opponentIndex = Math.floor(Math.random() * gladiators.length);
	}

	return opponentIndex;
}



function checkHealth(opponentIndex){

	let gladiator = gladiators[opponentIndex];

	if(gladiator.health <=0){
			let msg = `${gladiator.name} is dying`;
			console.log(msg);
			showDom(msg);
			return caesarsDecision(opponentIndex);
		}else if(gladiator.health > 15 && gladiator.health < 30){
			gladiators[opponentIndex].speed = gladiators[opponentIndex].speed * 3
		}
}


function caesarsDecision(dyingGladiatorIndex){

	let caesarsDecision = ['Live', 'Finish him'];
	let option = Math.floor((Math.random() * 1) + 1);
	let dyingGladiator = gladiators[dyingGladiatorIndex];

		if(caesarsDecision[option] == 'Live'){
			healthRecovered(dyingGladiator);

		}else {
			gladiatorDies(dyingGladiatorIndex);
			
			if(gladiators.length == 1){
				winnerIs();	
			}
	}	

}

function gladiatorDies(dyingGladiatorIndex){
	let msg = `Caesar showed thumbs down to ${gladiators[dyingGladiatorIndex].name}`;
	console.log(msg);
	showDom(msg);

	gladiators.splice(dyingGladiatorIndex, 1);
}

function healthRecovered(dyingGladiator){

	dyingGladiator.health += 50;

	let msg = `Caesar showed thumbs up to ${dyingGladiator.name}`;
	console.log(msg);
	showDom(msg);
}

function winnerIs(){
	let msg = `The winner is ${gladiators[0].name}`;
	console.log(msg);
	showDom(msg);
}


function updateSpeed(gladiator, initialHealth){
	gladiator.speed = gladiator.speed * (gladiator.health/initialHealth);
} 


function start(){

	for(let i = 0; i < gladiators.length; i++){

		fight(i);
	}
}


function fight(i){

	//setInterval(hit, frequency, i);

	let gladiatorIndex = i;
	let frequency = 6000 - (gladiators[gladiatorIndex].speed * 1000);

	hit(gladiatorIndex);


	setTimeout((gladiatorIndex) => {

		if(gladiators[i] && gladiators.length > 1){

			fight(i);
		}
		
	}, frequency);
	
}

function showDom(msg) {
  let msgLine = document.createElement("P");
  msgLine.innerText = msg;
  document.body.appendChild(msgLine);
}

start();