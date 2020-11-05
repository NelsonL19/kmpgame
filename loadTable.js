let randomtable = Math.floor(Math.random()*4);

export function tableGen () {
    switch(randomtable){
        case 0:
            for (let i = 1; i < 226; i++) {
                if (i<16 || i>210 || i==16 || i == 23 || i == 30|| i == 31) {
                    $(`.c${i}`).addClass('wall');
                }
            }
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

