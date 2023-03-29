import classNames from 'classnames'
import React, { useRef, useEffect, useState, cloneElement, useCallback } from 'react'
import { defaultType, styleType } from '../../utils/type'
import Icon from '../Icon'

export interface RatateProp extends styleType, Pick<defaultType, 'children' | 'onClick'> {
  /**
   *  总分
   */
  count?: number
  /**
   *  当前分数
   */
  value?: number
  /**
   *  只读模式
   */
  readOnly?: boolean
}


/**
 * 
 * 评分打星 ✨
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { Rate } from "@light3711/lightui"
 * ~~~
 */
export const Rate = (props: RatateProp) => {

  const { count, value, readOnly = false, className, style } = props

  const [starShowStatus, setStarShowStatus] = useState<Array<number | boolean | string>>([])
  const [logStarShowStatus, setLogStarShowStatus] = useState([])
  const [hasClick, setHasClick] = useState(false);
  const [toggle, setToggle] = useState(false);


  const cx = classNames('lig-rate', className, {
    'readOnly': readOnly
  })

  const _value = 'value' in props ? value : 2


  useEffect(() => {
    const initStar = [];
    for (let i = 0; i < _value; i++) {
      initStar[i] = true;
    }
    if (count > _value && initStar.length < count) {
      initStar.splice(initStar.length, 0, ...new Array(count - _value).fill(false));
    }
    setStarShowStatus(initStar);
    setLogStarShowStatus(initStar);
  }, []);
  const enterStar = (e: any, i: number) => {
    // 进入星星
    if (readOnly) return;
    const event = e;
    const mouseLeft = event.offsetX;
    setStarShowStatus((oldArr: any): Array<boolean | string> => {
      if (mouseLeft >= 8) {
        oldArr[i] = true;
      }
      for (let start = 0; start < i; start++) {
        oldArr[start] = true;
      }
      for (let start = i + 1; start < oldArr.length; start++) {
        oldArr[start] = false;
      }
      return JSON.parse(JSON.stringify(oldArr));
    });
  };

  const isSureNowStatus = () => {
    // 点击确认状态
    if (readOnly) return;
    setToggle(!toggle);
    if (hasClick && starShowStatus.toString() === logStarShowStatus.toString()) {
      setHasClick(false);
      setStarShowStatus((oldArr: any): Array<boolean | string> => {
        oldArr = oldArr.map((ra: any) => (ra = false));
        props.onClick &&
          props.onClick(
            oldArr.reduce((pre: number | string | boolean, next: number | string | boolean) => {
              // 统计分数
              if (pre === true) {
                pre = 1;
              } else if (pre === false) {
                pre = 0;
              }
              if (next === true) {
                next = 1;
              } else if (next === false) {
                next = 0;
              }
              return (pre as number) + (next as number);
            })
          );
        setLogStarShowStatus((oldArr: any): Array<boolean | string> => {
          // 清除
          oldArr = oldArr.map((ra: any) => (ra = false));
          return JSON.parse(JSON.stringify(oldArr));
        });
        return JSON.parse(JSON.stringify(oldArr));
      });
    }


    else {
      setLogStarShowStatus((oldArr: any): Array<boolean | string> => {
        // 更新历史数组
        oldArr = starShowStatus;
        return JSON.parse(JSON.stringify(oldArr));
      });
      setHasClick(true);
      props.onClick &&
        props.onClick(
          starShowStatus.reduce(
            (pre: number | string | boolean, next: number | string | boolean) => {
              if (pre === 'half') {
                pre = 0.5;
              } else if (pre === true) {
                pre = 1;
              } else if (pre === false) {
                pre = 0;
              }
              if (next === 'half') {
                next = 0.5;
              } else if (next === true) {
                next = 1;
              } else if (next === false) {
                next = 0;
              }
              return (pre as number) + (next as number);
            }
          )
        );
    }
  };

  const enterRate = () => {
    // 进入整个容器
    if (readOnly) return;
    setLogStarShowStatus((oldArr: any): Array<boolean | string> => {
      oldArr = starShowStatus;
      return JSON.parse(JSON.stringify(oldArr));
    });
  };

  const leaveRate = () => {
    // 离开整个容器
    if (readOnly) return;
    setStarShowStatus((oldArr: any): Array<boolean | string> => {
      oldArr = logStarShowStatus;
      return JSON.parse(JSON.stringify(oldArr));
    });
    setHasClick(false);
  };

  const starBg = useCallback(
    (i: number) => {
      return {
        color: starShowStatus[i] ? 'orange' : '#ccc'
        , transform: starShowStatus[i] && 'scale(1.2)'
      };
    },
    [starShowStatus]
  );


  const _child = <div>{props.children}</div>

  return (
    <div style={style} className={cx}>
      <div className="rate-container" style={{ display: 'flex' }} onMouseLeave={leaveRate} onMouseEnter={enterRate}>
        {new Array(count).fill('').map((ra, i) => {

          return (
            <div
              className="rate-box"
              key={i}
              onMouseMove={(event: any) => enterStar(event.nativeEvent, i)}
              onClick={isSureNowStatus}
            >
              {
                props.children ? React.cloneElement(_child, {
                  className: `rate-row ${readOnly ? 'readonly-rate-row' : ''}`,
                  style: starBg(i)
                }) :
                  <Icon
                    className={`rate-row ${readOnly ? 'readonly-rate-row' : ''}`}
                    style={starBg(i)}
                    icon={'star'}>
                  </Icon>
              }
            </div>
          );
        })}
      </div>
    </div>
  )
}

