var memloc = document.getElementById("disp");
var locValue = document.getElementById("disp1");
let sw = 0;

const memory = [];
for (let i = 0; i <= 65535; i++) {
    memory[i] = Math.floor(Math.random() * 10);
}


function nextbtn() {
    locValue.value = memory[memloc.value];
    sw++;
    if(sw%2 == 0){
        memloc.value++;
        sw++;
    }
}
function dispOrdisp1(valuee){
    if(sw%2 == 0){
        printst(valuee);
    }else{
        printst1(valuee);
    }
}
var str1 = "00";
function printst1(valuee) {
    locValue.focus();
    str1 = str1 + valuee;
    if (str1.length > 2) {
        str1 = str1.substring(1, str1.length);
        locValue.value = str1;
    } else { locValue.value = str1; }
         memory[memloc.value] = str1;
}
var str = "0100";
function printst(valuee) {
    memloc.focus();
    str = str + valuee;
    if (str.length > 4) {
        str = str.substring(1, str.length);
        memloc.value = str;
    } else { memloc.value = str; }
}
function clear1() {
    memloc.value = "";
    str = "0000";
}







