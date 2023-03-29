import React, { useState } from 'react'
import Icon from '../Icon';


interface ImgPropps {
  
  src:Array<{id:number;src:string}>
  currentIndex?:number
  onClose?:Function
}

export const Imgcontrol = (props:ImgPropps) => {

  const { src, currentIndex = 0, onClose } = props;
  const [index, setindex] = useState(currentIndex);
  const SCALE_MULTIPLE = 0.25;
  const ROTATE_MULTIPLE = 90;
  
  const [scale, setscale] = useState(1);
  const [rotate, setrotate] = useState(0);

  const handleRight = ()=>{
    index < src.length - 1 && setindex(index + 1);
    setscale(1);
    setrotate(0);
  }
  const handleLeft = ()=>{
    index !== 0 && setindex(index - 1);
    setscale(1);
    setrotate(0);
  }

  const handleRotateRight=()=>{
    setrotate(rotate + ROTATE_MULTIPLE);
  }
  const handleRotateLeft=()=>{
    setrotate(rotate - ROTATE_MULTIPLE);
  }

  const handleEnlarge=()=>{ //缩小
    if (scale < 0.75 ) {
      return
    }else{
      setscale(scale - SCALE_MULTIPLE);
    }
    
  }
  const handleClose=()=>{
    onClose && onClose()
  }
  const handleNarrow=()=>{  // 放大
    setscale(scale+ SCALE_MULTIPLE)
  }

  return (
    
    <div className="preview-container">
      <img className='preciew-img' src={src[index].src} 
      style={{transform:`scale(${scale}) rotate(${rotate}deg)`}} />

      <div className="preview-control">
        <ul className='preview-control-ul' >
          <li className='preview-control-icon' onClick={handleClose} >
            <Icon icon={'window-close'} size={'2x'} ></Icon>
          </li>
          <li className='preview-control-icon' >
          <Icon icon={'caret-left'} size={'2x'} onClick={handleRotateLeft} ></Icon>
          </li>
          <li className='preview-control-icon' >
            <Icon icon={'caret-right'} size={'2x'} onClick={handleRotateRight} ></Icon>
          </li>
          <li className='preview-control-icon' >
            <Icon icon={'search-minus'} size={'2x'} onClick={handleEnlarge} ></Icon>
          </li>
          <li className='preview-control-icon' >
            <Icon icon={'search-plus'} size={'2x'} onClick={handleNarrow} ></Icon>
          </li>
        </ul>
      </div>
      {
        <div className="img-dark" onClick={handleClose} ></div>
      }
      {
        src.length > 1 && (
          <div className='preview-aside-control'  >
            <div className="img-leftClick" onClick={handleLeft} >
              <Icon icon={'arrow-left'} >left</Icon>
            </div>
            <div className="img-rightClick" onClick={handleRight} >
              <Icon icon={'arrow-right'} ></Icon>
            </div>
          </div>
        )
      }

    </div>
    


  )
}
