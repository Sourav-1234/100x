function calculateArithmetic(a,b,arithmeticFunction){
    const ans=arithmeticFunction(a,b);
    return ans;
}

function sum(a,b){
    return a+b;
}

const value=calculateArithmetic(20,30,sum);
console.log(value);


function greet(){
    console.log("hello alien");
}

setTimeout(greet,4*1000);

console.log("Sourav Saha");




function sum (num1,num2){
    let result=num1+num2;
    return result;
}