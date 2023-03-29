import React, { ChangeEvent, CSSProperties } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import Icon from "../Icon";
import Progress from "../Progress";
import classNames from "classnames";
import { styleType } from "../../utils/type";

export interface UploadProps extends styleType {
    action?:string
    onProgress?:(percentage:number,file:File)=>void //百分比，上传内容
    onSuccess?:(data:any,file:File)=>void
    onError?:(err:any,file:File)=>void
    e?:ChangeEvent<HTMLInputElement>
    fileInput?:React.RefObject<HTMLInputElement>
    beforeUpload?:(file:File)=>boolean | Promise<File>
    onChangee?:(file:File) => void
    defaultFileList?:UploadFile[]
    onRemove?:(file:UploadFile)=>void
    header?:{[key:string]:any} 
    name?:string
    data?:{[key:string]:any}
    withCredentials?:boolean
    /**
     *  限定文件类型
     */
    accept?:string
    progressStyle?:CSSProperties
    dragger?:boolean
    children?:any
}

export type UploadFileState = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile{
    uid:string
    size:number
    name:string
    status?: UploadFileState
    percent:number 
    raw?:File
    response?:any
    error?:any
}


/**
 * 用户可传输文件或提交相应的内容
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from "@light3711/lightui"
 * ~~~
 */

export  const Upload=(props:UploadProps)=>{
    
    const {action,onProgress,onSuccess,onError,beforeUpload
        ,onChangee,defaultFileList,onRemove
        ,name,header,data,withCredentials
        ,accept ,children,dragger
    } = props
    const [fileList,setFileList] = useState<UploadFile[]>( defaultFileList||[])
    const fileInput = useRef<HTMLInputElement>(null)
    const updateFileList = (updateFile:UploadFile,updateObject:Partial<UploadFile>)=>{
        setFileList((f)=>{
            return f.map((item)=>{
                if (item.uid === updateFile.uid ) {
                    return {...item,...updateObject}
                }
                else{
                    return item
                }
                
            })
        })
    }

    const handleClick = ()=>{ //以按钮替代input
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
     const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
       
       
         const files = e?.target.files
         if (!files) {
           return  
         }
         else{uploadFile(files)}
         if (fileInput?.current) {
             fileInput.current.value=''
         }
    
         
     }

     const handleRemove = (file:UploadFile)=>{ //删除
         setFileList((e)=>{
             return e.filter(item=>item.uid!==file.uid)
         })
         if (onRemove) {
             onRemove(file)
         }
     }

     const Post = (f:File)=>{
        const _FileData:UploadFile = {
            uid:Date.now()+'upload-file'
            ,status:'ready'
            ,size:f.size
            ,name:f.name
            ,percent:0
            ,raw:f
        }
       setFileList(p=>{
           return[_FileData,...p]
       }) 
        const formData = new FormData()
        formData.append(name||'file',f)
        if (data) {
            Object.keys(data).forEach(key=>{
                formData.append(key,data[key])
            })
        }
        axios.post(action as string ,formData,{
            headers:{
                
              'Content-Type': 'multipart/form-data' ,
              ...header,
            },
            withCredentials,
              onUploadProgress:(e)=>{
             let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 101) {
               updateFileList(_FileData,{percent:percentage,status:'uploading'})
                    if(onProgress){onProgress(percentage,f)}
                }
            }
        }).then(resp=>{
            
           updateFileList(_FileData,{status:'success',response:resp.data})

            if (onSuccess) {
                onSuccess(resp.data,f)
            }
        }).catch(err=>{
           updateFileList(_FileData,{status:'error',response:err.data})
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

    const renderUploadList = () =>{
        return (<>
            <div>
    
            {fileList?.map((e)=>(
            <div className='upload-list' key={e.uid} >
            <Icon icon={'file-alt'} theme='secondary' />
            <span className={`upload-list-title`} > {e.name} </span>
    
            <span className='file-status' >
            {(e.status === 'uploading' || e.status === 'ready') &&
            <Icon className='file-status-icon' icon="spinner" spin theme="primary" />}
            {e.status === 'success' && 
            <Icon className='file-status-icon' icon="check-circle" theme="success" />}
            {e.status === 'error' &&
            <Icon className='file-status-icon' icon="times-circle" theme="danger" />}
          
            
            <span className='file-status-x'><Icon icon='times' color="#6c757d" onClick={()=>{handleRemove(e)}} ></Icon></span>
            </span>
           
           
            <Progress style={props.progressStyle} className='upload-p' percent={e.percent} showText={true}></Progress>
            
             </div>
             ))}
            </div>
             
             </>
        )
    }


    return (
        <div style={props.style}>
        <div className="lig-upload" >
            <div onClick={handleClick} className="upload-dragger"  >  
            <input
            accept={accept}
            type='file' onChange={handleChange} style={{display:'none'}}
             className="upload-input" ref={fileInput} />

             {
                 dragger ? <Dragger onFile={(files)=>{uploadFile(files)}} >
                     {children}
                    </Dragger> : children
             }

             </div>
             
        </div>
        {renderUploadList()}
        </div>
        
    )
}
 
export interface DraggerProps {
    onFile:(file:FileList)=>void
    children?:any
}

const Dragger  = (props:DraggerProps)=>{
    const {onFile,children} = props

    const [dragOver,setDragOver] = useState(false)

    const klass = classNames('lig-dragger',{
        'is-dragger':dragOver
    })

    const handleDragger = (e:React.DragEvent<HTMLElement>,over:boolean)=>{
        e.preventDefault()
        setDragOver(over)
    }

    const handleDrop = (e:React.DragEvent<HTMLElement>)=>{
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files) 
    }

    return(
        <div className={klass}
         onDragOver={e=>{handleDragger(e,true)}}
         onDragLeave={e=>{handleDragger(e,false)}}
         onDrop={handleDrop}
          >
         {children}
        </div>
    )

}


Upload.defaultProps={
    name:'file'
}

