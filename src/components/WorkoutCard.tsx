import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonList,
  useIonToast,
  IonActionSheet,
} from "@ionic/react";

import {
  createOutline,
  trash,
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Exercise, WorkoutExerciseList } from "../models/WorkoutModel";

// import required modules
import { Navigation } from "swiper/modules";
import styles from "./workoutCard.module.css";
import { removeWorkoutExercise } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";
interface WorkoutCardProps {
  workoutItem: WorkoutExerciseList;
  // setSelectedCard: Dispatch<SetStateAction<Exercise>>;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  const { token, setUserWorkouts} = useWorkoutContext();

  const [present] = useIonToast();

  // const onClickEditModalHandler = (workout: Exercise) => {
  //   setSelectedCard(workout);
  //   setEditModal(true);
  //   if (slidingRef.current) {
  //     slidingRef.current.close();
  //   }
  // };
  // const onClickHistoryModalHandler = (workout: Exercise) => {
  //   setSelectedCard(workout);
  //   setHistoryModal(true);
  //   if (slidingRef.current) {
  //     slidingRef.current.close();
  //   }
  // };
  const deleteHandler = async(id: number) => {
    if (id !== undefined) {
      let response = await removeWorkoutExercise(id, token);
      setUserWorkouts(prev => prev.filter(workout => workout.id !== id));
      console.log(response.data);
    }
  };
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Workout Deleted!",
      duration: 1500,
      position: position,
      icon: checkmarkCircleOutline,
      color: "success",
      animated: true,
    });
  };
  console.log(workoutItem);
  return (
    <IonCard
      id="open-action-sheet"
      className={styles.card}
      // onClick={() => onClickHistoryModalHandler(workoutItem)}
    >
      <IonCardHeader>
        <IonCardTitle className={styles.title}>
          {workoutItem.exercise.name}
          <IonIcon
            icon={informationCircleOutline}
            size="medium"
            color="medium"
          ></IonIcon>
        </IonCardTitle>
        {/* <IonCardSubtitle>{`Last Updated: ${workoutItem.date}`}</IonCardSubtitle> */}
      </IonCardHeader>
      <IonCardContent className={styles.content}>
        <IonList lines="none" className={styles.list}>
          <IonItem className="ion-no-padding">
            <div className={styles.item}>
              <label className={styles.label}>Reps</label>
              {workoutItem.reps}
            </div>
          </IonItem>
          <IonItem className="ion-no-padding">
            <div className={styles.item}>
              <label>Sets</label>
              {workoutItem.sets}
            </div>
          </IonItem>
          <IonItem className="ion-no-padding">
            <div className={styles.item}>
              <label>Weight</label>
              {workoutItem.weight}
            </div>
          </IonItem>
          {/* <IonItem>{`Notes: ${workoutItem.notes}`}</IonItem> */}
        </IonList>
      </IonCardContent>
      <IonActionSheet
        trigger="open-action-sheet"
        header="Actions"
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            data: {
              action: "delete",
            },
            handler: () => deleteHandler(workoutItem.id)
          },
          {
            text: "Update",
            data: {
              action: "update",
            },
          },
          {
            text: "More Info",
            data: {
              action: "information",
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ]}
      ></IonActionSheet>
    </IonCard>
  );
};
export default WorkoutCard;
