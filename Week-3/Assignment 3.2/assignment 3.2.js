let name_1 = {
    firstName: "Virat",
    lastName: "kohli",
}

let name_2 = {
    firstName: "M S",
    lastName: "Dhoni",
    hometown: "Bihar"
}

let printFullName = function (hometown) {
    console.log(this.firstName + " " + this.lastName + " from " + hometown);
}
// Call method invokes the function directly by passing in the reference from the object which points to the this variable inside the function.
printFullName.call(name_1, "New Delhi"); 
printFullName.call(name_2, "Bihar");

// apply method is same as call, but it takes the second argument as the array list. 
printFullName.apply(name_1, ["New Delhi"]);
printFullName.apply(name_2, ["Bihar"]);

// Bind method gives a copy of the method which can be invoked later.
let printMyName_1 = printFullName.bind(name_1, "New Delhi");
printMyName_1();

let printMyName_2 = printFullName.bind(name_1, "Bihar");
printMyName_2();