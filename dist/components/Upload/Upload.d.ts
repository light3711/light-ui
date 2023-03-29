import React, { ChangeEvent, CSSProperties } from "react";
import { styleType } from "../../utils/type";
export interface UploadProps extends styleType {
    action?: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    e?: ChangeEvent<HTMLInputElement>;
    fileInput?: React.RefObject<HTMLInputElement>;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onChangee?: (file: File) => void;
    defaultFileList?: UploadFile[];
    onRemove?: (file: UploadFile) => void;
    header?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    /**
     * @accept 限定文件类型
     */
    accept?: string;
    progressStyle?: CSSProperties;
    dragger?: boolean;
    children?: any;
}
export declare type UploadFileState = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileState;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}
/**
 * 用户可传输文件或提交相应的内容
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from "@light3711/lightui"
 * ~~~
 */
export declare const Upload: {
    (props: UploadProps): JSX.Element;
    defaultProps: {
        name: string;
    };
};
export interface DraggerProps {
    onFile: (file: FileList) => void;
    children?: any;
}
