import react, {useRef, useEffect} from 'react';
import styled from 'styled-components';

const images = [
  { url: 'https://images.unsplash.com/photo-1458640904116-093b74971de9?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1451906278231-17b8ff0a8880?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1447969025943-8219c41ea47a?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1421749810611-438cc492b581?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1449960238630-7e720e630019?fm=jpg' },
  { url: 'https://images.unsplash.com/photo-1433190152045-5a94184895da?fm=jpg' }
];

const Layout = styled.div`
  width: 100%;
  overflow: overlay;
`;

const ImageSelector = ({onChangeImage}) => {
  const imageArr = useRef(null);
  const onSelected = (e) => {
    onChangeImage(e.target);
  }

  useEffect(() => {
    onChangeImage(imageArr.current.childNodes[0]);
  }, [])

  return (
    <Layout ref={imageArr}>
      {images.map(image => {
        return (
          <img src={image.url} crossOrigin="anoymous"
            style={{"width": "100%", "marginBottom": "1rem", "padding-right": "1rem"}}
            onClick={onSelected}
            key={image.url}/>
        )
      })}
    </Layout>

  );
}

export default ImageSelector;
