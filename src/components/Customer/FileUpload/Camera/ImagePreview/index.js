import React from 'react';
import PropTypes from 'prop-types';
import ModalImage from "react-modal-image";

import './index.css';

export const ImagePreview = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';

  return (
    <div className={'col-6 demo-image-preview ' + classNameFullscreen}>
      {/* <a onClick={(event)=> {
        (dataUri)
      }}>
      <img alt="" src={dataUri} alt='Preview' /> */}
      <ModalImage
        small={dataUri}
        medium={dataUri}
        large={dataUri}
        alt="Preview"
        showRotate={true}
        imageBackgroundColor="#336699"
      />
      {/* </a> */}
    </div>
  );
  
}

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool,
  isDelete: PropTypes.bool,
};

export default ImagePreview;