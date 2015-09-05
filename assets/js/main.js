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
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]>0){
			currIndex = index;
			moveIndex = index+1;
			if(moveIndex<16){
				gamegrid[moveIndex] = gamegrid[index];			
				gamegrid[currIndex] = 0;
			}
		}
	});
	return gamegrid;
}

function printCell(gamegrid){
	console.log(gamegrid);
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