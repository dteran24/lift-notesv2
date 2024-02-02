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
import { Exercise, WorkoutCategory } from "../models/WorkoutModel";
import { getExerciseList } from "../services/ApiHandler";
// import { getWorkoutList } from "../services/ApiHandler";

interface WorkoutContextType {
  // workoutListData: WorkoutCategory[];
  // setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  // setIsDeleted: Dispatch<SetStateAction<boolean>>;
  // setIsAdded: Dispatch<SetStateAction<boolean>>;
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
  // editModal: boolean;
  // setEditModal: Dispatch<SetStateAction<boolean>>;
  // historyModal: boolean;
  // setHistoryModal: Dispatch<SetStateAction<boolean>>;
  // isLoading: boolean;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  exerciseList: Exercise[];
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
  // const [workoutListData, setWorkoutListData] = useState<WorkoutCategory[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const [isAdded, setIsAdded] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [token, setToken] = useState("");
  const [exerciseList, setExerciseList] = useState<Exercise[] >([]);

  // Fetch initial data from the API
  // useEffect(() => {
  //   setIsLoading(true);
  //   getWorkoutList()
  //     .then((response) => {
  //       setWorkoutListData(response.data);
  //     })

  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       setIsLoading(false);
  //       setIsSubmitted(false);
  //       setIsDeleted(false);
  //       setIsAdded(false);
  //     });
  // }, [isSubmitted, isDeleted, isAdded]);

  useEffect(() => {
    const fetchExerciseList = async () => {
      const response = await getExerciseList(token);
      if (typeof response.data !== "string") {
        setExerciseList(response.data);
      }
      console.log("response is", response);
    };

    if (token) {
      fetchExerciseList();
    }
  }, [token]);

  return (
    <WorkoutContext.Provider
      value={{
        // workoutListData,
        // setIsSubmitted,
        // isLoading,
        // setIsDeleted,
        // setIsAdded,
        addModal,
        setAddModal,
        // editModal,
        // setEditModal,
        // historyModal,
        // setHistoryModal,
        token,
        setToken,
        exerciseList,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
