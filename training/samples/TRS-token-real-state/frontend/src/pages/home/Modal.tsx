// src/pages/home/Modal.tsx

// import React from 'react';
import React, { useEffect } from 'react';

// Define constants for style values
const POSITION_FIXED = 'fixed';
const POSITION_RELATIVE = 'relative';
const POSITION_ABSOLUTE = 'absolute';

const modalStyles = {
  overlay: {
    position: POSITION_FIXED,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    position: POSITION_RELATIVE,
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    color: '#000', // Ensure text color is black for contrast
    backgroundColor: '#fff', // Set a background color for contrast
  },
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: '10px',
    right: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


/*
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};
*/

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(); // Close the modal when Escape is pressed
      }
    };

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;


/* modal con error de letras en blanco
// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative' as 'relative',
    width: '80%',
    maxWidth: '600px',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default Modal;
*/
