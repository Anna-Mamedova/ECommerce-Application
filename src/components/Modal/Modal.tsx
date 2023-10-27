import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styleModalWindow } from '../../utils/consts';
import { IModalProps } from '../../interfaces/detailedPage.interface';
import { Slider } from '../Slider/Slider';
import styles from './Modal.module.css';

export default function ModalWindow({
  slides,
  image,
  handleClose,
  handleClick,
}: IModalProps) {
  return (
    <Modal
      className={styles.modal_window}
      open={Boolean(image)}
      onClose={handleClose}
    >
      <Box sx={styleModalWindow}>
        <Slider
          handleClose={handleClose}
          slides={slides}
          handleClick={handleClick}
          isModal={true}
          image={image}
        />
      </Box>
    </Modal>
  );
}
