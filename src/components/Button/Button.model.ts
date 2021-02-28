export interface ButtonProps {
  id: string;
  name: string;
  btnClassName?: string;
  audioFileName?: string;
  handleSoundOn:boolean;
  handleSoundVolume:number;
  handleClick: () => void;
}
