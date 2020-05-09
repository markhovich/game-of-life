

$(document).ready(function(){
    // Taille de la grille
    var x=100;
    var day = 1;
    console.log('Game Of Life ready !')
    
    $('#title').html('Le Jeu de la Vie !');
    
    // Initialisation de la table
    for(let i=0; i<x; i++){
        
        $row = $('<tr>');
        $('#world').append($row);
        
        for(let j=0; j<x; j++){
            
            $cell = $('<td>');
            $cell.addClass('cell').attr({ id: i*x+j });
            
            $row.append($cell);
        }
    }
    //Initialisation de la fenetre visible au milieu de la table
    let verticalMiddle = $('#canvas').height() / 2 + 240;
    let horizontalMiddle = $('#canvas').width() / 2 - 180;
    $('#canvas').scrollTop(verticalMiddle).scrollLeft(horizontalMiddle);
    
    // RéInitialisation de la table
    $('#initialize').on('click', function(){
        day = 1;
        $('#day').html('Jour ' + day++);
        clearInterval(interval);
        $('#play').html('Start').removeClass('stop').addClass('start');
        $('#play').removeClass('btn-danger').addClass('btn-success');
        $('#generation').removeAttr('disabled');
        $('td').each(function() {
            let id = '#' + this.id;
            $(id).removeClass('alive');
        })
    })
    
    //Ajout de l'event listener au clique sur la cellule
    $('td').each(function() {
        let id = '#' + this.id;
        $(id).on('click', function() {
            if(!$(id).hasClass('alive')){
                $(id).addClass('alive');
                console.log('A cell is born!');
            } else {
                $(id).removeClass('alive');
                console.log('A cell is dying noo!');
            }
        })
    })
    
    // Teste du voisinage avec l'id à tester
    function isAlive(id){
        if($(id).hasClass('alive')){
            return 1;
        }
        return 0;
    }
    
    //Ajout de l'Event Listener sur le bouton Start
    $('.start').on('click', function() {
        
        if($(this).hasClass('start')){
            $('#generation').attr('disabled', 'disabled');
            $(this).html('Stop');
            interval = setInterval(generationTest, 500);
        } else {
            $('#generation').removeAttr('disabled');
            $(this).html('Start');
            clearInterval(interval);
        }
        $(this).toggleClass('start stop').toggleClass('btn-success btn-danger');
    })

    // Ajout de l'event listener au clique sur le bouton de génération
    $('#generation').on('click', generationTest)

    //Fonction appelée à chaque étpae de génération
    function generationTest(){
        $('#day').html('Jour ' + day++);
        
        // Initialisation du tableau des voisins
        var neighbours = new Array(x);
        for(let i=0; i<neighbours.length;i++){
            neighbours[i] = new Array(x);
        }
        
        for(let i=0; i<x; i++){
            for(let j=0; j<x; j++){
                neighbours[i][j] = 0;
            }
        } 
        
        // Comptage des voisins : remplissage du tableau
        for(let i=0; i<x; i++){
            for(let j=0; j<x; j++){
                
                var id = (i*x + j);
                var nei = 0;
                /**
                * Les tests de voisinage
                * A exclure certains test sur les bords pour éviter l'overflow
                */
                
                // Hors bord haut
                if(i > 0){
                    
                    nei += isAlive('#' + (id-x));
                    
                    // Hors coin haut/gauche
                    if(j > 0){
                        nei += isAlive('#' + (id - (x+1)));
                    }
                    // Hors coin haut/droite
                    if(j < x-1){
                        nei += isAlive('#' + (id - (x-1)));
                    }
                }
                
                // Hors bord bas
                if(i < x-1){
                    
                    nei += isAlive('#' + (id+x));
                    
                    // Hors coin bas/gauche
                    if( j > 0){
                        nei += isAlive('#' + (id + (x-1)));
                    }
                    // Hors coin bas/droite
                    if( j < x-1){
                        nei += isAlive('#' + (id + (x+1)));
                    }
                }
                
                // Hors gauche
                if( j > 0){
                    nei += isAlive('#' + (id - 1));
                }
                // Hors droite
                if ( j < x-1){
                    nei += isAlive('#' + (id + 1));
                }
                neighbours[i][j] = nei;
                
            }
        }
        
        // Application des règles pour la génération suivante
        for(let i=0; i<x; i++){
            for(let j=0; j<x; j++){
                var id = '#' + (i*x + j);

                if(neighbours[i][j] < 2 || neighbours[i][j] > 3){
                    $(id).removeClass('alive');
                }
                
                if(neighbours[i][j] == 3){
                    $(id).addClass('alive');
                }
            }
        }
    }

    // Ajout de l'event listener sur les boutons zoom in et out
    $('#zoom-out').on('click', function() {
        $('#world').css({'transform': 'scale(0.75)'});
    })

    $('#zoom-in').on('click', function() {
        $('#world').css({'transform': 'scale(1.7)'});
    })
})