let fs = require('fs');
let ignore = ['.git','node_modules','dist'];
let count=0;
function getFile(dir) {      
    fs.readdirSync(dir).forEach(function(filename){  
        let path = dir+"/"+filename  
        let stat = fs.statSync(path)
        let strpre = '';
        let str =strpre+'|--'; 
        if(ignore.indexOf(filename) == -1){
            console.log(str+filename);
            if (stat && stat.isDirectory()) {
                walk(path,'')
            }
        }
    })  
} 
function walk(dir,strpre){
    strpre = '    '+strpre;
    fs.readdirSync(dir).forEach(function(filename){  
        let path = dir+"/"+filename;
        let stat = fs.statSync(path); 
        let str =strpre+'|--'; 
        console.log(str+filename);
        if (stat && stat.isDirectory()) {
            walk(path,'    ')
        }
    }) 
}
let a = getFile('C:/surface/train/seeme')
//console.log(a);