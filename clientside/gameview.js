import {Controller} from "../controller/Controller.js"
function generateCurrentTable(table){
    for (let i = 0; i<15; i++){
         for(let j =  i*15; j<(i+1)*15;j++){
            document.getElementById(`c${j}`).removeAttribute("id");
         }
    }

}

function generateStartTable(){
    const $table = $(`#game`);
    for (let i = 0; i<15; i++){
       // console.log("Generating table1");

        let row = `<tr id = r${i}></tr>`
        $(row).appendTo($table);
        for(let j =  i*15; j<(i+1)*15;j++){
            //console.log("Generating table2");
            let cell = `<td id = c${j}></td>`;
            const $row = $(`#r${i}`);
            $(cell).appendTo($row);
        }
    }
}

$(function() {
    genStartTable();
});



// for (i = 0; i < 225; i++) {
    //     switch(table[i]){
    //         case "w": $(`#c${i}`).addClass('wall');break; 
    //         case "a": $(`#c${i}`).addClass('air');break;
    //         case "p": $(`#c${i}`).addClass('player');break;

    //         case "n": $(`#c${i}`).addClass('nigiri');$(`#c${i}`).addClass('powerup');break;
    //         case "sa": $(`#c${i}`).addClass('sashimi');$(`#c${i}`).addClass('powerup');break;
    //         case "su": $(`#c${i}`).addClass('sushi');$(`#c${i}`).addClass('powerup');break;

    //         case "me": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('munsell_enemy');break;
    //         case "je": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('jordan_enemy');break;
    //         case "se": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('stotts_enemy');break;

    //         case "mje": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('majikes_enemy');break;
    //         case "sne": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('snoeyink_enemy');break;
    //         case "pe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('plaisted_enemy');break;

    //         case "ce": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('cynthia_enemy');break;
    //         case "poe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('porter_enemy');break;
    //         case "te": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('terrell_enemy');break;
            
    //         case "de": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('diane_enemy');break;
    //         case "ke": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('kevin_enemy');break;
    //         case "fe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('folt_enemy');break;
            
    //     }
    // }