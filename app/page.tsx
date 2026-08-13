'use client';

import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden', 
      backgroundColor: '#0a5440' 
    }}>
      
      {/* CSS rules to handle the Desktop vs Mobile layout changes */}
      <style>{`
        /* 1. MOBILE DEFAULT (Filled header, video sits below) */
        .dynamic-header {
          background-color: #0a5440;
          position: relative;
          z-index: 10;
        }
        .dynamic-video-wrapper {
          flex-grow: 1;
          position: relative;
          width: 100%;
        }

        /* 2. DESKTOP/TABLET (Transparent header, full-screen video) */
        @media (min-width: 768px) {
          .dynamic-header {
            background-color: transparent !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
          .dynamic-video-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
          }
        }
      `}</style>

      {/* ======================================= */}
      {/* DYNAMIC HEADER                          */}
      {/* ======================================= */}
      <Navbar 
        className="px-3 py-3 dynamic-header" 
        style={{ flexShrink: 0 }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          <img 
            src="/logo.png" 
            alt="logo" 
            style={{ width: 'auto', height: '60px', maxHeight: '10vh' }} 
          />
          
          <Link 
            href="/generate" 
            className="btn"
            style={{ 
              backgroundColor: '#ffe100', 
              color: '#000', 
              border: 'none', 
              fontWeight: 'bold',
              padding: '10px 20px',
              whiteSpace: 'nowrap',
              fontSize: 'clamp(14px, 2vw, 16px)'
            }}
          >
            Generate ID Card
          </Link>
        </Container>
      </Navbar>

      {/* ======================================= */}
      {/* VIDEO CONTAINER                         */}
      {/* ======================================= */}
      <div className="dynamic-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', /* FIX: Cover applied to both Desktop and Mobile */
            objectPosition: 'top', /* Keeps the top text from being cropped */
          }}
        >
          <source src="/MainPageVideo.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
}