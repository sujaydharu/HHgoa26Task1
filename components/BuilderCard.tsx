'use client';

import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

export default function BuilderCard() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [randomIdNum] = useState(() => Math.floor(Math.random() * 900) + 100);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    builderTitle: 'The 10x Shipper' 
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle Photo Uploads & HEIC Conversion
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const convertToBase64 = (blob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(blob);
    };

    try {
      if (file.name.toLowerCase().endsWith('.heic')) {
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
        convertToBase64(convertedBlob as Blob);
      } else {
        convertToBase64(file);
      }
    } catch (error) {
      console.error("Image processing error", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate Image and Download
  const downloadBadge = async () => {
    if (badgeRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(badgeRef.current, { 
        cacheBust: true, 
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = 'HH_Goa_2026_Badge.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image", err);
      alert("Failed to download badge. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToX = () => {
    const text = encodeURIComponent("I'm heading to HH Goa 2026! 🌴💻 #FrameInGoa");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%', 
      overflowX: 'hidden', 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/BGofID.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundColor: '#1a1a1a', 
      color: '#fff' 
    }}>
      
      {/* 1. Header with Logo and Back Button */}
      <div className="d-flex justify-content-between align-items-center p-3 p-md-4">
        <img 
          src="/logo.png" 
          alt="logo" 
          style={{ height: '40px', maxWidth: '100%', width: 'auto' }} 
        />
        <Link 
          href="/" 
          className="btn d-flex align-items-center gap-2"
          style={{
            backgroundColor: '#0a5440',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '6px 14px',
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          <span>&larr;</span> Back
        </Link>
      </div>

      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          
        {/* Left Column: Form Inputs */}
        <Col md={5} className="mb-5 mb-md-0">
          
          <style>{`
            .glass-panel {
              background: rgba(244, 235, 216, 0.95) !important; 
              backdrop-filter: blur(8px); 
              border: 2px solid #4a3623 !important; 
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
            }
            .aesthetic-input {
              background-color: rgba(255, 255, 255, 0.6) !important; 
              border: 1px solid rgba(74, 54, 35, 0.3) !important; 
              color: #4a3623 !important; 
              border-radius: 8px !important;
              padding: 12px 16px !important;
              transition: all 0.3s ease;
            }
            .aesthetic-input:focus {
              border-color: #4a3623 !important;
              box-shadow: 0 0 0 4px rgba(74, 54, 35, 0.15) !important;
              background-color: rgba(255, 255, 255, 0.9) !important;
            }
            .aesthetic-input::placeholder {
              color: rgba(74, 54, 35, 0.5) !important; 
            }
            .aesthetic-input::file-selector-button {
              background-color: #ffe100;
              color: #000;
              border: none;
              font-weight: 700;
              padding: 6px 14px;
              border-radius: 6px;
              margin-right: 14px;
              cursor: pointer;
              transition: 0.2s ease;
            }
            .aesthetic-input::file-selector-button:hover {
              background-color: #e5ca00;
            }
            .btn-hover-lift {
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .btn-hover-lift:hover:not(:disabled) {
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            }
          `}</style>

          <div className="glass-panel p-4 mb-4" style={{ borderRadius: '16px' }}>
            <h4 className="mb-4 fw-bold d-flex align-items-center gap-3" style={{ color: '#4a3623' }}>
              <span style={{ 
                backgroundColor: '#4a3623', 
                color: '#f4ebd8', 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: '50%', 
                fontSize: '16px' 
              }}>
                1
              </span> 
              Upload your Details
            </h4>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" style={{ color: '#4a3623', letterSpacing: '0.5px', fontSize: '14px' }}>
                Profile Photo <small className="fw-normal" style={{ opacity: 0.7 }}>(JPG, PNG, HEIC)</small>
              </Form.Label>
              <Form.Control className="aesthetic-input" type="file" accept="image/*,.heic" onChange={handleFileUpload} />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" style={{ color: '#4a3623', letterSpacing: '0.5px', fontSize: '14px' }}>
                Name
              </Form.Label>
              <Form.Control className="aesthetic-input" type="text" name="name" placeholder="e.g. John Doe" onChange={handleInputChange} />
            </Form.Group>
            
            {/* Role Field with Datalist */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" style={{ color: '#4a3623', letterSpacing: '0.5px', fontSize: '14px' }}>
                Role
              </Form.Label>
              <Form.Control 
                className="aesthetic-input" 
                type="text" 
                name="role" 
                list="role-options" 
                placeholder="Select or type your role" 
                onChange={handleInputChange} 
              />
              <datalist id="role-options">
                <option value="AI & ML Engineer" />
                <option value="Data Scientist" />
                <option value="Designer" />
                <option value="Product Manager" />
                <option value="DevOps Engineer" />
              </datalist>
            </Form.Group>

            <div className="d-flex gap-3 mt-2">
               <Button 
                 style={{ backgroundColor: '#ffe100', color: '#000', border: '2px solid #4a3623', borderRadius: '10px' }} 
                 className="fw-bold px-4 py-3 flex-grow-1 btn-hover-lift" 
                 onClick={downloadBadge} 
                 disabled={isGenerating}
               >
                {isGenerating ? 'Generating...' : '↓ Download Badge'}
              </Button>
              
              <Button 
                className="fw-bold px-4 py-3 flex-grow-1 btn-hover-lift" 
                style={{ border: '2px solid #4a3623', borderRadius: '10px', backgroundColor: '#4a3623', color: '#f4ebd8' }}
                onClick={shareToX}
              >
                𝕏 Share to X
              </Button>
            </div>
          </div>
  
        </Col>

        {/* Right Column: The ID Card Graphic Preview */}
        <Col md={5} className="d-flex justify-content-center mt-5 mt-md-0">
          
          <div 
            ref={badgeRef} 
            style={{ 
              width: '100%', 
              maxWidth: '380px', 
              aspectRatio: '1 / 1.414',
              backgroundColor: '#f4ebd8', 
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.5)', 
            }}
          >
            
            {/* Template Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/final id.png" 
              alt="Template Background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            />

            {/* 1. Profile Image Overlay */}
            <div style={{ 
                position: 'absolute',
                top: '7%', 
                left: '8%',
                width: '30%', 
                height: '29%', 
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '6px',
                overflow: 'hidden',
                zIndex: 1 
              }}>
              {imagePreview && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              )}
            </div>

            {/* 2. Passenger Name Overlay */}
            <div style={{
              position: 'absolute',
              top: '46.5%',
              left: '6.5%',
              color: '#4a3623', 
              fontFamily: 'monospace, sans-serif', 
              fontSize: 'clamp(14px, 4vw, 18px)', 
              fontWeight: 'bold',
              textTransform: 'uppercase',
              width: '30%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              zIndex: 1
            }}>
              {formData.name || 'FULL NAME'}
            </div>

            {/* 3. Passenger Role Overlay */}
            <div style={{
              position: 'absolute',
              top: '59%',
              left: '6.5%',
              color: '#4a3623',
              fontFamily: 'monospace, sans-serif',
              fontSize: 'clamp(12px, 3.5vw, 16px)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              width: '40%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              zIndex: 1
            }}>
              {formData.role || 'TECH ROLE'}
            </div>

            {/* 4. Passenger ID Overlay */}
            <div style={{
              position: 'absolute',
              top: '71%',
              left: '6.5%',
              color: '#4a3623',
              fontFamily: 'monospace, sans-serif',
              fontSize: 'clamp(12px, 3.5vw, 16px)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              zIndex: 1
            }}>
              {formData.name ? `HH26-${formData.name.substring(0,3).toUpperCase()}${randomIdNum}` : 'ID NUMBER'}
            </div>

          </div>
        </Col>
        </Row>
      </Container>
    </div>
  );
}