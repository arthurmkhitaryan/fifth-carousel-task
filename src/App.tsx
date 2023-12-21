import React from 'react';

//styles
import * as S from "./App.styles";

//components
import { Carousel } from './components';

//images
import img1 from "./assets/images/slide-img1.jpg";
import img2 from "./assets/images/slide-img2.jpg";
import img3 from "./assets/images/slide-img3.jpg";
import img4 from "./assets/images/slide-img4.jpg";
import img5 from "./assets/images/slide-img5.jpg";

const App: React.FC = () => {
  const items = [img1, img2, img3, img4, img5];

  return (
    <S.App>
      <Carousel 
        items={items}
        visibleItemsCount={4} 
        autoSlide
        loop
      />
    </S.App>
  );
}

export default App;
