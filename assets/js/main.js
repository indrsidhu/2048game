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
			gamegrid = handelLeftMove(gamegrid);
		break;
		case 38: //up
			gamegrid = handelUpMove(gamegrid);
		break;
		case 39: //right
			gamegrid = handelRightMove(gamegrid);
		break;
		case 40: //down
			gamegrid = handelDownMove(gamegrid);
		break;
	}
	gamegrid = fillBlankCell(gamegrid);
	printCell(gamegrid);//refresh			
 });





/* Move control functions */

function handelUpMove(gamegrid){
	//process each column
	for (j = 1; j <= 4; j++) {
		//process each row
		for (i = 1; i <= 4; i++) {
		
			index = jQuery('#gamegrid > .row'+i+'-col'+j+'').attr('index');
			index = parseInt(index);

			do{
				// if current cell have value and row is not last row then move
				if(((gamegrid[index])>0) && (i>1)){ //here last boundry is first row
					if(gamegrid[index-4]==0){
						gamegrid[index-4] = gamegrid[index];
						gamegrid[index] = 0;
					} else if(gamegrid[index-4]==gamegrid[index]){ // or id next cell value matched
						score = gamegrid[index-4] = gamegrid[index]+gamegrid[index-4];
						gamegrid[index] = 0;
						updateScore(score);
						jQuery('#gamegrid > [index="'+(index-4)+'"]').fadeOut().fadeIn();
						break;
					}
				}
				index = (index-4);//jump next column (0,4,8,12)
			} while(index>3)//3 is maximum index of first row
		}//row loop
	}//col loop
	return gamegrid;
}

function handelDownMove(gamegrid){
	//process each column
	for (j = 4; j >= 1; j--) {
		//process each row
		for (i = 4; i >= 1; i--) {
		
			index = jQuery('#gamegrid > .row'+i+'-col'+j+'').attr('index');
			index = parseInt(index);
			
			do{
				
				// if current cell have value and row is not last row then move 
				if(((gamegrid[index])>0) && (i<4)){ //here boundary is last row
					if(gamegrid[index+4]==0){
						gamegrid[index+4] = gamegrid[index];
						gamegrid[index] = 0;
					} else if(gamegrid[index+4]==gamegrid[index]){ // or id next cell value matched
						score = gamegrid[index+4] = gamegrid[index]+gamegrid[index+4];
						gamegrid[index] = 0;
						updateScore(score);
						jQuery('#gamegrid > [index="'+(index+4)+'"]').fadeOut().fadeIn();
						break;
					}
				}
				index = (index+4);//jump next column (0,4,8,12)
			} while(index<12)//<12 is boundary of last move in down button
			
		}//row loop
	}//col loop
	return gamegrid;
}

function handelLeftMove(gamegrid){
	//process each row
	for (i = 1; i <= 4; i++) {
		//process each column from left most
		for (j = 1; j <= 4; j++) {
			//console.log('row'+i+'-col'+j);
			//console.log('#gamegrid > .row'+i+'-col'+j+' > span');
			index = jQuery('#gamegrid > .row'+i+'-col'+j+'').attr('index');
			index = parseInt(index);
			do{
				// if current cell have value and column is not last column then move
				if(((gamegrid[index])>0) && (j>1)){
					//if next move is 0
					if(gamegrid[index-1]==0){
						gamegrid[index-1] = gamegrid[index];
						gamegrid[index] = 0;
					} else if(gamegrid[index-1]==gamegrid[index]){ // or id next cell value matched
						score = gamegrid[index-1] = gamegrid[index]+gamegrid[index-1];
						gamegrid[index] = 0;
						updateScore(score);
						jQuery('#gamegrid > [index="'+(index-1)+'"]').fadeOut().fadeIn();
						break;
					}
				}//if not empty
				index--;
			}while(index>=((i*4)-3))//while not reached at first column of each row (lastColumn-3 = first column)
			
		}//col loop
	}//row loop
	return gamegrid;
}

function handelRightMove(gamegrid){
	//process each row
	for (i = 1; i <= 4; i++) {
		//process each column from right most
		for (j = 4; j >= 1; j--) {
			//console.log('row'+i+'-col'+j);
			//console.log('#gamegrid > .row'+i+'-col'+j+' > span');
			index = jQuery('#gamegrid > .row'+i+'-col'+j+'').attr('index');
			index = parseInt(index);
			do{
				// if current cell have value and column is not last column then move
				if(((gamegrid[index])>0) && (j<4)){
					//if next move is 0
					if(gamegrid[index+1]==0){
						gamegrid[index+1] = gamegrid[index];
						gamegrid[index] = 0;
					} else if(gamegrid[index+1]==gamegrid[index]){ // or id next cell value matched
						score = gamegrid[index+1] = gamegrid[index]+gamegrid[index+1];
						gamegrid[index] = 0;
						updateScore(score);
						jQuery('#gamegrid > [index="'+(index+1)+'"]').fadeOut().fadeIn();
						break;
					}
				}//if not empty
				index++;
			}while(index<((i*4)-1))//while not reached at last column of each row
			
		}//col loop
	}//row loop
	return gamegrid;
}

function fillBlankCell(gamegrid){
	cellWithoutValues 		= [];
	jQuery('#gamegrid > .cell > span').each( function (index, data) {
		if(gamegrid[index]==0){
			cellWithoutValues.push(index);
		}
	});	
	if(cellWithoutValues.length>0){
		value = getRandomeValue();
		randomIndex = Math.floor((Math.random() * cellWithoutValues.length));
		gamegrid[cellWithoutValues[randomIndex]] = value;
	} else{
		score = jQuery("#score > span").text();
		alert("Game over!, you score is :"+score);
	}
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
	/*
		print 2 with 80% Probability
		print 4 with 20% Probability
	*/
	var prob 	= [2,2,2,2,2,2,2,2,4,4];
	randomIndex = Math.floor((Math.random() * 9) + 1);
	return prob[randomIndex];
}

function updateScore(score){
	current = jQuery("#score > span").text();
	score = parseInt(current) + parseInt(score);
	jQuery("#score > span").text(score);
}

