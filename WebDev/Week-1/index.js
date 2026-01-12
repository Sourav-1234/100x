// function getLength(str){
//     console.log("Original String",str);
//     console.log("Length",str.length);

// }

// getLength("Hello World!");


// function findIndexOf(str,target){
//     console.log("Original String",str);
//     console.log("Index:",str.indexOf(target));

// }

// findIndexOf("hello world!","world");


// function lastIndexOf(str,target){
//     console.log("Original String",str);
//     console.log("Last Index",str.lastIndexOf(target));

// }

// lastIndexOf("Hello World! Hello ","Hello");






// const value="harkirat singh"
// let ans=value.substr(2,5)
// let ans2=value.slice(2,5)


// console.log(ans)
// console.log(ans2)



// function cutIt(str,startIndex,endIndex){
//     let newStr="";
//     for(let i=0;i<str.length;i++){
//         if(i>=startIndex && i<=endIndex){
//             newStr=newStr+str[i];

//         }
//     }
//     return newStr
// }

// let ans3=value.slice(2,5)
// console.log(ans3)

// console.log(cutIt(value,2,5));


// const initialArray=[1,2,3];
// const secondArray=[4,5,6];

// const finalArray=initialArray.concat(secondArray);
// console.log(finalArray)

// // initialArray.forEach()



// function logThing(str){
//     console.log(str);
// }
// console.log("Sourav");

// initialArray.forEach(logThing)


// logThing(1)
// logThing(2)
// logThing(3)


//Callback Function when a fucntion 

function log1(){
    console.log("hello world!");
}

function log2(){
    console.log("hello world 2");
}

function logcallback(fn){
    fn();
}

logcallback(log2);



//map,filter and find ,sort :

// class Animal{
//     constructor(name){
//         this.name=name
//     }
//     speak(){
//         console.log(`${this.name} makes a noise`);
//     }
// }

class Animal{
    constructor(name,legCount,speaks){
        this.name=name;
        this.legCount=legCount;
        this.speaks=speaks;
    }
    speak(){
        console.log("hi there "+ this.speaks);

    }
}


let dog=new Animal("dog",4,"bhow bhow");
dog.speak();




const currentDate=new Date();
console.log("Time in millisceonds sine 1970:" ,currentDate.getTime());


function calculateSum(){
    let a=0;
    for (let i=0;i<1000000;i++){
        a=a+i;
    }
    return a;
}


const beforeDate=new Date();
const beforeTimeinMs= beforeDate.getTime();

calculateSum();
  function currentTimePrint(){
    console.log(new Date().getTime());
  }

  setInterval(currentTimePrint,1000);


  const user ={
    name:"sourav",
    gender:"male",
  }

  const finalstring=JSON.stringify(user)
  console.log(finalstring);
  






  function findSum(n){
    let ans =0;
    for (let i=0;i<n;i++){
        ans+=i;
    }
    return ans;
  }


  ///Loops and Calbback and 
