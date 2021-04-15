import react from 'react';
import styled, {css} from 'styled-components';

const Layout = styled.div`
  background: white;
  border: 1px solid #aaa;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding 0 1rem;
  margin 0 0.5rem;
  ${props =>
  props.width &&
  css`width: ${props.width}`
  };
`;

const Title = styled.h4`
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  color: #aaa;
  font-weight: 500;
  text-align: center;
  margin-bottom: 0;
  margin-top: 5px;
`;

const CardLayout = ({title = "title", children, width}) => {
  return (
    <Layout width={width}>
      <Title>{title}</Title>
      <hr style={{"width": "100%", "border-top": "1px solid #aaa"}}/>
      {children}
    </Layout>
  )
};

export default CardLayout;
