import React, { useEffect, useRef } from 'react';
import './App.css';
import Header from '../components/header';
import AdminView from '/adminView.png';
import AnimationScroll from '../components/AnimationScroll';
import VerticalParallax from '../components/Info';;

function App() {

  return (
    <>
      <Header />
      <AnimationScroll />
      <main>

        <div className="infographic-container">
          <div className="philosophy-container">
            {/* Left Content */}
            <div className="philosophy-content">
              <h1 className="philosophy-title">Our Flagship</h1>
              <p className="philosophy-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat.
              </p>
            </div>
            <div className='philosophy-svg-wrapper'>
              <div className='philosophy-svg'>
                <div className="image-wrapper">
                  <img src={AdminView} alt='admin view' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-parallax-wrapper">
          <VerticalParallax />
        </div>
        <div className="lastContainer">
          <h2>End of Scroll</h2>
        </div>
      </main>
    </>
  );
}

export default App;