function createStack() {
    const items = [];
    return {
        push(item) { 
           items.push(item); 
           console.log(items);
        },
        pop() {  
           items.pop();
           console.log(items);
        }
    }
}

const stack = createStack();


stack.push(10);    //[10]
stack.push(5);     //[10,5]
stack.push(3);     //[10,5,3] 
stack.pop();       //[10,5]

console.log(stack.items);  //undefined
/* Because of encapsulation, The stack items are not accessible outside the function. */