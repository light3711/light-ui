import classNames from 'classnames'
import React, { useEffect, useState, forwardRef, createContext, ReactNode, useRef } from 'react'
import { styleType } from '../../utils/type'
import Icon from '../Icon'
import Input from '../Input'
import Select from '../Select'
import { Option } from '../Select/Select'

export interface PaginationProps extends styleType {
  /**
   * @total 数据总量
   */
  total?: number
  /**
   * @count 展示页左右翼数量
   */
  count?: number
  /**
   * @currentPage 初始页
   */
  currentPage?: number
  /**
   * @onClick current点击回调 返回current
   */
  onClick?: (e: number) => void
  /**
   * @inputJumper  input类型的跳转框
   */
  inputJumper?: boolean
  /**
   * @selectJumperOption select类型的跳转框
   */
  selectJumperOption?: number[]
  /**
   * @pageSize 每页数据量
   */
  pageSize?: number
  pageSelectOption?: number[]
  /**
   * @mini 开启mini模式
   */
  mini?: boolean
  /**
   * @prevCLick 上一页点击回调 
   */
  prevCLick?: (value: number) => void
  /**
   * @nextCLick 下一页点击回调 
   */
  nextCLick?: (value: number) => void
}


/**
 * 采用分页控制单页内的信息数量，也可进行页面跳转
 * ### 引用方法
 * 
 * ~~~js
 * import { Pagination } from "@light3711/lightui"
 * ~~~
 */

export const Pagination = forwardRef((props: PaginationProps, ref) => {

  const { total = 50, pageSize, count = 2, currentPage, onClick, pageSelectOption } = props



  const createPage = (t, cur, aroud) => {
    //出现省略号条件 total > baseCount - 2  展示内容 - prev next
    /**
     * @cur 展示页 
     */
    let result = []
    let baseCount = aroud * 2 + 1 + 2 + 2 + 2 //   < 1 ... aroud 1 aroud ... 100 >
    let surplus = baseCount - 4
    let startPosition = 1 + 2 + aroud + 1 // 首页 + 省略号最小值2 +cur左边
    let endPostion = t - 2 - aroud - 1

    if (t <= baseCount - 2) {
      result = Array.from({ length: t }, (v, i) => i + 1)
    } else {
      if (cur < startPosition) {
        result = [...Array.from({ length: surplus }, (v, i) => i + 1), "...", t]
      } else if (cur > endPostion) {
        result = [1, '...', ...Array.from({ length: surplus }, (v, i) => t - surplus + i + 1)]
      } else {
        result = [1, '...', ...Array.from({ length: aroud * 2 + 1 }, (v, i) => cur - aroud + i), '...', t]
      }
    }

    return result
  }
  const [current, setCurrent] = useState(currentPage ? currentPage : 1)
  const [shortTimevalue, setShortTimevalue] = useState(NaN)
  const [newPageSize, setNewPageSize] = useState(0)

  const newTotal = 'pageSize' in props ? (newPageSize !== 0 && (total / newPageSize)) : total
  
  useEffect(() => {
    setNewPageSize(pageSize)
  }, [pageSize])

  const cx = classNames('lig-pagination', {

  }, props.className)
  const minicx = classNames('lig-pagination', 'mini-pagination', {

  }, props.className)

  const handleClick = (value, more?: number) => {
    if (value === '...' && more < createPage(newTotal, current, count).length / 2) {
      setCurrent((state) => state - 5)
    } else if (value === '...' && more > createPage(newTotal, current, count).length / 2) {
      setCurrent((state) => state + 5)

    }
    else {
      setCurrent(value)
    }
    onClick && onClick(value)
  }

  const controlClick = (value) => {

    if (props.className && props.className.includes('transfer-pagination')) {
      if (value === 'prev') {
        if (current === 1) {
          return
        } else {
          setCurrent((state) => {
          props.prevCLick && props.prevCLick(state - 1)
            return state - 1

          })

        }
      }
      if (value === 'next') {
        if (current >= newTotal) {
          return
        } else { setCurrent((state) => {
          props.nextCLick && props.nextCLick(state + 1)
          return state + 1
        })
        
      }
      }
    } else {

      if (value === 'prev') {
        if (current <= 1) {
          return
        } else {
          setCurrent((state) => state - 1)
        }
      }
      if (value === 'next') {
        if (current >= newTotal) {
          return
        } else { setCurrent((state) => state + 1) }
      }

    }


  }

  const jumpChange = (value, card?: 'input' | 'select' | 'pageSelect' | 'miniInput') => {
    const _total = Math.ceil(pageSize ? total/ pageSize : total)
    
    if (card === 'input') {
      if (Number(value.target.value) > newTotal) {
        setCurrent(newTotal)
      } else if (value.keyCode === 13) {
        setCurrent(Number(value.target.value))
      }
    }
    if (card === 'miniInput') {
      if (Number(value) > _total) {
        setCurrent(_total)

      } else { setCurrent(value) }
    }

    if (card === 'select') {
      if (value > newTotal) {
        setCurrent(newTotal)
      } else if (value <= 1) {
        setCurrent(1)
      } else {
        setCurrent(Number(value))
      }
    }
    if (card === 'pageSelect') {
      setNewPageSize(value)
    }

  }


  return (
    <>
      {!props.mini ? <div className={cx} style={{ ...props.style }}>
        <ul className='pa-inner'>
          <div className={`pa-control ${current <= 1 ? 'nomore' : ''}`} onClick={() => controlClick('prev')}>
            <Icon icon={'angle-double-left'} ></Icon>
          </div>
          {createPage(newTotal, current, count).map((item, index) => {

            return (
              <li key={index} onClick={() => handleClick(item, index)}
                className={`pa-option ${current === item ? 'active' : ''}`}
              >{item}</li>
            )
          })}
          <div className={`pa-control ${current >= newTotal ? 'nomore' : ''}`} onClick={() => controlClick('next')} >
            <Icon icon={'angle-double-right'} ></Icon>
          </div>

          {
            props.selectJumperOption && <Select
              className={'pa-select'}
              onChange={(e) => jumpChange(e, 'select')} defaultValue='1' >
              {props.selectJumperOption && props.selectJumperOption.map((item) =>
                <Option key={item} >{item}</Option>)}
            </Select>
          }
          {
            pageSelectOption && <Select
              className={'pa-select'}
              value={`${newPageSize}条/页`}
              onChange={(e) => jumpChange(e, 'pageSelect')} defaultValue='1' >
              {props.pageSelectOption && props.pageSelectOption.map((item) =>
                <Option key={item} >{item}</Option>)}
            </Select>
          }
          {
            props.inputJumper && <>
              <p className='jumper'>前往</p> <Input
                className={'pa-input'}
                onKeyDown={(e) => jumpChange(e, 'input')} ></Input></>
          }
        </ul>


      </div>

        :

        <div className={minicx}>
          <div className={`pa-control ${current <= 1 ? 'nomore' : ''} mini`} onClick={() => controlClick('prev')}>
            <Icon icon={'angle-left'} ></Icon>
          </div>
          <Input
            value={shortTimevalue ? shortTimevalue : current}
            className='p-mini-input'
            onChange={(value)=>{
              setShortTimevalue(value as number)
            }}
            onBlur={(value) => {
              jumpChange(value, 'miniInput')
              setShortTimevalue(NaN)
            }}></Input>
          <div>/</div>
          <div className='p-mini-input' >{Math.ceil(newTotal)}</div>
          <div className={`pa-control ${current >= newTotal ? 'nomore' : ''} mini`}
           onClick={() => controlClick('next')} >
            <Icon icon={'angle-right'} ></Icon>
          </div>
        </div>}
    </>


  )
}

)
