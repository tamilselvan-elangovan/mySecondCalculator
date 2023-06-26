let x = 0;
let a = null;
let symsim = "0";
let symcom = "0";
let sa = "0";
let sm = "0";
let exp = [];
let total = [];
let field;
let fieldArray = [];
let newArray = [];
let his = -1;
let sih = -1;
let sh = -1
let si = -1;
let done = 0;
let result;
let hisdel;

//Enter numbers to the input area
function myValue(v) {
    if (done == 1) {
        clearresult()
    }
    if (v != ".") {
        document.getElementById("field").innerHTML += v;
    } else if (document.getElementById("field").innerHTML.includes(".")) {
        console.log("you have dot")
    } else {
        document.getElementById("field").innerHTML += v;
    }
}

function clearresult() {
    document.getElementById("field").innerHTML = null;
    done = 0
    fieldArray = [];
    newArray = [];
    his = -1;
}

//delete button
function valueDel() {
    let s = document.getElementById("field").innerHTML;
    p = s.slice(0, -1);
    document.getElementById("field").innerHTML = p;
    if (done == 1) {  /*once the expression is evaluated the value will be displayed in the field for 
        further operation if you press a number it will automatically overwrite but if you click del only 
        1 character will be deleted in order to rectify it this if statement is checked*/
        document.getElementById("field").innerHTML = ""
    }
}


//array calculation
function myFuncArray(z) {
    if (done == 0) {  // this function is used because the addition of the first calculation should not interfere with the continuations
        if (document.getElementById("field").innerHTML !== "") { //Empty values will not be written
            if (document.getElementById("field").innerHTML !== "-" && document.getElementById("field").innerHTML !== "+" && document.getElementById("field").innerHTML !== "*" && document.getElementById("field").innerHTML !== "/") {
                if(sh == -1) {
                    fieldArray.push(Number(document.getElementById("field").innerHTML));
                }
            }
        }
        
        let v = fieldArray.length
        if(v == 0 && (z == "sub" || z == "add" || z == "multi" || z == "divide")) {
            if(z == "sub") {
                document.getElementById("field").innerHTML = "-"
            } else if (z == "add") {
                document.getElementById("field").innerHTML = "+"
            } else {
            }
        } else {
            v--;
            if (document.getElementById("field").innerHTML !== "") { 
                switch (z) {
                    case "add":
                        fieldArray.push("+");
                        document.getElementById("field").innerHTML = null;
                    break;
                    case "sub":
                        fieldArray.push("-");
                        document.getElementById("field").innerHTML = null;
                    break;
                    case "multi":
                        fieldArray.push("*");
                        document.getElementById("field").innerHTML = null;
                    break;
                    case "divide":
                        fieldArray.push("/");
                        document.getElementById("field").innerHTML = null;
                    break;
                    default:
                    break;
                }
                if (his != -1) {
                    sh = -1
                    si = sih
                    sih = -1
                }
                his = fieldArray.length;
            } else if(fieldArray[v] == "+" || fieldArray[v] == "-" || fieldArray[v] == "*" || fieldArray[v] == "/") {
                if(document.getElementById("field").innerHTML !== "" || z == "add" || z == "sub" || z == "multi" || z == "divide"){
                    //console.log("i am executed")
                    fieldArray.pop()
                    switch (z) {
                        case "add":
                            fieldArray.push("+");
                        break;
                        case "sub":
                            fieldArray.push("-");
                        break;
                        case "multi":
                            fieldArray.push("*");
                        break;
                        case "divide":
                            fieldArray.push("/");
                        break;
                        default:
                        break;
                    }
                }
                
                his = fieldArray.length;
            } else {
            }
        }
            
        //document.getElementById("field").innerHTML = null;
        v = fieldArray.length
        console.log(fieldArray);
        newArray = fieldArray.slice(0)
        if (v > 1 ) {
            document.getElementById("display").innerHTML = fieldArray.join("")
            his = fieldArray.length;
            his--;
        }
    
        if (z == "eva" && document.getElementById("field").innerHTML !== "-" && document.getElementById("field").innerHTML !== "+" && document.getElementById("field").innerHTML !== "*" && document.getElementById("field").innerHTML !== "/") {
            if (document.getElementById("field").innerHTML !== "") {
                if(si != -1){
                    // This is used to edit the history
                    //if (document.getElementById("field").innerHTML !== "") {//this if condition may not be needed
                        //console.log(`history ${fieldArray}`)
                        //console.log(sih)
                        fieldArray.splice(si, 1, Number(document.getElementById("field").innerHTML))
                        //console.log(`history ${fieldArray}`)
                        newArray = fieldArray.slice(0)
                        //console.log(newArray)
                        his = fieldArray.length;
                        his--;
                        sih = -1
                    //}
                }
                if (fieldArray[his] == "+" || fieldArray[his] == "-" || fieldArray[his] == "*" || fieldArray[his] == "/"){ //checks whether the given Equation has any operation at the last and pops it if so
                    fieldArray.pop();
                    newArray = fieldArray.slice(0)
                    bodmas()
                } else {
                    bodmas()
                }
            } else if (hisdel !== undefined) {   // check whether the value is deleted during the history check and left it blank for calculation  1+ +3 => 1+2+3
                document.getElementById("field").innerHTML = hisdel
                newArray = fieldArray.slice(0)
                bodmas()
            } else {   // during the calculation the last unassigned operation will be deleted  1+2+3+  => 1+2+3
                fieldArray.pop()    
                newArray = fieldArray.slice(0)
                bodmas()
            }
            //his = fieldArray.length;
            if (z == "eva" && v > 1) {
                document.getElementById("display").innerHTML = fieldArray.join("")
                console.log("your answer is " + newArray)
                document.getElementById("field").innerHTML = null;
            }
            //print on website
            if (newArray == "Infinity" || newArray == "-Infinity" || newArray == "NaN") {
                //document.getElementById("display").innerHTML = 'You cannot divide by "0" '
                document.getElementById("field").innerHTML = 'You cannot divide by "0" '
                newArray = []
            } else if (v > 1) {
                //document.getElementById("display").innerHTML += "=" + newArray
                let decimals = (Number((Math.round(newArray*100))/100))
                newArray.pop()
                newArray.push(decimals)
                //console.log(newArray)
                document.getElementById("field").innerHTML = newArray
                document.getElementById("pastresult").innerHTML += "<br>" + fieldArray.join("") + "=" + newArray;
            } else {

            }
            done = 1;
            his = fieldArray.length;
            sh = -1
        }
        
        
    } else {
        result = newArray[0];
        if (document.getElementById("field").innerHTML === "") {
            if (z == "add" || z == "sub" || z == "multi" || z == "divide") {
                fieldArray = [];
                newArray = [];
                his = -1;
                done = 0;
                fieldArray.push(result)
                switch (z) {
                    case "add":
                        fieldArray.push("+");
                    break;
                    case "sub":
                        fieldArray.push("-");
                    break;
                    case "multi":
                        fieldArray.push("*");
                    break;
                    case "divide":
                        fieldArray.push("/");
                    break;
                }
                document.getElementById("display").innerHTML = fieldArray.join("");
            }
        } else if(z !== "eva") {
            if (result == undefined){
                //document.getElementById("display").innerHTML = "Enter only Numbers"
                document.getElementById("field").innerHTML = "Enter only Numbers"
            } else {
                //console.log("I will execute if I am a new calculation")
                fieldArray = [];
                newArray = [];
                his = -1;
                done = 0;
                fieldArray.push(Number(document.getElementById("field").innerHTML));
                switch (z) {
                    case "add":
                        fieldArray.push("+");
                    break;
                    case "sub":
                        fieldArray.push("-");
                    break;
                    case "multi":
                        fieldArray.push("*");
                    break;
                    case "divide":
                        fieldArray.push("/");
                    break;
                    default:
                    break;
                }
                document.getElementById("display").innerHTML = fieldArray.join("");
                document.getElementById("field").innerHTML = null;
            }
        } else {

        }
    }
}

function history(z) {
    if (fieldArray.length != 0) {
        if (fieldArray[his] == "+" || fieldArray[his] == "-" || fieldArray[his] == "*" || fieldArray[his] == "/"){  //this statement checks whether the fieldArray has a "+"||"-"||"*"||"/" is hanging on the last and delete it if so
            fieldArray.pop()
            //console.log("in history")
            //console.log(fieldArray)
            //his--;
            document.getElementById("display").innerHTML = fieldArray.join("")
        } else {
        }


        if (z == "prev") {  //this statement checks whether the pre or next button is clicked
            his--;
            if (his%2 != 0) {
                his--;
            }
        } else {
            his++;
            if (his%2 != 0) {
                his++;
            }
        }
        if (his == -1 || his == -2){  //this statement checks and restrict the preve button to stop at the minimum of fieldArray.length
            his = 0
        }
        if (his >= fieldArray.length) { //this statement checks and restrict the Next button to stop at the maximum of fieldArray.length
            let t = fieldArray.length;
            t--;
            if (his%2 != 0) {
                t--;
            }
            his = t;
        }
        done = 0

        document.getElementById("field").innerHTML = fieldArray[his]
        //console.log(`his value is ${his}`)
        sih = his;
        hisdel = fieldArray[his]
        console.log(`i AM ${his}`)
        console.log(hisdel)
        sh = his;   // this value helps to neglect the value to be added on the last which was given during the history alteration.
    }
}

function erase() {
    document.getElementById("field").innerHTML = ""
    document.getElementById("display").innerHTML = "";
    fieldArray = [];
    newArray = [];
    his = -1;
    done = 0;
    sh = -1
    sih = -1
}

function bodmas() {
    //check the expression and evaluate in DMAS procedure
    for (let a = 0; a < newArray.length; a++) {
        //Division
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "/") {
                newArray[--i] = newArray[i++] / newArray[++i];
                i--;
                newArray.splice(i,2);
                i--;
            } 
        }
        //Multiplication
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "*"){
                newArray[--i] = newArray[i++] * newArray[++i];
                i--;
                newArray.splice(i,2);
                i--;
            }
        }
        //Addition
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "+"){
                newArray[--i] = newArray[i++] + newArray[++i];
                i--;
                newArray.splice(i,2);
                i--
            }
        }
        //Subtraction
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "-"){
                newArray[--i] = newArray[i++] - newArray[++i];
                i--;
                newArray.splice(i,2);
                i--
            }
        }
    }
}



    

    
