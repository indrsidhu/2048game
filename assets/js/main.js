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
	
	cellWithValues = [];
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]>0){ //pick only which have value
			cellWithValues.push(index);
		}
	});
	
	cellWithValues.forEach(function(index) {
		moveIndex = getPosibbleMove(gamegrid,index,'right');
		//move only if cell moved
		if(moveIndex!=index){
			gamegrid[moveIndex] = gamegrid[index];
			gamegrid[index] = 0;
		}
	});
	
	console.log(gamegrid);
	return gamegrid;
}

function getPosibbleMove(gamegrid,index,moveType){
	console.log(index);
	switch(moveType){
		case 'right':
			boundries = [3,7,11,15]; // right boundries
			//process only if not already at boundries
			if(boundries.indexOf(index)==-1){
				if(index<3){
					do{
						index++;
					}while(index<3);
				} else if(index<7){
					do{
						index++;
					}while(index<7);
				} else if(index<11){
					do{
						index++;
					}while(index<11);
				} else if(index<15){
					do{
						index++;
					}while(index<15);
				}
			}//process only if not already at boundries
		break;
	}
	console.log(index);
	return index;
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
	var prob 	= [2,2,2,2,2,2,2,2,4,4];
	randomIndex = Math.floor((Math.random() * 9) + 1);
	return prob[randomIndex];
}