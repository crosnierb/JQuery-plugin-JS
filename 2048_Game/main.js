(function($){
    $.fn.extend({
        //pass the options variable to the function
        mygame: function(size) {
            ///add personal option
            var gameobject  = this.attr('id');
            var blockSize   = size;
            var boardSize   = (4 * blockSize)+100;
            var game = false;
            var score = 0;

            //array variable random x y
              var valuesGame = new Array(null, null, null, null, null, null, null,
                 null, null, null, null, null, null, null, null, null, null, null);

            gameManager(game);

            function gameManager(game){
               if (!game) {
                 var div = $("<div id='board'><img src='gamestart.png' id='start' style='z-index:-1' alt='starter'></div>"); // Create text with DOM
                 $(div).css({"background-color":"#87CEFA","padding-top":"10%", "padding-left":"4%", "height":boardSize, "width":boardSize});
                 $("#"+gameobject).append(div);  // Append new elements
               } else {
                 stoper();
               }
            }

            function starter() {
            //method for create div during the call of plugin
            var div = $("<div id='board'></div>"); // Create text with DOM
            $(div).css({"background-color":"#87CEFA","padding-top":"7%", "z-index":"2","padding-left":"4%", "height":boardSize, "width":boardSize});
            $("#"+gameobject).append(div);  // Append new elements
            createGame();
            game = false;
            }

            function scorring() {
              $('#score').remove();
              var div = $("<div id='score'></div>"); // Create text with DOM
              $(div).css({"background-color":"black", "padding":"10px", "color":"red","top":"3%", "padding-top":"4%", "padding-left":"4%", "height":"20px", "width":"150px"});
              $(".score").append(div.html("Score: "+score));  // Append new elements
            }

            function reset() {
              var div = $("<div id='reset'>reset game</div>"); // Create text with DOM
              $(div).css({"background-color":"white", "padding":"10px", "color":"black","top":"3%", "padding-bottom":"0px", "padding-left":"4%", "height":"20px", "width":"150px"});
              $(".reset").append(div);  // Append new elements
            }

            //function on load page default
            function randomObject(positionX, positionY, valueX, valueY) {
                    this.positionX = positionX;
                    this.positionY = positionY;
                    this.valueX = valueX;
                    this.valueY = valueY;
            }

            function generateRandomValueY(reject_value){
                var random = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                return (random === reject_value) ? generateRandomValueY(reject_value) : random;
                }

            function generateRandomValueX(reject_value){
                var random = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                return (random === reject_value) ? generateRandomValueX(reject_value) : random;
                }

            function generateRandomY(positionX){
                var random = Math.floor((Math.random() * 16) + 1);
                return (random === positionX) ? generateRandomY(positionX) : random;
                }

            function generateRandom(){
                var valueX = generateRandomValueX(3);
                var valueY = generateRandomValueY(3);

                var positionX = Math.floor((Math.random() * 16) + 1);
                var positionY = generateRandomY(positionX);

                        valuesGame.splice(positionX, 1, valueX);
                        valuesGame.splice(positionY, 1, valueY);
                        var obj = new randomObject(positionX, positionY, valueX, valueY);
                        return (obj);
                }

                //function for set a picture
                function setPicture(value){
                return (value === 2) ? path = "image11.jpg"
                     : (value === 4) ? path = "image6.jpg"
                     : (value === 8) ? path = "image20.jpg"
                     : (value === 16) ? path = "image18.jpg"
                     : (value === 32) ? path = "image17.jpg"
                     : (value === 64) ? path = "image23.jpg"
                     : (value === 128) ? path = "image24.jpg"
                     : (value === 256) ? path = "image22.jpg"
                     : (value === 512) ? path = "image26.jpg"
                     : (value === 1024) ? path = "image28.jpg"
                     : (value === 2048) ? path = "image32.jpg"
                     : "none";
                }

            function createGame() {

                var randomObject = generateRandom();

                var pictureX = setPicture(randomObject.valueX);
                var pictureY = setPicture(randomObject.valueY);
                for (var i = 1; i !== 17; i++)
                {
                    if ( i === randomObject.positionX)
                    {
                        var element = $("<div class='square-container', style='width: 100%; height: 100%; max-height:"+blockSize+"px; max-width: "+blockSize+"px; border-color: red; border: solid 2px; background-image: url(./"+pictureX+"); background-size: 100%; border-radius: 5px; font-family:sans-serif; text-align:center; font-size:5em; line-height:"+blockSize+"px;'/></div>"); // for add number +randomObject.valueX+
                        $("#board").append(element.html(randomObject.valueX));  // Append new element
                    }
                    else if (i === randomObject.positionY)
                    {
                        var element = $("<div class = 'square-container', style=' width: 100%; height: 100%; max-height:"+blockSize+"px; max-width: "+blockSize+"px;  border-color: red; border: solid 2px; background-image: url(./"+pictureY+"); background-size: 100%; border-radius: 5px; border: solid 2px; font-family:sans-serif; text-align:center; font-size:5em; line-height:"+blockSize+"px;'/></div>"); // for add number +randomObject.valueY+
                        $("#board").append(element.html(randomObject.valueY));  // Append new element
                    }
                    else
                    {
                        var element = $("<div class = 'square-container'></div>");
                        $("#board").append(element);;  // Append new element

                    }
                }
                 $(".square-container").css({"background-color":"#B0E0E6", "color": "#FFD700", "height":blockSize, "width":blockSize, "float":"left", "border":"3px solid white", "margin":"3px", "bottom":"50%", "vertical-align":"middle",});
                 }

            //function for gaming -> updating the array valuesGame
                function checkListValuesGame(NewPosition, newValue){

                    valuesGame.splice(NewPosition, 1, newValue);
                    $("#board").empty();
                    for (var i = 1; i !== 17; i++)
                    {
                        var picture = setPicture(valuesGame[i]);

                            if (i === NewPosition)
                            {
                              var element = $("<div class='square-container', id='new', style='width: 100%; height: 100%; max-height:"+blockSize+"px; max-width: "+blockSize+"px; border-color: red; border: solid 2px; background-image: url(./"+picture+"); background-size: 100%; border-radius: 5px; font-family:sans-serif; text-align:center; font-size:5em; line-height:"+blockSize+"px;'/></div>"); // for add number +randomObject.valueX+
                              $("#board").append(element.html(valuesGame[i]));  // Append new element
                            }
                            else if (valuesGame[i] !== null)
                            {
                              var element = $("<div class='square-container', style='width: 100%; height: 100%; max-height:"+blockSize+"px; max-width: "+blockSize+"px;  border-color: red; border: solid 2px; background-image: url(./"+picture+"); background-size: 100%; border-radius: 5px; font-family:sans-serif; text-align:center; font-size:5em; line-height:"+blockSize+"px;'/></div>"); // for add number +randomObject.valueX+
                              $("#board").append(element.html(valuesGame[i]));  // Append new element
                            }
                            else
                            {
                                var element = $("<div id='move' class = 'square-container'></div>");
                                $("#board").append(element);  // Append new element
                            }
                    }

                    $(".square-container").css({"background-color":"#B0E0E6", "color": "#FFD700", "height":blockSize, "width":blockSize, "float":"left", "border":"3px solid white", "margin":"3px"});
                    $("#new").animate({opacity: '0.2'}).animate({opacity: '0.7'}, 300).animate({opacity: '0.9'});
                }

                function generateRandomNewPosition(){
                var random = Math.floor((Math.random() * 16) + 1);
                return (valuesGame[random] !== null) ? generateRandomNewPosition() : random;
                }

            //function for movement in the game
                function moveUpValues() {

                    for (var j = 1; j !== 5; j++)
                    {
                        var end = 5 - j;
                        var i = 0;
                        var bool = false; // var bool indique true si une opération a été faite.
                    //ici nous allons verifier si il y a match entre la valeur suivant i et i
                    for (var i = 17-j; i !== end; i-=4)  //tant que iteration tableau < 4 | loop
                    {
                       if ( ( valuesGame[i] !== null ) && ( valuesGame[i-4] !== null ) && (bool === false)) // si le couple valeur + valeur precedente existe et qu'aucune opération a été faite
                        {
                            if (valuesGame[i] === valuesGame[ i - 4 ]) //on verifie si les deux valeur match  sinon on sort de la condition
                            {
                                valuesGame[i-4] = valuesGame[i-4] + valuesGame[i];
                                score += valuesGame[i-4];
                                 valuesGame[i] = null;

                                //ici nous allons rabatre la valeur suivant i vers i
                                if ((valuesGame[i+4] !== null) && ( i !== 13    ) && ( i !== 14 ) && ( i !== 15 ) && ( i !== 16 )) // si valeur precedente non null et i n'a pas la position des premieres valeur
                                {
                                    valuesGame[i] = valuesGame[i+4]; // la valeur de la position actuel prendra celle de la valeur precedente
                                    valuesGame[i+4] = null; // la valeur suivante sera set à null
                                }
                            bool = true; // si il y a eu match on valide un marqueur booleen avec true
                            }

                        } //ici nous allons rabatre i vers le bas
                        else if ( ( valuesGame[i] !== null ) && ( valuesGame[i-4] === null ) ) // si le couple valeur existe mais que la valeur precedente est null
                        {
                            valuesGame[i-4] = valuesGame[i]; // la valeur null precedente prendra la valeur de la valeur existante
                            valuesGame[i] = null; // on supprime la valeur existante apres transfere de celle ci
                            if ((valuesGame[i + 4] != null) && ( i !== 13    ) && ( i !== 14 ) && ( i !== 15 ) && ( i !== 16 ))
                            {
                                valuesGame[i] = valuesGame[i + 4];
                                valuesGame[i + 4] = null;
                            }

                        }

                        //ici nous allons set l'avant derniere valeur si elle est null
                        if ( (i === 5) || (i === 6) || (i === 7) || (i === 8) ) // si i correspond a la position des avants derniere valeur
                        {
                            if (valuesGame[i] === null)
                            {
                            for (var k = i; k !== ( i + 1 ); k++) // on itere une fois un compteur j
                            {
                                if (valuesGame[ i + 4 ] !== null)// on verifie si la valeur precedent la valeur actuel (de i ) est null
                                {
                                    valuesGame[i] = valuesGame[ i + 4 ]; //si valeur precedente est null, elle prendra la valeur de la valeur existante
                                    valuesGame[i + 4] = null; // la position de la valeur existante sera set a null
                                }
                            }
                              k = 0; // on remet notre compteur j à zero
                          }
                           // bool = false; // on reset le booleen à false
                        }
                    }
                }
            }

                function moveDownValues() {

                    for (var j = 1; j !== 5; j++)
                    {
                        var end = 12 + j;
                        var i = 0;
                        var bool = false; // var bool indique true si une opération a été faite.
                    //ici nous allons verifier si il y a match entre la valeur suivant i et i
                    for (var i = j; i !== end; i+=4)  //tant que iteration tableau < 4 | loop
                    {
                       if ( ( valuesGame[i] !== null ) && ( valuesGame[i+4] !== null ) && (bool === false)) // si le couple valeur + valeur precedente existe et qu'aucune opération a été faite
                        {
                            if (valuesGame[i] === valuesGame[ i + 4 ]) //on verifie si les deux valeur match  sinon on sort de la condition
                            {
                                valuesGame[i+4] = valuesGame[i+4] + valuesGame[i];
                                score += valuesGame[i+4];
                                 valuesGame[i] = null;

                                //ici nous allons rabatre la valeur precedent i vers i
                                if ((valuesGame[i-4] !== null) && ( i !== 1    ) && ( i !== 2 ) && ( i !== 3 ) && ( i !== 4 )) // si valeur precedente non null et i n'a pas la position des premieres valeur
                                {
                                    valuesGame[i] = valuesGame[i-4]; // la valeur de la position actuel prendra celle de la valeur precedente
                                    valuesGame[i-4] = null; // la valeur précedente sera set à null
                                }
                            bool = true; // si il y a eu match on valide un marqueur booleen avec true
                            }

                        } //ici nous allons rabatre i vers le bas
                        else if ( ( valuesGame[i] !== null ) && ( valuesGame[i+4] === null ) ) // si le couple valeur existe mais que la valeur precedente est null
                        {
                            valuesGame[i+4] = valuesGame[i]; // la valeur null precedente prendra la valeur de la valeur existante
                            valuesGame[i] = null; // on supprime la valeur existante apres transfere de celle ci
                            if ((valuesGame[i - 4] != null) && (i !== 1) && (i !== 2) && (i !== 3) && (i !== 4))
                            {
                                valuesGame[i] = valuesGame[i - 4];
                                valuesGame[i - 4] = null;
                            }

                        }

                        //ici nous allons set l'avant derniere valeur si elle est null
                        if ( (i === 9) || (i === 10) || (i === 11) || (i === 12) ) // si i correspond a la position des avants derniere valeur
                        {
                            if (valuesGame[i] === null)
                            {
                            for (var k = i; k !== ( i + 1 ); k++) // on itere une fois un compteur j
                            {
                                if (valuesGame[ i - 4 ] !== null)// on verifie si la valeur precedent la valeur actuel (de i ) est null
                                {
                                    valuesGame[i] = valuesGame[ i - 4 ]; //si valeur precedente est null, elle prendra la valeur de la valeur existante
                                    valuesGame[i - 4] = null; // la position de la valeur existante sera set a null
                                }
                            }
                              k = 0; // on remet notre compteur j à zero
                          }
                           // bool = false; // on reset le booleen à false
                        }
                    }
                }
            }

                function moveRightValues() {
                    var bool = false;                     // var bool indique true si une opération a été faite.
                    //ici nous allons verifier si il y a match entre la valeur suivant i et i
                    for (var i = 1; i !== 16; i++)  //tant que iteration tableau < 16 | loop
                    {
                       if ( ( valuesGame[i] !== null ) && ( valuesGame[i+1] !== null ) && (bool === false)) // si le couple valeur + valeur precedente existe et qu'aucune opération a été faite
                        {
                            if (valuesGame[i] === valuesGame[ i + 1 ]) //on verifie si les deux valeur match  sinon on sort de la condition
                            {
                                valuesGame[i+1] = valuesGame[i+1] + valuesGame[i];
                                score += valuesGame[i+1];
                                 valuesGame[i] = null;

                                //ici nous allons rabatre la valeur precedent i vers i
                                if ((valuesGame[i-1] !== null) && ( i !== 1 ) && ( i !== 5 ) && ( i !== 9 ) && ( i !== 13)) // si valeur precedente non null et i n'a pas la position des premieres valeur
                                {
                                    valuesGame[i] = valuesGame[i-1]; // la valeur de la position actuel prendra celle de la valeur precedente
                                    valuesGame[i-1] = null; // la valeur précedente sera set à null
                                }
                            bool = true; // si il y a eu match on valide un marqueur booleen avec true
                            }

                        } //ici nous allons rabatre i vers la droite
                        else if ( ( valuesGame[i] !== null ) && ( valuesGame[i+1] === null ) ) // si le couple valeur existe mais que la valeur precedente est null
                        {
                            valuesGame[i+1] = valuesGame[i]; // la valeur null precedente prendra la valeur de la valeur existante
                            valuesGame[i] = null; // on supprime la valeur existante apres transfere de celle ci
                            if ((valuesGame[i - 1] != null) && (i !== 5) && (i !== 9) && (i !== 13))
                            {
                                valuesGame[i] = valuesGame[i - 1];
                                valuesGame[i - 1] = null;
                            }

                        }
                        //ici nous allons set la derniere valeur si elle est null
                        if ( (i === 3) || (i === 7) || (i === 11) ) // si i correspond a la position des avants derniere valeur
                        {
                            for (var j = i; j !== ( i + 1 ); j++) // on itere une fois un compteur j
                            {
                                if (valuesGame[ i + 1 ] === null) // on verifie si la valeur precedent la valeur actuel (de i ) est null
                                {
                                    valuesGame[ i + 1 ] = valuesGame[i]; //si valeur precedente est null, elle prendra la valeur de la valeur existante
                                    valuesGame[i] = null; // la position de la valeur existante sera set a null
                                }
                            }
                            i = i + 1;  // on retire 1 à l'iteration afin de changer de ligne
                            j = 0; // on remet notre compteur j à zero
                            bool = false; // on reset le booleen à false
                        }
                    }

                }


                function moveLeftValues() {
                    var bool = false;                     // var bool indique true si une opération a été faite.

                    for (var i = 16; i !== 1; i--)  //tant que iteration tableau < 16 | loop
                    {
                        if ( ( valuesGame[i] !== null ) && ( valuesGame[i-1] !== null ) && (bool === false)) // si le couple valeur + valeur precedente existe et qu'aucune opération a été faite
                        {
                            if (valuesGame[i] === valuesGame[ i - 1 ]) //on verifie si les deux valeur match  sinon on sort de la condition
                            {
                                valuesGame[i-1] = valuesGame[i-1] + valuesGame[i];
                                score += valuesGame[i-1];
                                 valuesGame[i] = null;

                                if ((valuesGame[i+1] !== null) && ( i !== 4 ) && ( i !== 8 ) && ( i !== 12 ) && ( i !== 16)) // si valeur precedente non null et i n'a pas la position des premieres valeur
                                {
                                    valuesGame[i] = valuesGame[i+1]; // la valeur de la position actuel prendra celle de la valeur precedente
                                    valuesGame[i+1] = null; // la valeur précedente sera set à null
                                }
                            bool = true; // si il y a eu match on valide un marqueur booleen avec true
                            }
                        }
                        else if ( ( valuesGame[i] !== null ) && ( valuesGame[i-1] === null ) ) // si le couple valeur existe mais que la valeur precedente est null
                        {
                            valuesGame[i-1] = valuesGame[i]; // la valeur null precedente prendra la valeur de la valeur existante
                            valuesGame[i] = null; // on supprime la valeur existante apres transfere de celle ci
                            if ((valuesGame[i + 1] != null) && (i !== 12) && (i !== 8) && (i !== 4))
                            {
                                valuesGame[i] = valuesGame[i + 1];
                                valuesGame[i + 1] = null;
                            }
                        }

                        if ( (i === 14) || (i === 10) || (i === 6) ) // si i correspond a la position des avants derniere valeur
                        {
                            for (var j = i; j !== ( i - 1 ); j--) // on itere une fois un compteur j
                            {
                                if (valuesGame[ i - 1 ] === null) // on verifie si la valeur precedent la valeur actuel (de i ) est null
                                {
                                    valuesGame[ i - 1 ] = valuesGame[i]; //si valeur precedente est null, elle prendra la valeur de la valeur existante
                                    valuesGame[i] = null; // la position de la valeur existante sera set a null
                                }
                            }

                            i = i - 1;  // on retire 1 à l'iteration afin de changer de ligne
                            j = 0; // on remet notre compteur j à zero
                            bool = false; // on reset le booleen à false
                        }
                    }

                }

            // function for start game on onclick start button
            $('#start').click(function() {
                $('#start').remove();
                $('#board').remove();
                starter();
                scorring();
                reset();
            });

            // function for start game on onclick start button
            $('#reset').click(function() {
                $('#score').remove();
                $('#board').remove();
                starter();
                scorring();
            });

            // function for manage event keyboard animate
                $(document).on('keyup',
                  function(e) {
                    var code =null;
                    code= (e.keyCode ? e.keyCode : e.which);

                    if(code == 39){
                            moveRightValues();
                            var NewPosition = generateRandomNewPosition();
                            var newValue = generateRandomValueX(3);
                            checkListValuesGame(NewPosition, newValue);
                        }
                    else if(code == 37){
                            moveLeftValues();
                            var NewPosition = generateRandomNewPosition();
                            var newValue = generateRandomValueX(3);
                            checkListValuesGame(NewPosition, newValue);

                        }
                    else if (code == 40 ){
                            moveDownValues();
                            var NewPosition = generateRandomNewPosition();
                            var newValue = generateRandomValueX(3);
                            checkListValuesGame(NewPosition, newValue);
                    }
                    else if (code == 38 ){
                            moveUpValues();
                            var NewPosition = generateRandomNewPosition();
                            var newValue = generateRandomValueX(3);
                            checkListValuesGame(NewPosition, newValue);
                    }
                    scorring();
                });
                    return this;
      },
    });
})(jQuery);

$(document).ready(function(){
        $('#game').mygame(100);
});
