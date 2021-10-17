import BackgroundTimer from "lib/background-timer";
import SoundAdapter from "lib/sound-adapter";
import TickMp3 from "assets/sound/tick.mp3";
import Button from "ui/controls/button";

export default class Metronome extends React.Component {
  constructor() {
    super();
    this.milisecondsPerBeat = 60000.0 / 80;
    this.TickAudio = SoundAdapter(TickMp3);
    this.state = { interval: null };
    this.toggleSound = this.toggleSound.bind(this);
  }

  toggleSound() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    } else {
      const interval = BackgroundTimer.setInterval(() => {
        this.TickAudio.play();
      }, this.milisecondsPerBeat);

      this.setState({ interval });
    }
  }

  render() {
    return (
      <Button
        onClick={this.toggleSound}
        label={"Toggle"}
        style={tw("text-lg bg-blue-400 p-4")}
      />
    );
  }
}
