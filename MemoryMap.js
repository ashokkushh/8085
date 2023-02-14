
var memloc = document.getElementById("disp");
var locValue = document.getElementById("disp1");
let sw = 0;
memloc.value = "DEI 8085";
const memory = [];
for (let i = 0; i <= 10; i++) {
    memory[i] = 0;
}
for (let i = 10; i <= 65535; i++) {
    memory[i] = Math.floor(Math.random() * 10);
}

function hexToDec(hex) {
    return parseInt(hex, 16);
  }
 function dectoHex(dec){
    let cap = dec.toString(16);
    cap = cap.toUpperCase();
    return cap;
 }

function nextbtn() {
    let locationInDec = hexToDec(memloc.value);
    locValue.value = memory[locationInDec];
  //  locValue.value = memory[memloc.value];
    sw++;
    if(sw%2 == 0){
       memloc.value = dectoHex(locationInDec+1);
      // memloc.value++;
        sw++;
    }
}
function dispOrdisp1(valuee){
    if(sw>0){
    if(sw%2 == 0){
        printst(valuee);
    }else{
        printst1(valuee);
    }
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
         memory[hexToDec(memloc.value)] = str1;
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
    memloc.value = "DEI 8085";
    str = "0000";
}

function exmembtn(){
    sw =2;
}
function gobtn(){
    sw =2;
}
function fillbtn(){
    processor(memloc.value);
    memloc.value = "E";
}
let SP;
function  processor(start_index){
    for(let i =start_index;i<memory.length;i++){
        if(memory[i] == "76"){
            return;
        }
    
      //System.out.print(memory[i]+" ");
      if(memory[i] == "3A"){
        //LAD
          memory[0] = memory[++i];
          SP =0;
       // System.out.println("yessssss3A  " + memory[0]);


       }
       if(memory[i] == "6F"){
        // mov l,a
        memory[6] = memory[0];
        SP = 6;
       // System.out.println("yessssss6F  " + memory[6]);

    }
    if(memory[i] == "01"){
        //LXI B  (problem of register pair!!!!!!!!   b = b+c)
        memory[1] = memory[++i];
        //pointer
        SP =1;
       // System.out.println("yessssss01  " + memory[1] );

    }
    if(memory[i] == "4D"){
        memory[2] = memory[6];
        
        SP = 2;
       // System.out.println("yessssss4D  " + memory[2]);

    }
    if(memory[i] == "0D"){
        //DCR C
        memory[2] = String.valueOf(Integer.valueOf(memory[2])-1);
        SP = 2;
        memory[1] = String.valueOf(Integer.valueOf(memory[1])+Integer.valueOf(memory[2]));
       // System.out.println("yessssss0D  " + memory[1]);

    }
    if(memory[i] == "11"){
        //LXI D (location of destination)
        memory[3] = memory[++i];
        //System.out.println(memory[3]);
        SP =3;
       // System.out.println("yessssss11  " + memory[3]);
        
    }
    if(memory[i] == "0A"){
       // LDAX B
        memory[0] = memory[1];
        SP = 0;
       // System.out.println("yessssss0A  " + memory[0]);

    }
    if(memory[i] == "12"){
        //STAX D
        memory[memory[3]] = memory[0];
        SP = [3];
      //  System.out.println("yessssss12  " + SP + " " + memory[0]);

    }
    if(memory[i] == "0B"){
        //DCX B
        memory[1] = memory[1]-1;
       SP = 1;
      // System.out.println("yessssss0B  "+memory[1]);

    }
    if(memory[i] == "13"){
        //INX D
        memory[3] = memory[3]+1;
      SP = 3;
     // System.out.println("yessssss13  "+ memory[3]);

        
    }
    if(memory[i] == "2D"){
        //DCR L
        memory[6] = memory[6]-1;
       SP = 6;
      // System.out.println("yessssss2D  " + memory[6]);

        
    }
    if(memory[i] == "C2"){
        if(memory[SP] != 0){
            i = memory[i+1]-1+10;
        }
      //  System.out.println("yessssssC2  "+ i);

    }  
    
   
   }


}

