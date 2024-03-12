// WorkoutContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Exercise,
  FormType,
  WorkoutExercise,
  WorkoutExerciseAndExercise,
} from "../models/WorkoutModel";
import { getExerciseList } from "../services/ApiHandler";

interface WorkoutContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  exerciseList: Exercise[];
  userWorkouts: WorkoutExerciseAndExercise[];
  setUserWorkouts: Dispatch<SetStateAction<WorkoutExerciseAndExercise[]>>;
  formStatus: string;
  setFormStatus: Dispatch<SetStateAction<FormType>>;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkoutContext = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }
  return context;
};

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({
  children,
}) => {
  const [userWorkouts, setUserWorkouts] = useState<
    WorkoutExerciseAndExercise[]
  >([]);
  const [token, setToken] = useState("");
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [formStatus, setFormStatus] = useState<FormType>(FormType.Default);
  const [darkMode, setDarkMode] = useState(false);
  const darkModeLocal = localStorage.getItem("darkMode");
  const localToken = localStorage.getItem("token");

  const fetchExerciseList = async () => {
    const response = await getExerciseList(token);
    if (typeof response.data !== "string") {
      setExerciseList(response.data);
    }
  };
  useEffect(() => {
    if (token || formStatus === FormType.Exercise || localToken) {
      fetchExerciseList();
    }
  }, [token, formStatus]);

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
  };
  const initializeDarkTheme = (isDark: boolean) => {
    setDarkMode(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");

    if (storedDarkMode !== null) {
      initializeDarkTheme(storedDarkMode === "true");
    } else {
      initializeDarkTheme(false);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

      prefersDark.addEventListener("change", (mediaQuery) =>
        initializeDarkTheme(mediaQuery.matches)
      );
    }
  }, [darkMode]);

  return (
    <WorkoutContext.Provider
      value={{
        token,
        setToken,
        exerciseList,
        userWorkouts,
        setUserWorkouts,
        formStatus,
        setFormStatus,
        setDarkMode,
        darkMode,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
