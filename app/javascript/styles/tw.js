import { create } from 'tailwind-rn';
import styles from './styles.json';
const customStyles = {
  "min-h-14": {
    "minHeight": 56
  }
}

function extend(...selectors) {
  return selectors.join(' ').split(' ').map((selector) => {
    return styles[selector] || customStyles[selector];
  }).reduce((styleSheet, style) => {
    return { ...styleSheet, ...style };
  }, {})
}

// Let this sink in for a while...
customStyles['dodoable-trigger'] = extend('py-2 px-4 rounded mt-2');
customStyles['dodone-dodoable-trigger'] = extend('dodoable-trigger bg-green-300 bg-opacity-40');
customStyles['pending-dodoable-trigger'] = extend('dodoable-trigger bg-gray-900 bg-opacity-60');
customStyles['dodone-dodoable-trigger-text'] = extend('text-xs text-green-300');
customStyles['pending-dodoable-trigger-text'] = extend('text-xl text-blue-300');

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
