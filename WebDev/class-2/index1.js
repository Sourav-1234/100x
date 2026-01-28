

const expenses = {
  food: [10, 20, 30],
  travel: [5, 15],
  bills: [40, 60]
};

const result = {};

for (const category in expenses) {
  result[category] = expenses[category].reduce((sum, value) => sum + value, 0);
}

console.log(result)



const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const count = {};

for (const fruit of fruits) {
  count[fruit] = (count[fruit] || 0) + 1;
}


console.log(count);



// 3.Swap keys and values of object
function swapKeysAndValues(obj) {
  const result = {};

  for (const key in obj) {
    const value = obj[key];
    result[value] = key;
  }

  return result;
}

// Example usage
const input = { a: "x", b: "y", c: "z" };
console.log(swapKeysAndValues(input));



function findLargestValueKey(obj){
  let maxKey= null;
  let maxValue= -Infinity;


  for(const key in obj){
    if(obj[key]>maxValue){
      maxValue =obj[key];
      maxKey=key;

    }
  }
  return maxKey;
}


const input1 ={a:10,b:50,c:20};
console.log(findLargestValueKey(input1));



//Flatten object of arrays into ne array

function flattenObjectArrays(obj){
  const result=[];

  for (const key in obj){
    result.push(...obj[key]);
  }
}

const input3 = {
  fruits: ["apple", "banana"],
  veggies: ["carrot", "pea"]
};

console.log(flattenObjectArrays(input3));


function groupNamesByCity(arr){
  const result= {};
    for(const {name ,city } of arr){
      if(!result[city]){
        result[city]= [];

      }
      result[city].push(name);
    }
    return result;
}


const input4 = [
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
];

console.log(groupNamesByCity(input4));




function filterValuesGreaterThan50(obj){
  const result={};


  for(const key in obj){
    if(obj[key]>50){
      result[key] =obj[key];
    }
  }
  return result ;
}


const input5 = { a: 20, b: 60, c: 40, d: 90 };
console.log(filterValuesGreaterThan50(input5));


////Largest Value of the Array


function highestAverageStudent(obj) {
  let topStudent = null;
  let highestAvg = -Infinity;

  for (const student in obj) {
    const marks = obj[student];
    const avg =
      marks.reduce((sum, m) => sum + m, 0) / marks.length;

    if (avg > highestAvg) {
      highestAvg = avg;
      topStudent = student;
    }
  }

  return topStudent;
}


const input6 = { A: [80, 90], B: [70, 75, 85] };
console.log(highestAverageStudent(input6)); // 


function pickKeys(obj, keys) {
  const result = {};

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

// Example usage
const inputObj = { name: "Rahul", age: 23, city: "Noida" };
const keys = ["name", "city"];

console.log(pickKeys(inputObj, keys));





const obj={a:10,b:50,c:20};

const maxKey= Object.keys(obj).reduce((a,b) =>
obj[a]>obj[b]?a:b);

console.log(maxKey);




const data ={
    fruits: ["apple", "banana"], 
        veggies: ["carrot", "pea"] 
};

const mergedArray= [];


for(const key in data){
    mergedArray.push(...data[key])
}

console.log(mergedArray);





const data1 = [
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
];



const result1 = {};

for (const person of data1) {
  const { name, city } = person;

  if (!result1[city]) {
    result1[city] = [];
  }

  result1[city].push(name);
}

console.log(result1);


const ob={a:20,b:60,c:40,d:90};

for(const key in ob){
   if(ob[key]>50){
    console.log(key,ob[key]);
   }
}