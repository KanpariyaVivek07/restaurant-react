import React, {useEffect} from 'react';

const ImageModal = ({ image, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image_modal" onClick={handleBackdropClick}>
      <span className="close_modal" onClick={onClose}>&times;</span>
      <img 
        className="modal_content" 
        src={image.src} 
        alt={image.title}
      />
      <div className="modal_caption">{image.title}</div>
      <div className="modal_nav">
        <button onClick={onPrev} disabled={!hasPrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={onNext} disabled={!hasNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;