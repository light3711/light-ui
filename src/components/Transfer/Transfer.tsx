import React, { BaseSyntheticEvent, CSSProperties, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { styleType } from '../../utils/type';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Icon from '../Icon';
import Pagination from '../Pagination';
import { PaginationProps } from '../Pagination/Pagination';
import { useGetPageData } from '../../hooks/useGetPageData';


interface TransferData  {
  key:string,
  title:string
}
/**
 * @title Transfer
 */
export interface TransferProps extends styleType, Pick<PaginationProps, 'total' | 'pageSize'> {
  /**
   * @pagaintion 开启分页模式
   */
  pagaintion?: boolean
  /**
   * @sourceArray 左边源数据
   */
  dataSource?:TransferData[]
  /**
   * @sourceBtn 自定义左边按钮
   */
  sourceBtn?:any
  /**
   * @targetBtn 自定义右边按钮
   */
  targetBtn?:any
  /**
   * @sourceTitle 自定义左边标题
   */
  sourceTitle?:any
  /**
   * @targetTitle 自定义右边标题
   */
  targetTitle?:any
}

 
const data = new Array(10).fill(null).map((item,index)=>({
  key : `${index+1}`,
  title : `title${index+1}`
}))
/**
 * 两栏布局的多选组件，将元素从一栏即时移到另一栏
 * ### 引用方法
 * 
 * ~~~js
 * import { Transfer } from "@light3711/lightui"
 * ~~~
 */
export const Transfer = (props: TransferProps, ref) => {

  const {className,targetBtn,sourceBtn,targetTitle,sourceTitle} = props
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const [sourceArr, setSourceArr] = useState<TransferData[]>(data)
  const [targeArr, setTargeArr] = useState([])

  const [leftAllval, setLeftAllval] = useState(false)
  const [rightAllval, setRightAllval] = useState(false)

  const [sourceSelectKeys, setsourceSelectKeys] = useState<string[]>([]);  
  const [targetSelectKeys, settargetSelectKeys] = useState<string[]>([]);  

  const _dataSource = props.dataSource ? props.dataSource : data
  const pageSize = props.pageSize ? props.pageSize : 2
  
  
  useEffect(()=>{
    props.dataSource && setSourceArr(props.dataSource)
  },[props.dataSource])

  const cx = classNames('lig-transfer',{

  },className)

  const checkboxAllChange = (e, type: 'source' | 'target') => {

    switch (type) {
      case 'source':
        if (e) {
          setLeftAllval(true)
          setsourceSelectKeys([...sourceArr.map((item) => item.key)])
        } else {
          setLeftAllval(false)
          setsourceSelectKeys([])
        }
        break
      case 'target':
        if (e) {
          setRightAllval(true)
          settargetSelectKeys([...targeArr.map((item) => item.key)])
        } else {
          setRightAllval(false)
          settargetSelectKeys([])
        }
    }

  }


  const handleCheckboxChange = (e, key, type: 'source' | 'target') => {

    let sourceKeys: string[] = sourceSelectKeys
    let targetKeys: string[] = targetSelectKeys


    if (type === 'source') {
      if (e) {
        sourceKeys = [...sourceKeys, key]
      } else {
        sourceKeys = sourceKeys.filter((item) => item !== key)
      }
    }
    if (type === 'target') {

      if (e) {
        targetKeys = [...targetKeys, key]
      } else {
        targetKeys = targetKeys.filter((item) => item !== key)
      }

    }
    setsourceSelectKeys(sourceKeys)
    settargetSelectKeys(targetKeys)
  }


  const angelLeftBtn = () => {
    let sourceResult = []
    sourceResult = targeArr && targeArr.filter((item) => !targetSelectKeys.includes(item.key))
    setSourceArr([
      ...sourceArr,
      ..._dataSource.filter((item) => targetSelectKeys.includes(item.key))])

    setTargeArr(sourceResult)
    setRightAllval(false)
    settargetSelectKeys([])

  }
  const angelRightBtn = () => {
    let targetArrResult = []

    targetArrResult = [
      ...targeArr,
      ..._dataSource.filter((item) => sourceSelectKeys.includes(item.key))
    ]
    
    setTargeArr([...targetArrResult])
    setSourceArr(sourceArr.filter((item) => !sourceSelectKeys.includes(item.key)))
    setLeftAllval(false)
    setsourceSelectKeys([])
  }

  const targetBtnColor = targetSelectKeys.length > 0 ? { backgroundColor: '#0d6efd', color: 'white', border: 'solid 1px #21252900 ' }
    : { backgroundColor: 'white', color: '#adb5bd', border: 'solid 1px #adb5bd' }
  const sourceBtnColor = sourceSelectKeys.length > 0 ? { backgroundColor: '#0d6efd', color: 'white', border: 'solid 1px #21252900  ' }
    : { backgroundColor: 'white', color: '#adb5bd', border: 'solid 1px #adb5bd' }


  const { sourceResult: sourceResult, page: sourcePage, setPage: setSourcePage, newArray: newSourceArray } =
  useGetPageData(pageSize, sourceArr)
  const { sourceResult: targetResult, page: targetPage, setPage: setTargetPage, newArray: newTargetArray } =
  useGetPageData(pageSize, targeArr)
 
  const cloneBtn = (element,fun,style)=>{
     return React.cloneElement(element,{
      style,
      onClick:fun
     })
  }

  return (
    <>
      {
        !props.pagaintion ?
          <div className={cx}>
            {/* source */}
            <div className='t-content-wrapper'>
              <div className='t-content-header-wrapper'
              >

                {/* header */}
                <div className='t-content-header-control'>
                  <Checkbox
                    checked={leftAllval}
                    onChange={(value, e) => checkboxAllChange(value, 'source')}
                    children={sourceTitle ? sourceTitle : 'source'}
                    />
                <div className='t-content-title' >{`${sourceSelectKeys.length} / ${sourceArr.length}`}</div> 
                </div>
                
                {/* header */}

              </div>
              <div className='t-content' ref={leftRef}>
                {sourceArr.length ? (
                  sourceArr.map((source) => {
                    return (
                      <div className='t-content-item' key={source.key}>
                        <Checkbox
                          value={source.title}
                          checked={sourceSelectKeys.includes(source.key)}
                          onChange={(value, e) => {
                            handleCheckboxChange(value, source.key, 'source')
                          }}
                        >
                          {source.title}
                        </Checkbox>
                      </div>
                    )
                  })
                )

                  :
                  (<div className='noData'>暂无数据</div>)}
              </div>
            </div>

            {/* control */}
            <div className='t-control'>
              {sourceBtn ? cloneBtn(sourceBtn,angelRightBtn,sourceBtnColor) : <Button style={sourceBtnColor} size={'sm'} onClick={angelRightBtn}>
                <Icon icon={'angle-double-right'}></Icon></Button>}
              {
                targetBtn ? cloneBtn(targetBtn,angelLeftBtn,targetBtnColor) : <Button style={targetBtnColor} size={'sm'} onClick={angelLeftBtn}>
                <Icon icon={'angle-double-left'}></Icon></Button>
              }
            </div>

            {/* target */}

            <div className='t-content-wrapper'>
              <div className='t-content-header-wrapper'>

                {/* header */}
                <div className='t-content-header-control'>
                  <Checkbox
                    checked={rightAllval}
                    onChange={(value, e) => checkboxAllChange(value, 'target')}
                    children={targetTitle ? targetTitle : 'target'}
                    />
                <div className='t-content-title' >{`${targetSelectKeys.length} / ${targeArr.length}`}</div> 
                </div>
                {/* header */}

              </div>
              <div className='t-content' ref={rightRef}>
                {targeArr.length ? (
                  targeArr.map((target) => {
                    return (
                      <div className='t-content-item' key={target.key}>
                        <Checkbox
                          value={target.title}
                          checked={targetSelectKeys.includes(target.key)}
                          onChange={(value, e) => {
                            handleCheckboxChange(value, target.key, 'target')
                          }}
                        >
                          {target.title}
                        </Checkbox>
                      </div>
                    )
                  })
                )

                  :
                  (<div className='noData'>暂无数据</div>)}
              </div>

            </div>


          </div>

          :

          <div className={cx}>
            {/* source */}
            <div className='t-content-wrapper'>
              <div className='t-content-header-wrapper'
              >

                {/* header */}
                <div className='t-content-header-control'>
                  <Checkbox
                    checked={leftAllval}
                    onChange={(value, e) => checkboxAllChange(value, 'source')}
                    children={sourceTitle ? sourceTitle : 'source'}
                    />
                <div className='t-content-title' >{`${sourceSelectKeys.length} / ${sourceArr.length}`}</div> 
                </div>
                {/* header */}

              </div>
              <div className='t-content' >
                {sourceResult?.length ? (
                  sourceResult.map((source) => {
                    return (
                      <div className='t-content-item' key={source.key}>
                        <Checkbox
                          value={source.title}
                          checked={sourceSelectKeys.includes(source.key)}
                          onChange={(value, e) => {
                            handleCheckboxChange(value, source.key, 'source')
                          }}
                        >
                          {source.title}
                        </Checkbox>
                      </div>
                    )
                  })
                )

                  :
                  (<div className='noData'>暂无数据</div>)}
              </div>
              <Pagination mini total={sourceArr.length}
                currentPage={sourcePage}
                className={'transfer-pagination'}
                pageSize={pageSize}
                prevCLick={(v) => {
                  setSourcePage(v)
                }}
                nextCLick={(v) => {
                  setSourcePage(v)
                }}
              ></Pagination>
            </div>
            {/* control */}
            <div className='t-control'>
              {sourceBtn ? cloneBtn(sourceBtn,angelRightBtn,sourceBtnColor) : <Button style={sourceBtnColor} size={'sm'} onClick={angelRightBtn}>
                <Icon icon={'angle-double-right'}></Icon></Button>}
              {
                targetBtn ? cloneBtn(targetBtn,angelLeftBtn,targetBtnColor) : <Button style={targetBtnColor} size={'sm'} onClick={angelLeftBtn}>
                <Icon icon={'angle-double-left'}></Icon></Button>
              }
            </div>
            {/* target */}
            <div className='t-content-wrapper'>
              <div className='t-content-header-wrapper'>

                {/* header */}
                <div className='t-content-header-control'>
                  <Checkbox
                    checked={rightAllval}
                    onChange={(value, e) => checkboxAllChange(value, 'target')}
                    children={targetTitle ? targetTitle : 'target'}
                    />
                <div className='t-content-title' >{`${targetSelectKeys.length} / ${targeArr.length}`}</div> 
                </div>
                {/* header */}


              </div>
              <div className='t-content' ref={rightRef}>
                {targetResult?.length ? (
                  targetResult?.map((target) => {
                    return (
                      <div className='t-content-item' key={target.key}>
                        <Checkbox
                          value={target.title}
                          checked={targetSelectKeys.includes(target.key)}
                          onChange={(value, e) => {
                            handleCheckboxChange(value, target.key, 'target')
                          }}
                        >
                          {target.title}
                        </Checkbox>
                      </div>
                    )
                  })
                )

                  :
                  (<div className='noData'>暂无数据</div>)}
              </div>
              <Pagination mini total={targeArr.length}
                currentPage={targetPage}
                className={'transfer-pagination'}
                pageSize={pageSize}
                prevCLick={(v) => {
                  setTargetPage(v)
                }}
                nextCLick={(v) => {
                  setTargetPage(v)
                }}
              ></Pagination>
            </div>

          </div>


      }
    </>
  );

};
