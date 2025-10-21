import type { AppStore, AppDispatch, RootState } from "./store";
import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();

