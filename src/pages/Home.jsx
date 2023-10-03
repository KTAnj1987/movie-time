import React, {useEffect, useState} from "react";
import { getBanners } from "../api";

const Home = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    getBanners().then(data=>{
      setImages(data.object.bannerHomepages)
    })
  }, []);
  return (
    <>
      <h2>Find Your Favorite Movies with Movie Time: A Free search Website</h2>
      <p>
        If you are into details of movies, Movie Time is the website for you.
        This website offers a huge library of movie content.
      </p>
      <div style={{
        width: '600px',
        height: '600px',
        aspectRatio: 'auto 600 / 600'
      }} >
      {images && images.map((image,index) => (
        <img style={{width: '100%', height: 'auto'}} key={`image-${index}`} src={`https://static-qa.edclinic.co.uk/cdn-cgi/image/width=471,quality=93,f=auto/${image.imageLinkDesktop}`}/>
      ))}
      </div>
      
      
    </>
  );
};

export default Home;
