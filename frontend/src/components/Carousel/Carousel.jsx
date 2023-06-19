import React from "react";
import { Carousel } from "react-carousel-minimal";
import "./Carousel.scss";

const CarouselSuppage = ({ dataImage }) => {
  const data = [
    {
      image: `${dataImage[0]}`,
    },
    {
      image: `${dataImage[1]}`,
    },
    {
      image: `${dataImage[2]}`,
    },
    {
      image: `${dataImage[3]}`,
    },
  ];

  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div>
      <Carousel
        data={data}
        time={1000}
        width="400px"
        height="500px"
        radius="10px"
        slideNumber={true}
        slideNumberStyle={slideNumberStyle}
        automatic={true}
        // dots={false}
        // pauseIconColor="white"
        // pauseIconSize="40px"
        // slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={true}
        thumbnailWidth="100px"
        style={{
          textAlign: "center",
          maxWidth: "850px",
          maxHeight: "500px",
          marginLeft: "70px",
          transform: "translateY(140px)",
        }}
      />
    </div>
  );
};

export default CarouselSuppage;
