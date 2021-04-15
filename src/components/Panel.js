import react, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';

import CardLayout from '../components/CardLayout';

const fonts = {
  1: "Georgia",
  2: "Arial",
  3: "Helvetica",
  4: "Trebuchet MS",
};
const colors = [
  "white",
  "black",
  "#444444",
  "#007fff",
  "#ffb300",
  "#71c318",
];

const PanelLayout = styled.div`
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: space-between;
`;

const SizeLayout = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin-bottom: 0.5rem;
  justify-content: space-between;
`;

const SizeTemplate = styled.div`
  display: flex;
  font-size: 0.6rem;
  justify-item: center;
  border: ${props => props.id === props.select ? "2px solid #007bff" : "1px solid #aaa"};
  border-radius: 3px;
  flex: ${props => props.width};
  align-items: center;
  justify-content: center;
  position: relative;
  &:before {
    ${props => props.id === props.select ?
    css` content: '✓';
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: #007bff;
    font-size: 0.8rem;
    text-align: center;
    border-radius: 50%;
    color: white;
    top: -9px;
    right: -10px;
    `
    : ""};
  };
`;

const FilterPreviewContainer = styled.div`
  display: flex;
  height: 170px;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const FilterPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: #aaa;
  font-weight: 500;
  width: 50%;
`;

const FilterPreviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: #aaa;
  font-weight: 500;
  width: 100%;
  position: relative;
  &:before {
    ${props => props.id === props.select ?
    css` content: '✓';
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: #007bff;
    font-size: 0.8rem;
    text-align: center;
    border-radius: 50%;
    color: white;
    top: -8px;
    right: 5px;
    z-index: 100;
    `
    : ""};
  };
`;

const FilterPreviewImg = styled.img`
  border: ${props => props.id === props.select ? "2px solid #007bff" : "1px solid #aaa"};
  width: 60px;
  height: 60px;
  display: flex;
  font-size: 0.6rem;
  justify-item: center;
  border-radius: 5px;
  flex: ${props => props.width};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FontSelectorLayout = styled.div`
  height: 170px;
  width: 100%;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  color: #aaa;
`;
const FontList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const FontItem = styled.div`
  border: ${props => props.id === props.select ? "2px solid #007bff" : "1px solid #aaa"};
  border-radius: 3px;
  width: 45%;
  height: 30px;
  margin-bottom: 5px;
  text-align: center;
  position: relative;
  &:before {
    ${props => props.id === props.select ?
    css` content: '✓';
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: #007bff;
    font-size: 0.8rem;
    text-align: center;
    border-radius: 50%;
    color: white;
    top: -8px;
    right: -8px;
    z-index: 100;
    `
    : ""};
  };
`;
const FontSizeList = styled.div`
  margin: 10px 5px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  select {
    width: 50%;
    border: 1px solid #aaa;
    height: 30px;
    border-radius: 3px;
    text-align-last: center;
  }
`;

const FontColorList = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
`;

const FontColorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin 10px 0;
  width: 22px;
  height: 22px;
  background: ${props => props.color};
  border-radius: 3px;
  border: ${props => props.id === props.select ? "1px solid #007bff" : "1px solid #aaa"};
  position: relative;
  &:before {
    ${props => props.id === props.select ?
    css` content: '✓';
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    background: #007bff;
    font-size: 0.7rem;
    text-align: center;
    border-radius: 50%;
    color: white;
    top: -8px;
    right: -8px;
    z-index: 100;
    `
    : ""};
  };
`;

const Panel = ({image, onChangeImageFilter, onChangeImageSize, onChangeFont, onChangeFontSize, onChangeFontColor}) => {

  const [selectedSize, setSelectedSize] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [selectedFont, setSelectedFont] = useState(1);
  const [selectedFontSize, setSelectedFontSize] = useState(25);
  const [selectedFontColor, setSelectedFontColor] = useState(1);

  const onClickSizeSelector = (e) => {
    setSelectedSize(parseInt(e.target.id));
    onChangeImageSize(e.target.id)
  }

  const onClickFilter = (e) => {
    setSelectedFilter(parseInt(e.target.id));
    onChangeImageFilter(e.target.id)
  }

  const onClickFont = (e) => {
    setSelectedFont(parseInt(e.target.id));
    onChangeFont(fonts[parseInt(e.target.id)]);
  }

  const onSelectFontSize = (e) => {
    setSelectedFontSize(parseInt(e.target.value));
    onChangeFontSize(parseInt(e.target.value));
  }

  const onClickColor = (e) => {
    setSelectedFontColor(parseInt(e.target.id));
    onChangeFontColor(colors[parseInt(e.target.id)]);
  }

  return (
    <PanelLayout>
      <CardLayout title={"size"} width={"200px"}>
        <SizeLayout>
          <SizeTemplate width={"0 0 25px"} id={1} onClick={onClickSizeSelector} select={selectedSize}>Tall</SizeTemplate>
          <SizeTemplate width={"0 0 45px"} id={2} onClick={onClickSizeSelector} select={selectedSize}>Square</SizeTemplate>
          <SizeTemplate width={"0 0 75px"} id={3} onClick={onClickSizeSelector} select={selectedSize}>Wide</SizeTemplate>
        </SizeLayout>
      </CardLayout>
      <CardLayout title={"filter"} width={"200px"}>
        <FilterPreviewContainer>
          <FilterPreviewList>
            <FilterPreviewItem id={1} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} id={1} onClick={onClickFilter} select={selectedFilter}/>}
              Normal
            </FilterPreviewItem>
            <FilterPreviewItem id={2} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "blur(1px)"}} id={2} onClick={onClickFilter} select={selectedFilter}/>}
              Blur
            </FilterPreviewItem>
          </FilterPreviewList>
          <FilterPreviewList>
            <FilterPreviewItem id={3} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "grayscale(100%)"}} id={3} onClick={onClickFilter} select={selectedFilter}/>}
              GrayScale
            </FilterPreviewItem>
            <FilterPreviewItem id={4} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "contrast(130%)"}} id={4} onClick={onClickFilter} select={selectedFilter}/>}
              Contrast
            </FilterPreviewItem>
          </FilterPreviewList>
        </FilterPreviewContainer>
      </CardLayout>
      <CardLayout title={"font"} width={"200px"}>
        <FontSelectorLayout>
          <FontList>
            <FontItem id={1} select={selectedFont} onClick={onClickFont} style={{"font-family": "Georgia"}}>Georgia</FontItem>
            <FontItem id={2} select={selectedFont} onClick={onClickFont} style={{"font-family": "Arial"}}>Arial</FontItem>
            <FontItem id={3} select={selectedFont} onClick={onClickFont} style={{"font-family": "Helvetica"}}>Helvetica</FontItem>
            <FontItem id={4} select={selectedFont} onClick={onClickFont} style={{"font-family": "Trebuchet MS"}}>Trebuchet</FontItem>
          </FontList>
          <FontSizeList>
            Size :
            <select onChange={onSelectFontSize}>
              <option value={15}>10</option>
              <option value={20}>20</option>
              <option selected value={25}>25</option>
              <option value={30}>30</option>
              <option value={35}>35</option>
            </select>
          </FontSizeList>
          <FontColorList>
            {colors.map((color, i) => (<FontColorItem id={i} select={selectedFontColor} onClick={onClickColor} color={color} />))}
          </FontColorList>
        </FontSelectorLayout>
      </CardLayout>
    </PanelLayout>
  )
}
//const fonts = {
//  1: "Georgia",
//  2: "Arial",
//  3: "Helvetica",
//  4: "Trebuchet MS",
//};
export default Panel;
