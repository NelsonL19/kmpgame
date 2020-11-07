let randomtable = Math.floor(Math.random()*4);
let tablenum = randomtable

export function tableGen () {
    switch(tablenum){
        case 0:
            
        break;
        case 1:
        break;
        case 2:
        break;
        case 3:
        break;
    }
    for (let i = 1; i < 226; i++) {

    }
}

export function loadTableDOM() {
    //loads walls of table
    for (let i = 1; i < 16; i++) {
        $(`.c${i}`).addClass('wall');
    }
    for (let i = 1; i < 212; i+=15) {
        $(`.c${i}`).addClass('wall');
    }
    for (let i = 15; i < 226; i+=15) {
        $(`.c${i}`).addClass('wall');
    }
    for (let i = 211; i < 226; i++) {
        $(`.c${i}`).addClass('wall');
    }
    tableGen();
}

export function loadSpecificTableDOM()

let board1 = 
["w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
<<<<<<< HEAD
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"];
=======
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"];
>>>>>>> 5b171b86603c7b0f6a61e8de12c9ec9a3929f658
