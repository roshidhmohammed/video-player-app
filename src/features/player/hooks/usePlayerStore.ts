import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

const usePlayerStore = () => {
  const currentTime = useSelector(
    (state: RootState) => state.player.currentTime,
  );
  return { currentTime };
};

export default usePlayerStore;
