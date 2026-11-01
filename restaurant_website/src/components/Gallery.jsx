import React from 'react';

const Gallery = () => {
  return (
   <div class="gallery">
        <h1>Popular<span>Gallery</span></h1>

        <div class="gallery_box">
            <div class="gallery_image">
                <img src="image/gallery_1.jpg" alt="Restaurant Interior"/>
            </div>

            <div class="gallery_image">
                <img src="image/gallery_2.jpg" alt="Delicious Food"/>
            </div>

            <div class="gallery_image">
                <img src="image/gallery_3.webp" alt="Chef Preparing Food"/>
            </div>
        </div>
    </div>
  );
};

export default Gallery;