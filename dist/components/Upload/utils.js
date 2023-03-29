import axios from "axios";
//Math.roudn，四舍五入
//Math.ceil向上取整
//Math.floor()向下取整
//Math.pow()求幂
//Math.Max()求最大值
//Math.abs()求绝对值
export var usehandleChange = function (props) {
    var onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, action = props.action, e = props.e, fileInput = props.fileInput, beforeUpload = props.beforeUpload, onChangee = props.onChangee;
    var Post = function (f) {
        var formData = new FormData();
        formData.append(f.name, f);
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                //Math.roudn，四舍五入;
                //格式化成百分数 progress.loaded表示当前上传的数据大小，progress.total表示整个要上传的数据大小
                if (percentage < 100) {
                    console.log(percentage);
                    if (onProgress) {
                        onProgress(percentage, f);
                    }
                }
            }
        }).then(function (resp) {
            console.log(resp.data, f, 'resp');
            if (onSuccess) {
                onSuccess(resp.data, f);
            }
        }).catch(function (err) {
            console.log(err, 'err');
            if (onError) {
                onError(err, f);
            }
        });
    };
    var uploadFile = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                Post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (file) {
                        Post(file);
                    });
                    if (onChangee) {
                        onChangee(file);
                    }
                }
                else {
                    if (result !== false) {
                        Post(file);
                    }
                    if (onChangee) {
                        onChangee(file);
                    }
                }
            }
        });
    };
    var files = e === null || e === void 0 ? void 0 : e.target.files;
    if (!files) {
        return;
    }
    else {
        uploadFile(files);
    }
    if (fileInput === null || fileInput === void 0 ? void 0 : fileInput.current) {
        fileInput.current.value = '';
    }
};
