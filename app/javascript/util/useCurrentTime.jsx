import BackgroundTimer from "lib/background-timer";

export default function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => BackgroundTimer.clearInterval(timer);
  }, []);

  return currentTime;
}
