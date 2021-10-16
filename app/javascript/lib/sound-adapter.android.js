import Sound from 'react-native-sound';
// Sound.setCategory('Ring') # <= Removing this prevents Dodo from stopping spotify
Sound.setCategory('Playback');

export default function (audio) {
  return new Sound(audio, Sound.MAIN_BUNDLE);
};
