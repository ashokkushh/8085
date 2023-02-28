
var memloc = document.getElementById("disp");
var locValue = document.getElementById("disp1");
let sw = 0;
memloc.value = "DEI 8085";
const memory = [];
for (let i = 0; i < 10; i++) {
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
    let locationInDec ;
   if(sw == 2){
    locationInDec = hexToDec(memloc.value);
    locValue.value = memory[locationInDec];
   } else{
   locationInDec = hexToDec(memloc.value);
   locValue.value = memory[locationInDec+1];
}
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
 // A B C D E H L SP ---> 
 // 0 1 2 3 4 5 6 7 8 9
let start_index1 = hexToDec(start_index);
    for(let i =start_index1;i<memory.length;i++){
        if(memory[i] == "76"){
            //HLT
            return;
        }
      if(memory[i] == "3A"){
        //LDA
            let index = hexToDec(memory[i+2] + memory[i+1]);
            memory[0] = memory[index];
            SP =0;
            i = i+2;
            continue;
        }
       if(memory[i] == "6F"){
        // mov l,a
        memory[6] = memory[0];
        SP = 6;
       continue;
    }
    if(memory[i] == "01"){
        // LXI B, add
        memory[2] = memory[++i];
        memory[1] = memory[++i];

        continue;
        //pointer
        SP = 1;

    }
    if(memory[i] == "4D"){
        // MOV C,L
        memory[2] = memory[6]; 
        SP = 2;
       continue;
    }
    if(memory[i] == "0D"){
        //DCR C
        let temp = hexToDec(memory[2]);
        memory[2] = dectoHex(temp-1);
        SP = 2;
       continue;
    }
    if(memory[i] == "11"){
        //LXI D
        memory[4] = memory[++i];
        memory[3] = memory[++i];
        SP =3;
       continue;
    }
    if(memory[i] == "0A"){
       // LDAX B    LOAD THE CONTENTS OF LOACTION "WHICH IS STORED"IN BC PAIR 
         let address0 =memory[2] ; //---->C
         let address1 =memory[1] ; //---->B
         let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        memory[0] = memory[address];
        SP = 0;
       continue;
    }
    if(memory[i] == "12"){
        let address0 =memory[4] ; //---->C
        let address1 =memory[3] ; //---->B
        let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        //STAX D   STORE A IN MEMORY LOCATION POINTED BY DE REGISTER PAIR
        memory[address] = memory[0];
        SP = 3;
      continue;
    }
    if(memory[i] == "0B"){
        //DCX B
      let address0 =memory[2] ; //---->C
      let address1 =memory[1] ; //---->B
      let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        address--;
        memory[1] = dectoHex(parseInt(address/256, 10));
        memory[2] = dectoHex(address % 256);
       SP = 1;
    }
    if(memory[i] == "13"){
        //INX D
      let address0 =memory[4] ; //---->E
      let address1 =memory[3] ; //---->D
      let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        address++;
        memory[3] = dectoHex(parseInt(address/256, 10));
        memory[4] = dectoHex(address % 256);
       SP =3; 
    }
    if(memory[i] == "2D"){
        //DCR L
        memory[6] = dectoHex(hexToDec(memory[6])-1);
       SP = 6;
    }
    if(memory[i] == "C2"){
        // JNZ add
        let address0 =memory[++i] ; //---->C
        let address1 =memory[++i] ; //---->B
        let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        if(memory[SP] != 0){
            i = address-1;
            continue;
        }
    }  
    //------------------------------------------------
    if(memory[i]=="47"){
        // MOV B,A
        memory[1] = memory[0];
        SP = 1;
        continue;
    }

    if(memory[i]=="4F"){
        // MOV C,A
        memory[2] = memory[0];
        SP = 2;
        continue;
    }

    if(memory[i]=="78"){
        // MOV A.B
        memory[0] = memory[1];
        SP = 0;
        continue;
    }

    if(memory[i]=="32"){
        // STA ADDR
        let ind = hexToDec(memory[i+2] + memory[i+1]);

        memory[ind] = memory[0];
        SP = ind;
        i=i+2;
        continue;
    }

    if(memory[i]=="01"){
        // LXI B
        memory[2] = memory[i+1];
        memory[1] = memory[i+2];
        i = i+2;
        SP = 1;
        continue;
    }

    if(memory[i]=="11"){
        // LXI D
        memory[4] = memory[i+1];
        memory[3] = memory[i+2];
        i = i+2;
        SP = 4;
        continue;
    }

    if(memory[i]=="21"){
        // LXI H
        memory[6] = memory[i+1];
        memory[5] = memory[i+2];
        i = i+2;
        SP = 5;
        continue;
    }
    if(memory[i]=="26"){
        // MVI H,data
        memory[5] = memory[++i];
        SP = 5;
        continue;
    }
    if(memory[i]=="3E"){
        // MVI A
        memory[0] = memory[++i];
        SP = 0;
        continue;
    }
    if(memory[i]=="06"){
        // MVI B
        memory[1] = memory[++i];
        SP = 1;
        continue;
    }
    if(memory[i]=="0E"){
        // MVI C
        memory[2] = memory[++i];
        SP = 2;
        continue;
    }
    if(memory[i]=="16"){
        // MVI D
        memory[3] = memory[++i];
        SP = 3;
        continue;
    }
    if(memory[i]=="1E"){
        // MVI E
        memory[4] = memory[++i];
        SP = 4;
        continue;
    }
    if(memory[i]=="2E"){
        // MVI L
        memory[6] = memory[++i];
        SP = 6;
        continue;
    }
    if(memory[i] == "25"){
        //DCR H
            let v = hexToDec(memory[5]);
            memory[5] = dectoHex(v-1);
            SP = 6;
            continue;
    }
    if(memory[i] == "03"){
        //INX B
      let address0 =memory[2] ; //---->E
      let address1 =memory[1] ; //---->D
      let address = hexToDec(address1)*16*16 +hexToDec(address0 ) ;
        address++;
        memory[1] = dectoHex(parseInt(address/256, 10));
        memory[2] = dectoHex(address % 256);
        SP = 1;  
    }
 
   
   }


}

