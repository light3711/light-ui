import axios from "axios"
import { UploadProps } from "./Upload"

//Math.roudn，四舍五入
//Math.ceil向上取整
//Math.floor()向下取整
//Math.pow()求幂
//Math.Max()求最大值
//Math.abs()求绝对值

export const usehandleChange=(props:Partial<UploadProps>)=>{
    const {onError,onProgress,onSuccess,action,e,fileInput,beforeUpload,onChangee} = props
    
    const Post = (f:File)=>{
        const formData = new FormData()
        formData.append(f.name,f)
        axios.post(action as string ,formData,{
            headers:{
              'Content-Type': 'multipart/form-data' 
            },
              onUploadProgress:(e)=>{
             let percentage = Math.round((e.loaded * 100) / e.total) || 0;
             //Math.roudn，四舍五入;
             //格式化成百分数 progress.loaded表示当前上传的数据大小，progress.total表示整个要上传的数据大小
                if (percentage<100) {
                    console.log(percentage);
                    if(onProgress){onProgress(percentage,f)}
                }
            }
        }).then(resp=>{
            console.log(resp.data,f,'resp');
            if (onSuccess) {
                onSuccess(resp.data,f)
            }
        }).catch(err=>{
            console.log(err,'err');
            if (onError) {
                onError(err,f)
            }
        })
    }
    
    const uploadFile = (files:FileList)=>{
        let postFiles = Array.from(files)
        postFiles.forEach(file=>{
            if (!beforeUpload) {
                Post(file)
            }
            else{
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then((file)=>{
                        Post(file)
                    })
                    if (onChangee) {
                        onChangee(file)
                    }
                }else{
                    if (result!==false) {
                        Post(file)
                    }
                    if (onChangee) {
                        onChangee(file)
                    }
                }
            }
        })

    }
     const files = e?.target.files
     if (!files) {
       return  
     }
     else{uploadFile(files)}
     if (fileInput?.current) {
         fileInput.current.value=''
     }

     
 }