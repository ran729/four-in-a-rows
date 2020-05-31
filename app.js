var play = document.querySelector('.play');
var game = document.querySelector('.game');
var add = document.querySelector('.add');
var rows, columns, win, draw = {a:0}; 
var  activePlayer =0, arrGmae, color, victory = true;
var Q = [],sequence = [0];

document.querySelector('.Send-button').addEventListener('click',startGame);

document.querySelector('.new_Game').addEventListener('click',newGame);

function newGame(){
    play.classList.add('remove');
    game.textContent = '';
    play.classList.remove('_start');
    add.classList.remove('remove');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.getElementById("reset").reset();
    draw.a = 0;
    arrGmae = 0;
    victory = 1;
}

function startGame (){
    var err = 0;
    rows = document.querySelector('#rows').value;
    columns = document.querySelector('#columns').value;
    win = document.querySelector('#win').value;

    if(rows > 20 || columns > 20){
        document.getElementById("Row&ColumnLittle20").classList.remove('remove');
        err++;
    }
    if(rows < 4 || columns < 4){
        document.getElementById("Row&ColumnBig3").classList.remove('remove');
        err++;
    }
    if((rows- win) < 0 || (columns - win) < 0 ){
        document.getElementById("Winlittle").classList.remove('remove');
        err++;
    }
    if(rows == NaN || columns == NaN || win == NaN){    
        document.getElementById("fillcells").classList.remove('remove');
        err++;
    }
    if (err == 0){
        play.classList.remove('remove');
        add.classList.add('remove');
        tableCreation(rows, columns);      
        TDfun(rows, columns, win);  
    }
}

function tableCreation (row,column) { 
    var newTabel = document.createElement("table") 
    var newDiv = document.createElement("div");
    for (i = 0 ; i < column ; i++){
        newTabel.appendChild(addTD(row , i));
    }
    newDiv.appendChild(newTabel);
    console.log(newDiv);
    game.appendChild(newDiv);
}

function addTD (row , a){
    var td = document.createElement("td")
    for( var j = 0 ; j < row ; j ++){
        td.appendChild(addTR(j , a));
        td.classList.add('column');   
        td.id = 'td' + a;
    }
    return td;
}

function addTR(i , a) {
    var tr = document.createElement('tr');
    tr.classList.add('slot');   
    tr.id ='td' + a + 'tr' + i;
    return tr;                                     
}


function TDfun (row, column, win){
    arrGmae = arrNew(row, column);
    for (i = 0 ; i < row ; i++){
        Q[i] = 0 ;
    }
    for (i = 0 ; i < column ; i ++){
        clickID(i);
    }

    function clickID(i) {
            var TD  = document.querySelector('#td' + i);
            TD.addEventListener("mouseover", function(){  
                color = colorPlayer(activePlayer);               
                PlayerColorChangeMouseover(Q[i] ,i,color);                
            }); 
            TD.addEventListener("mouseout", function(){                 
                PlayerColorChangeMouseover(Q[i] ,i , "white");
            }); 
            TD.addEventListener('click', function(){       
                Q[i] = add_point(Q[i], i); 
            }); 
    }

    function add_point( td, tr){
        if(victory && td < row) {
            PlayerColorChange(td, tr );
            victory = testGame(td,tr );
            td = testWin(td, victory);
            return td;
        }       
    } 

    function colorPlayer (activePlayer){
        if(activePlayer == 0){
            return "red"; 
        } else {
            return "blue";
        }
    } 

    function PlayerColorChangeMouseover(td, tr, color){
        if(victory && td < row) {
        document.getElementById("td" + tr + "tr" + td).style.background = color;
        }  
    }

    function PlayerColorChange(td, tr){
        color = colorPlayer(activePlayer);
        document.getElementById("td" + tr + "tr" + td).style.background = color;
        arrGmae[td][tr] = color; 
    }

    function testWin (td,vic){
        if( vic != false){ 
            td++
            activePlayer = !activePlayer;
            playerName (activePlayer); 
            return td;
        }      
    }
    function testGame(td, tr){
        var j = 0, x ,y, victory = 0 ;
        var cunter = 1;
        if(activePlayer == true){
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        if((td +1 ) == row){
            draw.a++;
            if (draw.a == column){
                document.querySelector('#name-0').textContent = 'stalemate';
                document.querySelector('#name-1').textContent = 'stalemate';
                return false;
            }       
        }
        sequence[j] = [td,tr];
        j++;
        for(i=1 ; i <= (win + 1) ; i++){        
            if ((tr + i) < row && (td + i) < column ){
                if(arrGmae[td + i][tr + i] == color ){
                    cunter ++;
                    sequence[j] = [(td + i),(tr + i)];
                    console.log(sequence);
                    j++;
                }else break;
            }
        }
        for(i=1 ; i <= ( win + 1 ) ; i++){
            if( 0 < (tr -i)   &&  0 < (td - i)){
                if(arrGmae[td - i][tr - i] == color ){
                    cunter ++;
                    sequence[j] = [(td - i) ,(tr - i)];
                    console.log(sequence);
    
                    j++;
                }else break; 
            }  
        }
        cunter = winGame(cunter, sequence);
        j = 0;
        sequence[j] = [td,tr];
        j++;
        for(i=1 ; i <=( win + 1) ; i++){
            if((tr + i) < row &&   0 < (td - i) ){
                if(arrGmae[td - i][tr + i] == color ){
                    cunter ++;
                    sequence[j] = [(td - i ),(tr + i)];
                    console.log(sequence);
    
                    j++;
                }else break;   
            }
        }
        for(i=1 ; i <= ( win + 1) ; i++){    
            if( 0 < (tr - i) && (td + i) < column ){
                if(arrGmae[td + i][tr - i] == color ){
                    cunter ++;
                    sequence[j] = [(td + i),(tr - i )];
                    console.log(sequence);
    
                    j++;
                }else break;
            }
        }
        cunter = winGame(cunter, sequence);
        j = 0;
        sequence[j] = [td,tr];
        j++;
        for(i=1 ; i <= (win + 1) ; i++){
            if(tr < row && (0 < 1) ){
                if(arrGmae[td][tr + i] == color ){
                    cunter ++;
                    sequence[j] = [td,(tr + i )];
                    console.log(sequence);
    
                    j++;
                }else break;
            }
        }
        for(i=1 ; i <= (win + 1) ; i++){
            if( 0 < (tr - i) && (0 < 1)){
                if(arrGmae[td][tr - i] == color ){
                    cunter ++;
                    sequence[j] = [td,(tr - i )];
                    console.log(sequence);
    
                    j++;
                }else break;
            }
        }
        cunter = winGame(cunter, sequence);
        j = 0;
        sequence[j] = [td,tr];
        j++;
        for(i=1 ; i <= (win + 1); i++){
            if(column < td && (0 < 1)){
                if(arrGmae[td + i][tr] == color ){
                    cunter ++;
                    sequence[j] = [(td + i),tr];
                    console.log(sequence);
                    j++;
                }else break;
            }
        }
        for(i=1 ; i <=(win + 1); i++){
            if(  0 < (td - i) && (0 < 1)){
                if(arrGmae[td - i][tr] == color ){
                    cunter ++;
                    sequence[j] = [(td - i),tr];
                    console.log(sequence);
    
                    j++;
                }else break;
            }
        }
        cunter = winGame(cunter, sequence);
        if (victory == 1){
            return false ;
        }else {
           return true; 
        }
        function winGame(cunter, sequence){
            if(cunter >= win){
                victory = 1;
                document.querySelector('#name-' + activePlayer).textContent = 'winner!';
                for( var j = 0 ; j < sequence.length ; j++){
                    x = sequence[j][0];
                    y = sequence[j][1];
                    document.getElementById("td" + y + "tr" + x).style.borderColor = "yellow";  
                };
            }else {
                return cunter = 1;  
            }
        }
    }    
}

function arrNew(row,column) {
    var line = [0] , i, j ;
    for (j = 0 ; j < row ; j++){
        var arr = [0];
        for(i = 0 ; i < column ; i++){
            arr[i] = 0 ;
        }
        line[j] = arr ; 
    }
    return line;
} 

function playerName (playerNow){
    var num ,num1;
    if(playerNow == true){
        num = 1;
        num1 = 0; 
    } else {
        num = 0;
        num1 = 1;
    }
    document.querySelector('.wrapper' + num1 ).classList.remove('active');
    document.querySelector('.wrapper' + num1).classList.add('notActive');
    document.querySelector('.wrapper' + num ).classList.remove('notActive');
    document.querySelector('.wrapper' + num ).classList.add('active');
}

