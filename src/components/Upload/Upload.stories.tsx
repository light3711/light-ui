import React from "react";

import { action } from '@storybook/addon-actions'
import '../../style/index.scss'
import { Upload, UploadFile } from "./Upload"
import { Icon } from "../Icon/Icon"
import { Card } from "../Card/card";
import Button from "../Button";
import { RenderTitle } from "../../utils/renterTitle";

const beforeUpload = (file: File) => {
  if ((file.size / 1024) > 100) { alert('文件仅支持100kb以下'); return false }
  return true
}

const filePromise = (file: File) => {
  //新文件改名
  const newFile = new File([file], 'new File', { type: file.type })
  return Promise.resolve(newFile)
}

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 2234, name: '1.md', status: 'uploading', percent: 29 },
  { uid: '231', size: 234, name: '2.md', status: 'success', percent: 100 },
  { uid: '121', size: 22324, name: '3.md', status: 'error', percent: 50 },
]



export default {
  title: 'Upload 上传',
  component: Upload,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const Template = (args: any) => {


  return (
    <div>

      <Card title={RenderTitle('基础用法 点击上传','action')} >
        <Upload
          action='https://run.mocky.io/v3/24237cbd-0cf2-40f2-b7ad-9cb59261b8cd'
          onChangee={action('changed')}
          onRemove={action('remover')}
          // beforeUpload={beforeUpload}
          // name="filename"
          // data={{ 'key': 'value' }}
          // header={{ 'x-powered-by': 'GG' }}
          // accept=".png" //限定文件类型
        ><Button>
            上传
          </Button>

        </Upload>
      </Card>
      <Card title={RenderTitle('不同上传状态')} >
        <Upload
          action='https://run.mocky.io/v3/24237cbd-0cf2-40f2-b7ad-9cb59261b8cd'
          onChangee={action('changed')}
          onRemove={action('remover')}
          defaultFileList={defaultFileList}
        ><Button>
            上传
          </Button>

        </Upload>
      </Card>
      <Card title={RenderTitle('拖拽上传','dragger')} >
        <Upload
          action='https://run.mocky.io/v3/24237cbd-0cf2-40f2-b7ad-9cb59261b8cd'
          onChangee={action('changed')}
          onRemove={action('remover')}
          beforeUpload={beforeUpload}
          name="filename"
          data={{ 'key': 'value' }}
          header={{ 'x-powered-by': 'GG' }}
          defaultFileList={defaultFileList}
          // accept=".png" //限定文件类型
          dragger
        ><Icon icon="upload" size="2x" />
        </Upload>
      </Card>
    </div>


  )




}



export const Component = Template.bind({})
