export interface ISlide {
  image: string;
}

export interface ISliderProps {
  slides: ISlide[];
  image: string;

}

export interface IModalProps {
  image: string;
  handleClose: () => void;
  handleClick: (img: string) => void
  slides: ISlide[];
}

export interface IBanner {
  color: string;
  label: string;
}
export interface IButton {
  name: string
}