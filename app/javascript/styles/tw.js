import { create } from 'tailwind-rn';
import styles from './styles.json';
const customStyles = {
  "text-3xs": {
    "fontSize": 8,
    "lineHeight": 8
  },
  "text-2xs": {
    "fontSize": 10,
    "lineHeight": 12
  },
  "min-h-14": {
    "minHeight": 56
  },
  "text-5xl": {
    "fontSize": 42,
    "lineHeight": 44
  },
  "text-6xl": {
    "fontSize": 48,
    "lineHeight": 48
  },
  "bg-bluish-gray-900": {
    "--tw-bg-opacity": 1,
    "backgroundColor": "rgba(31, 46, 77, var(--tw-bg-opacity))"
  },
  "font-digital": {
    fontFamily: "DigitalDismay"
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
customStyles['dodoable-trigger'] = extend('py-2 px-3 rounded mt-2');

customStyles['dodone-dodoable-trigger'] = extend('dodoable-trigger bg-green-300 bg-opacity-40');
customStyles['dodone-dodoable-trigger-text'] = extend('text-xs text-green-300');

customStyles['pending-dodoable-trigger'] = extend('dodoable-trigger bg-gray-900 bg-opacity-60');
customStyles['pending-dodoable-trigger-text'] = extend('text-sm text-blue-300');

customStyles['skipped-dodoable-trigger'] = extend('dodoable-trigger bg-gray-900 bg-opacity-40');
customStyles['skipped-dodoable-trigger-text'] = extend('text-xs italic line-through text-gray-400');

customStyles['being-tracked-dodoable-trigger'] = extend('dodoable-trigger bg-bluish-gray-900 bg-opacity-60');
customStyles['being-tracked-dodoable-trigger-text'] = extend('text-xl text-blue-300');

customStyles['secondary-dodoable-trigger'] = extend('dodoable-trigger bg-gray-900 bg-opacity-60');
customStyles['secondary-dodoable-trigger-text'] = extend('text-sm text-gray-400');

customStyles['failed-dodoable-trigger'] = extend('dodoable-trigger bg-red-300 bg-opacity-40');
customStyles['failed-dodoable-trigger-text'] = extend('text-xs text-red-600');

const { tailwind, getColor } = create({ ...styles, ...customStyles });

function tw(...args) {
  if (args.flat) {
    args = args.flat()
  }

  const inlineStyles = args.filter((arg) => {
    return typeof arg == 'object';
  });

  args = args.filter((arg) => {
    return typeof arg != 'object' && arg.length > 0;
  });


  if (args.join) {
    args = args.join(" ")
  }

  return [...inlineStyles, tailwind(args)].reduce((styleSheet, style) => {
    return { ...styleSheet, ...style };
  }, {});
};

export { tailwind, getColor, tw };
