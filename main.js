
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
	let power = Math.floor(Math.random() * (5 - 2 + 1) ) + 2;
	let speed = Math.floor(Math.random() * (5 - 1 + 1) ) + 1;
	let name = faker.name.firstName();

	let gladiator = new Gladiator(health, power, speed, name);

	gladiators.push(gladiator);
}


console.log(gladiators);




function hit(gladiatorIndex){

	let opponentIndex = Math.floor(Math.random() * gladiators.length );

	while(gladiatorIndex == opponentIndex){
		opponentIndex = Math.floor(Math.random() * gladiators.length);
	}

	let opponent = gladiators[opponentIndex];
	let gladiator = gladiators[gladiatorIndex];

	opponent.health = opponent.health - gladiator.power;
	console.log(`${gladiator.name} hits ${opponent.name} with power ${gladiator.power}`);

	return checkHealth(opponentIndex)
		
}


function checkHealth(opponentIndex){


		let gladiator = gladiators[opponentIndex];

		if(gladiator.health <=0){
				console.log(`${gladiator.name} is dying`);
				return caesarsDecision(opponentIndex);
			}else if(gladiator.health > 15 && gladiator.health < 30){
				gladiators[opponentIndex].speed = gladiators[opponentIndex].speed * 3
				return true;
			}else{
				return true;
			}

}


function caesarsDecision(dyingGladiatorIndex){

	let caesarsDecision = ['Live', 'Finish him'];
	let option = Math.floor((Math.random() * 1) + 1);
	let dyingGladiator = gladiators[dyingGladiatorIndex];

		if(caesarsDecision[option] == 'Live'){
			dyingGladiator.health += 50;
			console.log(`Caesar showed thumbs up to ${dyingGladiator.name}`);
			return true;
		}else {
			gladiators.splice(dyingGladiatorIndex, 1);
			console.log(`Caesar showed &#128078 to ${dyingGladiator.name}`);
			if(gladiators.length == 1){
				console.log(`The winner is ${gladiators[0].name}`);
			}
			return false;
	}	

} 


function start(){


	for(let i = 0; i < gladiators.length; i++){

		let frequency = gladiators[i].speed;

		switch(frequency) {
  			case 1:
      		frequency = 5000;
    		break;
  			case 2:
   			 frequency = 4000;
    		break;
    		case 3:
   			 frequency = 3000;
    		break;
    		case 4:
   			 frequency = 2000;
    		break;
    		case 5:
   			 frequency = 1000;
    		break;
  			default:
    		5000
		}

		fight(i, frequency);

	}

}


function fight(i, frequency){

	//works with setInterval

	setInterval(hit, frequency, i);

	//with promise not yet


	// let startFight = (i, frequency) => {
 //      return new Promise((resolve, reject) => {
 //        let interval = setInterval(() => {
 //          hit(i)
 //            .then((data) => {
 //                 if (!data) {
 //                 	clearInterval(interval);
 //               } else if (data) {
 //                   resolve()
 //               }
 //           });
 //        }, frequency);
 //      });
 //    };
	
}

start();












