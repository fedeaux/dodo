export default function useBoolState(initial = false) {
  const [value, setValue] = useState(true);

  const setTrue = useCallback(() => {
    return setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    return setValue(false);
  }, []);

  return [value, setFalse, setTrue];
}
