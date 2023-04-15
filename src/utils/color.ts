import {colors} from '../constants';

const color = (colorStr: keyof typeof colors, opacity?: number) => {
  return opacity
    ? `rgba(${colors[colorStr]}, ${opacity})`
    : `rgb(${colors[colorStr]})`;
};

export default color;
