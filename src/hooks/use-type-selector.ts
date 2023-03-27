import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { ApplicationState } from "../store";

export const useTypeSelector : TypedUseSelectorHook<ApplicationState> = useSelector;