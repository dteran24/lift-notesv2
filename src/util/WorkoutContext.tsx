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
import { WorkoutCategory } from "../models/WorkoutModel";
import { getWorkoutList } from "../services/ApiHandler";

interface WorkoutContextType {
  workoutListData: WorkoutCategory[];
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
  setIsAdded: Dispatch<SetStateAction<boolean>>;
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
  editModal: boolean;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
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
  const [workoutListData, setWorkoutListData] = useState<WorkoutCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  // Fetch initial data from the API
  useEffect(() => {
    setIsLoading(true);
    getWorkoutList()
      .then((response) => {
        setWorkoutListData(response.data);
      })

      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        setIsSubmitted(false);
        setIsDeleted(false);
        setIsAdded(false);
      });
  }, [isSubmitted, isDeleted, isAdded]);

  return (
    <WorkoutContext.Provider
      value={{
        workoutListData,
        setIsSubmitted,
        isLoading,
        setIsDeleted,
        setIsAdded,
        addModal,
        setAddModal,
        editModal,
        setEditModal,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
