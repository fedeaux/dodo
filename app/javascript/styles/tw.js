import { create } from 'tailwind-rn';
import styles from './styles.json';
const customStyles = {
  "min-h-14": {
    "minHeight": 56
  },
}

const { tailwind, getColor } = create({ ...styles, ...customStyles });

function tw(...args) {
  if (args.flat) {
    args = args.flat()
  }

  const inlineStyles = args.filter((arg) => {
    return typeof arg == 'object';
  });

  args = args.filter((arg) => {
    return typeof arg != 'object';
  });


  if (args.join) {
    args = args.join(" ")
  }

  return [...inlineStyles, tailwind(args)].reduce((styleSheet, style) => {
    return { ...styleSheet, ...style };
  }, {});
};

export { tailwind, getColor, tw };
