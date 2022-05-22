function getNumber (){
   let num = Math.floor(Math.random()*100);
   
   console.log(`The random number is ${num}`);
   console.log('Promise is Pending and will be settled in 2 second');
   
   setTimeout(() => { 
        if (num % 5 == 0){
            console.log(`${num} is divisible by 5`);
            console.log("Hence Promise is resoved");
        }
        else {
            console.log(`${num} is not divisible by 5`);
            console.log("Hence Promise is rejected");
        }
    },2000);
};
   
getNumber();

