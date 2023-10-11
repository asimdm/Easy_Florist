import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src='https://images.pexels.com/photos/268261/pexels-photo-268261.jpeg?cs=srgb&dl=pexels-pok-rie-268261.jpg&fm=jpg' alt='banner' width={'100%'} height={'500px'}></img>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://images6.alphacoders.com/662/662213.jpg' alt='banner' width={'100%'} height={'500px'}></img>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg' alt='banner' width={'100%'} height={'500px'}></img>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;