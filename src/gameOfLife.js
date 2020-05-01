

$(document).ready(function(){
    var x=20;   
    var day = 1;
    console.log('App ready !')
    
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
    
    // RéInitialisation de la table
    $('#initialize').on('click', function(){
        day = 1;
        $('#day').html('Jour ' + day++);
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
    
    // Ajout de l'event listener au clique sur le bouton de génération
    $('#generation').on('click', function(){
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
        
    })
    
})