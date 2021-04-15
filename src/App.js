import react, {useEffect, useState} from 'react';
import styled from 'styled-components';

import Editor from './components/Editor';
import CardLayout from './components/CardLayout';
import Panel from './components/Panel';
import ImageSelector from './components/ImageSelector';

const AppLayout = styled.div`
  width: 1024px;
  height: 90%;

  display: flex;
  justify-content: center;


  @media (max-width: 1024px){
    width: 768px;
  }

  @media (max-width: 768px){
    width: 100%;
  }
`;

const App = () => {
  const [selectedData, setSelectedData] = useState('');
  const [imageSize, setImageSize] = useState('');
  const [imageFilter, setImageFilter] = useState('');

  const onChangeImage = (data) => {
    setSelectedData(data);
  }

  const onChangeImageSize = (id) => {
    setImageSize(id);
  }

  const onChangeImageFilter = (id) => {
    setImageFilter(id);
  }

  return(
    <AppLayout>
      <CardLayout title={"image"} width={"200px"}>
        <ImageSelector onChangeImage={onChangeImage} />
      </CardLayout>
      <CardLayout title={"canvas"} width={"550px"}>
        <Editor image={selectedData} imageSize={imageSize} imageFilter={imageFilter} />
      </CardLayout>
      <div>
        <Panel image={selectedData} onChangeImageSize={onChangeImageSize} onChangeImageFilter={onChangeImageFilter}/>
      </div>
    </AppLayout>
  )
};

export default App;
