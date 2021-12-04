const fs=require('fs')
const path=require('path')
function organizeFn(dirpath){
    //1. input of a directory path
     let destPath;
      if(dirpath == undefined){
          console.log("Please enter a directory path")
          return;
      }
      else{
        let doesExist= fs.existsSync(dirpath)
        //console.log(doesExist)
        if(doesExist == true){
            //2. create a organized files directory
            destPath = path.join(dirpath,'organized_files')
              //D:\DEV\test\organized_files
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath)
            }
            else{
                console.log('The folder already exists')
            }
        }
        else{
            console.log('Please enter a valid path')
        }
      }
  organizeHelper(dirpath , destPath)
}

function organizeHelper(src, dest){
    
    let childNames = fs.readdirSync(src)
    //console.log(childNames)

    for(let i=0 ; i<childNames.length ; i++){
        let childAddress= path.join(src,childNames[i])
        let isFile=fs.lstatSync(childAddress).isFile()

        if(isFile == true){
               let fileCategory= getCategory(childNames[i])
               console.log(childNames[i]+ 'belongs to '+fileCategory)
       
               sendFiles(childAddress,dest,fileCategory)
            }
    }

    
}

function getCategory(name){
   let ext=path.extname(name)
   //console.log(ext)
   ext = ext.slice(1)  // to remove the dots from the extension
   //console.log(ext)

   for(let type in types){
       let cTypeArr=types[type]
       //console.log(cTypeArr)
       for(let i=0;i<cTypeArr.length;i++){
           if(ext==cTypeArr[i]){
               return type
           }
       }
   }

   return "others"

}

function sendFiles(srcFilePath , dest, fileCategory){
    let catPath=path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)
    let destFilePath=path.join(catPath, fileName)
    fs.copyFileSync(srcFilePath,destFilePath)
    fs.unlinkSync(srcFilePath)

    console.log(fileName + "copied to"+ fileCategory)
}

module.exports={
    organizeKey : organizeFn
}