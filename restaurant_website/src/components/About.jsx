import React from 'react';

const About = () => {
  return (
    <div className="about">
        <div className="about_main">
            <div className="about_image">
                <img src="image/about.png" alt="About Our Restaurant"/>
            </div>

            <div className="about_text">
                <h1><span>About</span>Us</h1>
                <h3>Why choose us?</h3>
                <p>
                    Founded in 2010, our restaurant has been serving the community with passion
                    and dedication for over a decade. We believe that great food starts with
                    exceptional ingredients, which is why we partner with local farmers and
                    suppliers to bring you the freshest produce, meats, and dairy products.
                </p>

                <div className="about_services">
                    <div className="s_1">
                        <i className="fa-solid fa-truck-fast"></i>
                        <a href="#">Fast Delivery</a>
                    </div>

                    <div className="s_1">
                        <i className="fa-brands fa-amazon-pay"></i>
                        <a href="#">Easy Payment</a>
                    </div>

                    <div className="s_1">
                        <i className="fa-solid fa-headset"></i>
                        <a href="#">24 x 7 Services</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;