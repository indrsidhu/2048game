var gamegrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


//Initially fill first two cell with random 2 or 4;
randomCell = Math.floor((Math.random() * 15) + 1);
gamegrid[randomCell] = getRandomeValue();
randomCell = Math.floor((Math.random() * 15) + 1);
gamegrid[randomCell] = getRandomeValue();
printCell(gamegrid);


$("body").on("keydown", function(e){
	switch(e.keyCode){
		case 37: //left
		break;
		case 38: //up
		break;
		case 39: //right
			gamegrid = handelRightMove(gamegrid);
			printCell(gamegrid);//refresh			
		break;
		case 40: //down
		break;
	}
 });





/* Lib functions */

function handelRightMove(gamegrid){
	console.log(gamegrid);
	
	cellWithoutValues 	= [];
	cellWithValues 		= [];
	
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]>0){ //pick only which have value
			cellWithValues.push(index);
		}
	});
	
	cellWithValues.forEach(function(index) {
		gamegrid = possibleMove(gamegrid,index,'right');
	});
	
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]==0){
			cellWithoutValues.push(index);
		}
	});	
	
	gamegrid = fillBlankCell(gamegrid,cellWithoutValues);
	return gamegrid;
}

function possibleMove(gamegrid,index,moveType){
	switch(moveType){
		case 'right':
			boundries = [3,7,11,15]; // right boundries
			//process only if not already at boundries
			if(boundries.indexOf(index)==-1){
				if(index<3){
					gamegrid = processPossibleMove(gamegrid,index,3);
				} else if(index<7){
					gamegrid = processPossibleMove(gamegrid,index,7);
				} else if(index<11){
					gamegrid = processPossibleMove(gamegrid,index,11);
				} else if(index<15){
					gamegrid = processPossibleMove(gamegrid,index,15);
				}
			}//process only if not already at boundries
		break;
	}
	return gamegrid;
}

function processPossibleMove(gamegrid,index,boundry){
	if((index==(boundry-1)) && (gamegrid[boundry]!=0)){
		return gamegrid;
	}
	
	do{
		if((gamegrid[index+1]==0) || (gamegrid[index+1]==gamegrid[index])){
			if(gamegrid[index+1]==0){
				gamegrid[index+1] = gamegrid[index];
				gamegrid[index] = 0;
			} else if((gamegrid[index+1]==gamegrid[index])){ 
				gamegrid[index+1] = gamegrid[index+1]+gamegrid[index];
				gamegrid[index] = 0;
				break;
			}
		}
		index++;
	}while((index<(boundry)))
	return gamegrid;
}

function fillBlankCell(gamegrid,cellWithoutValues){
	value = getRandomeValue();
	randomIndex = Math.floor((Math.random() * cellWithoutValues.length) + 1);
	gamegrid[cellWithoutValues[randomIndex]] = value;
	return gamegrid;
}

function printCell(gamegrid){
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]>0){
			$(this).text(gamegrid[index]);
			$(this).parent().addClass('active-cell');
		} else{
			$(this).text('');
			$(this).parent().removeClass('active-cell');
		}
	});	
}

function getRandomeValue(){
	var prob 	= [2,2,2,2,2,2,2,2,2,2];
	randomIndex = Math.floor((Math.random() * 9) + 1);
	return prob[randomIndex];
}

function updateScore(score){
	current = jQuery("#score").text();
	score = parseInt(current) + parseInt(score);
	jQuery("#score").text(score);
}

