import react, {useRef, useEffect, useState} from 'react';

const CANVAS_SIZE = 500;

const ImageSizes = {
  1: {h: 500, w: 400},
  2: {h: 500, w: 500},
  3: {h: 300, w: 500},
}

const ImageFilters = {
  1: "none",
  2: "blur",
  3: "grayscale",
  4: "contrast"
}

const initCanvas = (c, imageSize) => {
  // https://gist.github.com/joubertnel/870190
  const imageHSize = ImageSizes[imageSize].h;
  const imageWSize = ImageSizes[imageSize].w;

  const ctx = c.getContext('2d');
  if (window.devicePixelRatio) {
    const width = c.width;
    const height = c.height;
    c.width = imageWSize * window.devicePixelRatio;
    c.height = imageHSize * window.devicePixelRatio;
    c.style.width = `${imageWSize}px`;
    c.style.height = `${imageHSize}px`;
    c.style.borderRadius = '5px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
};

const getMousePos = (e, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const mousePos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
  return mousePos;
};

const findCorsorIndexFromMousePos = (ctx, mousePos, text, textRect, fontSize, font) => {
  ctx.font = `${fontSize}px ${font}`;
  const [lines, indexMap] = splitTextToLines(ctx, textRect.w, text);
  let cursor;

  lines.forEach((line, lineIndex) => {
    const x = textRect.x + 10;
    const y = fontSize * (lineIndex + 1) * 1.3 + textRect.y;
    if (mousePos.y <= y && mousePos.y >= y - fontSize * 1.3) {

      line.split('').forEach((char, i) => {
        const wd0 = ctx.measureText(line.slice(0, i)).width;
        const wd1 = ctx.measureText(line.slice(0, i+1)).width;
        const curX = mousePos.x - x;
        if (curX >= wd0 && curX <= wd1) {
          cursor = indexMap[lineIndex][i];
        }
      });
    }
  });
  return cursor;
};

const findPositionFromCursorIndex = (ctx, cursor, fontSize, font, text, textRect) => {
  ctx.font = `${fontSize}px ${font}`;
  const [lines, indexMap] = splitTextToLines(ctx, textRect.w, text);
  let pos = { x: 0, y: 0, h: 1 }

  indexMap.forEach((line, lineIndex) => {

    if(line.indexOf(cursor) != -1){
      const cursorIndex = line.indexOf(cursor);
      //커서가 라인의 첫번째 일 때
      if (cursorIndex === 0) {
        pos.x = textRect.x + 10;
      }
      //커서가 라인의 마지막 일 때
      else if (cursorIndex === line.length - 1) {
        pos.x = ctx.measureText(lines[lineIndex].slice(0, cursorIndex)).width + textRect.x + 10;
      }
      //나머지 위치
      else {
        pos.x = ctx.measureText(lines[lineIndex].slice(0, cursorIndex)).width + textRect.x + 10;
      }
      pos.y = fontSize + (fontSize * 1.3 * lineIndex) + textRect.y - fontSize * 0.9;
      pos.h = fontSize * 1.1;
    }
  });

  return pos;
};

const drawCursor = (ctx, cursor, fontSize, font, text, textRect) => {

  const pos = findPositionFromCursorIndex(ctx, cursor, fontSize, font, text, textRect);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#0092d1" ;

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(pos.x, pos.y + pos.h);
  ctx.stroke();
};

//text split to lines fitting with textRect width
const splitTextToLines = (ctx, maxWidth, text) => {
  const words = text.split(' ');
  let lines = [''];
  let indexMap = [];

  let globalIndex = 0;

  words.forEach((word, i) => {

    const lastIndex = lines.length - 1;
    let lastLine = lines[lastIndex];
    const newText = lastLine.length === 0 ? word : lastLine + ' ' + word;

    //word를 현재 textline에 추가하면 지정된 길이를 초과하는지 검사
    if (ctx.measureText(newText).width <= maxWidth){

      //newText에 개행문자가 포함되어 있는지 검사;
      const splitedNewText = newText.split('\n');
      if (splitedNewText.length !== 1){

        splitedNewText.map((word, i) => {
          if(i === 0){
            lines[lastIndex] = splitedNewText[i];
          } else {
            lines.push(splitedNewText[i]);
          }
          if(i !== splitedNewText.length){
            indexMap.push((lines[lastIndex + i] + ' ').split('').map((char) => globalIndex++));
          }
        });
      } else {
        lines[lastIndex] = newText;

      }
    } else {
      lines.push(word);
      indexMap.push((lines[lastIndex] + ' ').split('').map((char) => globalIndex++));
    }
  });
  indexMap.push((lines[lines.length-1] + ' ').split('').map((char) => (globalIndex++)));
  return [lines, indexMap];
}

//calculate text line start position in canvas react
//x margin 10, y margin 10
const positionEachLines = (textRect, fontSize, index) => {
  const spaced = fontSize * 1.3;
  return {x: textRect.x+10, y: fontSize + (spaced * index) + textRect.y};
};

// image drawing
const drawImage = (ctx, img, filter) => {
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgMin = imgWidth > imgHeight ? imgHeight : imgWidth;
  const imgMax = imgWidth < imgHeight ? imgHeight : imgWidth;
  const imageSlice = imgMin;

  //1: "none",
  //2: "blur",
  //3: "grayscale",
  //4: "contrast"
  switch (ImageFilters[filter]) {
    case "blur":
      ctx.filter = "blur(3px)";
      break;
    case "grayscale":
      ctx.filter = "grayscale()";
      break;
    case "contrast":
      ctx.filter = "contrast(130%)";
      break;
    default:
      ctx.filter = "none"
      break;
  }
  ctx.drawImage(img, (imgMax - imgMin) / 2, 0, imageSlice, imageSlice, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.filter = "none"
};

// text drawing
const drawText = (ctx, fontSize, isFocused, isEditing, mouseHeld, textRect, text, font, fontColor) => {
  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = fontColor;
  const [lines, indexMap] = splitTextToLines(ctx, textRect.w, text);

  const spaced = fontSize * 1.3;
  lines.forEach((line, idx) => {
    const {x, y} = positionEachLines(textRect, fontSize, idx);
    ctx.fillText(line, x, y, textRect.w-20);
  });

  const totalHeight = lines.length * spaced;
  textRect.h = totalHeight + 10;

  if (isFocused) {
    //drawTextRect
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = !mouseHeld ? "#0092d1" : "rgba(87, 205, 255, 0.5)";

    ctx.strokeRect(textRect.x, textRect.y, textRect.w, textRect.h);

    //drawEditPoint
    if(isEditing) return;
    ctx.fillStyle = !mouseHeld ? "#0092d1" : "rgba(87, 205, 255, 0.5)";

    textRect.leftEditX = textRect.x - 5;
    textRect.leftEditY = textRect.y + textRect.h / 2 - 5;
    textRect.rightEditX = textRect.x + textRect.w - 5;
    textRect.rightEditY = textRect.leftEditY;

    ctx.fillRect(textRect.leftEditX, textRect.leftEditY, 10, 10);
    ctx.fillRect(textRect.rightEditX, textRect.leftEditY, 10, 10);
  }
};

const positionInRect = (pos, rect) => {
  return ( pos.x >= rect.x ) && ( pos.x <= rect.x+rect.w ) && ( pos.y >= rect.y ) && ( pos.y <= rect.y+rect.h );
};

//return value
//0: not hit
//1: leftEditPoint hit
//2: rightEditPoint hit
const isEditPointClicked = (pos, textRect) => {
  if( positionInRect(pos, {x: textRect.leftEditX, y: textRect.leftEditY, w: 10, h: 10}) ){
    return 1;
  }
  if( positionInRect(pos, {x: textRect.rightEditX, y: textRect.rightEditY, w: 10, h: 10}) ){
    return 2;
  }
  return 0;
}

const mousePositionDiff = (prevPos, currPos) => {
  return ({x: currPos.x - prevPos.x, y: currPos.y - prevPos.y });
}

const Editor = ({
  fontSize = 25,
  font = 'Georgia',
  fontColor = "white",
  image = 'https://images.unsplash.com/photo-1458640904116-093b74971de9?fm=jpg',
  imageSize = 1,
  imageFilter,
}) => {

  const [text, setText] = useState("아무래도 좆됐다.\n 그것이 내가 심사숙고 끝에 내린 결론이다. 나는 좆됐다.")
  const [mouseDownPos, setMouseDownPos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const [textRect, setTextRect] = useState({ x: 50, y: 50, w: 400, h: 100, leftEditX: 10, leftEditY: 10, rightEditX: 100, rightEditY: 100});
  const [textRectResizeMode, setTextRectResizeMode] = useState(0);
  const [startCursor, setStartCursor] = useState(0);
  const [endCursor, setEndCursor] = useState(0);

  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    imageSize && initCanvas(canvasRef.current, imageSize);
    textRef.current.value = text;
  }, [imageSize]);

  //이미지관리를 imageSelector 로 넘기면서 정리 할 것
  //store에 캐싱된 data를 불러와 그리는 형식으로
  useEffect(() => {
    image && drawEditor(image);
    console.log(fontSize);
  });

  const drawEditor = (img) => {
    const ctx = canvasRef.current.getContext('2d');
    drawImage(ctx, img, imageFilter);

    ///////////////contentText
    drawText(ctx, fontSize, isFocused, isEditing, held, textRect, text, font, fontColor);

    if(false){
      drawCursor(ctx, startCursor, fontSize, font, text, textRect);
    }
  }

  const handleMouseDown = (e) => {
    const {x, y} = getMousePos(e, canvasRef.current);
    setMouseDownPos({x, y});
    setTextRectResizeMode(isEditPointClicked({x, y}, textRect));
  };

  const handleMouseMove = (e) => {
    const {x, y} = getMousePos(e, canvasRef.current);

    //rect drag event
    if (mouseDownPos && isFocused && positionInRect(mouseDownPos, textRect) && !isEditing){
      const differ = mousePositionDiff( mouseDownPos, {x, y} );
      switch (textRectResizeMode){

        //move rect
        case 0:
          setTextRect({...textRect, x: differ.x + textRect.x , y: differ.y + textRect.y});
          break;
        //resize rect by left side editpoint
        case 1:
          setTextRect({...textRect, x: differ.x + textRect.x, w: textRect.w - differ.x * 2 });
          break;
        //resize rect by right side editpoint
        case 2:
          setTextRect({...textRect, x: textRect.x - differ.x, w: differ.x * 2 + textRect.w});
        default:
          break;
      }

      setHeld(true);
      setMouseDownPos({x, y});
    }
  };

  const handleMouseUp = (e) => {
    const {x, y} = getMousePos(e, canvasRef.current);
    if ( positionInRect(mouseDownPos, textRect) || textRectResizeMode !== 0) {
      //change focused > editmode
      if ( isFocused && !held){
        const diffPos = mousePositionDiff( mouseDownPos , {x,y} );
        if ( diffPos.x === 0 && diffPos.y === 0 ) {
          setIsEditing(true);
          const ctx = canvasRef.current.getContext('2d');
          const currCursor = findCorsorIndexFromMousePos(ctx, {x, y}, text, textRect, fontSize, font);
          setStartCursor(currCursor);
          textRef.current.selectionStart = currCursor;
          textRef.current.selectionEnd = currCursor;
          textRef.current.focus();
        }
      } else {
        setIsFocused(true);
      }
    }
    else {
      setIsEditing(false);
      setIsFocused(false);
    }
    setHeld(false);
    setMouseDownPos(null);
    setTextRectResizeMode(0);
  };

  const onTextChange = () => {
    setText(textRef.current.value);
  }

  const onKeyUp = () => {
    setStartCursor(textRef.current.selectionStart);
  }

  return(
    <>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>
      <textarea ref={textRef} onChange={onTextChange} onKeyUp={onKeyUp} style={{"whiteSpace": "pre", "opacity": "0", "width": 0, "height": 0}}/>
    </>
  );
};

export default Editor;
