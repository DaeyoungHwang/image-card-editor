import react, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';

import CardLayout from '../components/CardLayout';

const PanelLayout = styled.div`
  display: flex;
  height: 50%;
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
  border: 1px solid #aaa;
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

const Panel = ({image, onChangeImageFilter, onChangeImageSize}) => {

  const [selectedSize, setSelectedSize] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState(1);

  const onClickSizeSelector = (e) => {
    setSelectedSize(parseInt(e.target.id));
    onChangeImageSize(e.target.id)
  }

  const onClickFilter = (e) => {
    setSelectedFilter(parseInt(e.target.id));
    onChangeImageFilter(e.target.id)
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
              {image && <FilterPreviewImg src={image.src} id={1} onClick={onClickFilter}/>}
              Normal
            </FilterPreviewItem>
            <FilterPreviewItem id={2} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "blur(1px)"}} id={2} onClick={onClickFilter}/>}
              Blur
            </FilterPreviewItem>
          </FilterPreviewList>
          <FilterPreviewList>
            <FilterPreviewItem id={3} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "grayscale(100%)"}} id={3} onClick={onClickFilter}/>}
              GrayScale
            </FilterPreviewItem>
            <FilterPreviewItem id={4} select={selectedFilter}>
              {image && <FilterPreviewImg src={image.src} style={{"filter": "contrast(130%)"}} id={4} onClick={onClickFilter}/>}
              Contrast
            </FilterPreviewItem>
          </FilterPreviewList>
        </FilterPreviewContainer>
      </CardLayout>
      <CardLayout title={"font"} width={"200px"}>
        폰트
      </CardLayout>
    </PanelLayout>
  )
}

export default Panel;
