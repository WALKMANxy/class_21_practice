import React from 'react';
import {  ButtonBase, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'animate.css';


const AnimatedButton: React.FC<{
    imageSrc: string;
    altText: string;
    path: string;
    buttonSize: number;
  }> = ({ imageSrc, altText, path, buttonSize }) => {
    const [animate, setAnimate] = React.useState(false);
    const navigate = useNavigate();
  
    const handleClick = () => {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        navigate(path);
      }, 500);
    };
  
    return (
      <ButtonBase
        onClick={handleClick}
        sx={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 3,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
        className={animate ? 'animate__animated animate__bounce' : ''}
      >
        <img
          src={imageSrc}
          alt={altText}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
          }}
        />
      </ButtonBase>
    );
  };
  
  export default React.memo(AnimatedButton);
