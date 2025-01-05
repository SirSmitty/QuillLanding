import React, { useEffect, useRef } from 'react';
import './App.css';
import phase from '/phase.svg';
import phase2 from '/phase2.svg';
import phase3 from '/phase3.svg';
import Header from '../components/header';
import AdminView from '/adminView.png';
import AnimationScroll from '../components/AnimationScroll';
import ParticleCanvas from '../components/Particlecanvas';
import { gsap } from 'gsap';
import { ScrollTrigger, MorphSVGPlugin } from 'gsap/all';

function App() {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
  const svgRef = useRef(null);

  useEffect(() => {

    // Array of SVG paths (inline paths)
    const paths = [
      "M48 8 L16 24 L16 40 L48 56", // Blockchain path
      "M256,104.283 C12.82,13.044 25.399,27.65 37.58,43.626", // Particle path (simplified)
      "M1096.233,698.227 C108.2-88.028 196.229-196.229 108-196.234", // Security path (simplified)
      "M92.019,246.534 L78.096,260.457 L152.769,335.13 L78.096,409.803", // Terminal path
    ];

    let currentIndex = 0;

    // GSAP Morphing Animation
    const morph = () => {
      gsap.to(svgRef.current, {
        duration: 2, // Duration of morph
        attr: { d: paths[currentIndex] }, // Update the `d` attribute of the path
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = (currentIndex + 1) % paths.length; // Cycle through paths
          morph(); // Recursively call morph
        },
      });
    };

    // Start the morph animation
    morph();
  }, []);


  useEffect(() => {
    console.log("Initializing ScrollTrigger");

    // Select all panels
    let sections = gsap.utils.toArray(".panel");
    console.log("sections:", sections);

    // Ensure container exists
    const container = document.querySelector(".container");
    if (!container) {
      console.error("Container element not found!");
      return;
    }
    console.log("Container width:", container.offsetWidth);

    // Debug each panel's dimensions
    sections.forEach((panel, index) => {
      console.log(`Panel ${index} dimensions:`, {
        width: panel.offsetWidth,
        height: panel.offsetHeight,
      });
    });

    // Horizontal scroll animation
    const scrollAnimation = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.offsetWidth,
      },
    });

    // Cleanup previous ScrollTrigger instances
    return () => {
      console.log("Cleaning up ScrollTrigger");
      scrollAnimation.scrollTrigger.kill();
    };
  }, []); // Empty dependency array ensures it runs only once

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

                <img src={AdminView} alt='admin view' />
              </div>
            </div>
          </div>
          <div className="container">
            <ParticleCanvas />
            <div className="description panel blue">
              <div className="content-wrapper">
                <h1 className="panel-title">Quantum</h1>
                <div className="panel-content">
                  <div className="svg-wrapper">
                    <img src={phase} alt='quantumphase' />
                  </div>
                  <div className="text-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                      nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                      volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                      molestie consequat, vel illum dolore eu feugiat nulla facilisis at
                      vero eros et accumsan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="description panel blue">
              <div className="content-wrapper">
                <h1 className="panel-title">Universal Interface</h1>
                <div className="panel-content">
                  <div className="svg-wrapper">
                    <img src={phase2} alt='quantumphase' />
                  </div>
                  <div className="text-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                      nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                      volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                      molestie consequat, vel illum dolore eu feugiat nulla facilisis at
                      vero eros et accumsan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="description panel blue">
              <div className="content-wrapper">
                <h1 className="panel-title">Lock & Ledger</h1>
                <div className="panel-content">
                  <div className="svg-wrapper">
                    <img src={phase3} alt='quantumphase' />
                  </div>
                  <div className="text-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
                      nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                      volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                      molestie consequat, vel illum dolore eu feugiat nulla facilisis at
                      vero eros et accumsan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lastContainer">
          <h2>End of Scroll</h2>
        </div>
      </main>
    </>
  );
}

export default App;