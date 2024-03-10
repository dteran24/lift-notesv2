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
  // useEffect(() => {
  //   fetchExerciseList();
  // }, []);

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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
