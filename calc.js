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
let done = 0;
let result;

//Enter numbers to the input area
function myValue(v) {
    if (done == 1) {
        clearresult()
    }
    if (v != ".") {
        document.getElementById("field").value += v;
    } else if (document.getElementById("field").value.includes(".")) {
        console.log("you have dot")
    } else {
        document.getElementById("field").value += v;
    }
}

function clearresult() {
    document.getElementById("field").value = null;
    done = 0
    fieldArray = [];
    newArray = [];
    his = -1;
}

//delete button
function valueDel() {
    let s = document.getElementById("field").value;
    p = s.slice(0, -1);
    document.getElementById("field").value = p;
}


//array calculation
function myFuncArray(z) {
    if (done == 0) {  // this function is used because the addition of the first calculation should not interfere with the continuations
        if (document.getElementById("field").value !== "") { //Empty values will not be written
            if (document.getElementById("field").value !== "-" && document.getElementById("field").value !== "+" && document.getElementById("field").value !== "*" && document.getElementById("field").value !== "/") {
                if(sih == -1) {
                    fieldArray.push(Number(document.getElementById("field").value));
                }
            }
        }
        let v = fieldArray.length
        if(v == 0 && (z == "sub" || z == "add" || z == "multi" || z == "divide")) {
            if(z == "sub") {
                document.getElementById("field").value = "-"
            } else if (z == "add") {
                document.getElementById("field").value = "+"
            } else {
            }
        } else {
            v--;
            if (document.getElementById("field").value !== "") { 
                switch (z) {
                    case "add":
                        fieldArray.push("+");
                        document.getElementById("field").value = null;
                    break;
                    case "sub":
                        fieldArray.push("-");
                        document.getElementById("field").value = null;
                    break;
                    case "multi":
                        fieldArray.push("*");
                        document.getElementById("field").value = null;
                    break;
                    case "divide":
                        fieldArray.push("/");
                        document.getElementById("field").value = null;
                    break;
                    default:
                    break;
                }
                his = fieldArray.length;
            } else if(fieldArray[v] == "+" || fieldArray[v] == "-" || fieldArray[v] == "*" || fieldArray[v] == "/") {
                if(document.getElementById("field").value !== "" || z == "add" || z == "sub" || z == "multi" || z == "divide"){
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
            
        //document.getElementById("field").value = null;
        console.log(fieldArray);
        newArray = fieldArray.slice(0)
        document.getElementById("display").innerHTML = fieldArray.join("")
    
    
        if (z == "eva" && document.getElementById("field").value !== "-" && document.getElementById("field").value !== "+" && document.getElementById("field").value !== "*" && document.getElementById("field").value !== "/") {
            if (document.getElementById("field").value !== "") {
                if(his != -1){
                    // This is used to edit the history
                    //if (document.getElementById("field").value !== "") {//this if condition may not be needed
                        //console.log(`history ${fieldArray}`)
                        //console.log(sih)
                        fieldArray.splice(sih, 1, Number(document.getElementById("field").value))
                        //console.log(`history ${fieldArray}`)
                        newArray = fieldArray.slice(0)
                        //console.log(newArray)
                        his = fieldArray.length;
                        his--;
                    //}
                }
                if (fieldArray[his] == "+" || fieldArray[his] == "-" || fieldArray[his] == "*" || fieldArray[his] == "/"){
                    fieldArray.pop();
                    newArray = fieldArray.slice(0)
                    bodmas()
                } else {
                    bodmas()
                }
            } else {
                fieldArray.pop()
                newArray = fieldArray.slice(0)
                bodmas()
            }
            document.getElementById("display").innerHTML = fieldArray.join("")
            console.log("your answer is " + newArray)
            //his = fieldArray.length;
            if (z == "eva") {
                document.getElementById("field").value = null;
            }
            //print on website
            if (newArray == "Infinity" || newArray == "-Infinity" || newArray == "NaN") {
                //document.getElementById("display").innerHTML = 'You cannot divide by "0" '
                document.getElementById("field").value = 'You cannot divide by "0" '
                newArray = []
            } else {
                //document.getElementById("display").innerHTML += "=" + newArray
                let decimals = (Number((Math.round(newArray*100))/100))
                newArray.pop()
                newArray.push(decimals)
                //console.log(newArray)
                document.getElementById("field").value = newArray
                document.getElementById("pastresult").innerHTML += "<br>" + fieldArray.join("") + "=" + newArray;
            }
            done = 1;
            his = fieldArray.length;
        }
        
        
    } else {
        result = newArray[0];
        if (document.getElementById("field").value === "") {
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
                document.getElementById("display").innerHTML = "Enter only Numbers"
                document.getElementById("field").value = null
            } else {
                //console.log("I will execute if I am a new calculation")
                fieldArray = [];
                newArray = [];
                his = -1;
                done = 0;
                fieldArray.push(Number(document.getElementById("field").value));
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
                document.getElementById("field").value = null;
            }
        } else {

        }
    }
}

function history(z) {
    if (fieldArray.length != 0) {
        if (z == "prev") {
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
        if (his == -1 || his == -2){
            his = 0
        }
        if (his >= fieldArray.length) {
            let t = fieldArray.length;
            t--;
            if (his%2 != 0) {
                t--;
            }
            his = t;
        }

        done = 0
        if (fieldArray[his] == "+" || fieldArray[his] == "-" || fieldArray[his] == "*" || fieldArray[his] == "/"){
            fieldArray.pop()
            //console.log("in history")
            //console.log(fieldArray)
            his--;
            document.getElementById("display").innerHTML = fieldArray.join("")
        } else {
            console.log(fieldArray[his]);
        }
        document.getElementById("field").value = fieldArray[his]
        //console.log(`his value is ${his}`)
        sih = his;
    }
}

function erase() {
    document.getElementById("field").value = ""
    document.getElementById("display").innerHTML = "";
    fieldArray = [];
    newArray = [];
    his = -1;
    done = 0;
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
            } 
        }
        //Multiplication
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "*"){
                newArray[--i] = newArray[i++] * newArray[++i];
                i--;
                newArray.splice(i,2);
            }
        }
        //Addition
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "+"){
                newArray[--i] = newArray[i++] + newArray[++i];
                i--;
                newArray.splice(i,2);
            }
        }
        //Subtraction
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === "-"){
                newArray[--i] = newArray[i++] - newArray[++i];
                i--;
                newArray.splice(i,2);
            }
        }
    }
}



    

    
