function genTable(){
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
   // console.log("Generating table0");
    genTable();
});