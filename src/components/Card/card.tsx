import classNames from 'classnames'
import React from 'react'
import { CSSProperties  } from 'react'
interface cardProps {
  classnames?: string
  title?: any
  contents?: boolean
  children?: React.ReactNode
  code?: string
  style?:CSSProperties
}

export const Card = (props: cardProps) => {

  const { classnames, title, contents,  children, code,style } = props


  const cx = classNames('lig-card', classnames, {
  })
  const creactPane = (code: string) => {
 
    return code.split(',')
  }

  return (
    <>
      {
        contents ?
          <div className='card-contents' style={{...style}} >
            <div className="card-head">
              {title}
            </div>
            <div className='card-code' >
              {
                code && creactPane(code)?.map((item, index) => {
                  return <div key={index} >{item}<span style={{ color: '#1EA7FD' }} >,</span></div>
                })
              }
            </div>

          </div>
          :
          <div className={cx}   >
            <div className="card-head">
              {title}
            </div>
            <div className='card-content' style={style}>
              {children}
            </div>

          </div>
      }

    </>
  )
}

Card.defaultProps = {
  title: '',
  contents: false
  
}
