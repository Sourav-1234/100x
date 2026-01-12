// // let str="h";
// // const binaryRepresentation = new TextEncoder().encode(str);


// // console.log(binaryRepresentation);


// // var a=123123412;


// //const binaryRepresentation2 =[104];


// // const publicKey="E";


// // const bytes =new TextEncoder().encode(publicKey)

// // const name="harkirat";





// // console.log(bytes);








// // const arr= new Uint8Array([1919]);

// // console.log(arr);








// function arrayToHex(byteArray){
//     let hexString = '';
//     // ['h','e','l','l','o']
//     for (let i=0;i<byteArray.length;i++){

//         hexString += byteArray[i].toString(16).padStart(2,'0');
//     }
//     return hexString;
// }



// const str= "hello";

// const byteArray= new Uint8Array([72,101,108,108,111]);
// const byteArray1= new Uint8Array([45,101,108,108,111]);
// const byteArray2 = new TextEncoder().encode(str);


// const hexString =arrayToHex(byteArray);

// console.log(hexString);




// const Uint8Array = new Uint8Array([72,101,108,108]);
// const base64Encoded= ArrayBuffer.from(Uint8Array).toString("base64")
// console.log(base64Encoded);



 const crypto =require('crypto');

//Note The Problem can be solved using the 00000 prefix by changing the inputStr acordingly



 function findHashWithPrefix(prefix){
     let input =0;
     while(true){
        let inputStr= `harkirat => Raman | Rs 100
Ram => Ankit | Rs 10`+input.toString();
        let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
        if(hash.startsWith(prefix)){
            return {input:inputStr,hahs:hash};
        }
        input++;
     }
 }

 const result = findHashWithPrefix('00000');
 console.log(`Input :${result.input}`);
 console.log(`Hash:${result.hash}`);















