import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonToast,
} from "@ionic/react";

import { createOutline, trash, checkmarkCircleOutline } from "ionicons/icons";
import { Exercise, WorkoutExerciseList } from "../models/WorkoutModel";
import { Dispatch, SetStateAction, useRef } from "react";
import styles from "./workoutCard.module.css"
interface WorkoutCardProps {
  workoutItem: WorkoutExerciseList;
  // setSelectedCard: Dispatch<SetStateAction<Exercise>>;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  // const { setIsDeleted, ,  } = useWorkoutContext();

  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
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
  // const onClickDeleteHandler = (id: string | undefined) => {
  //   if (id !== undefined) {
  //     removeWokout(id)
  //       .then((response) => {
  //         console.log(response.data);
  //         if (slidingRef.current) {
  //           slidingRef.current.close();
  //         }
  //         setIsDeleted(true);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => presentToast("bottom"));
  //   }
  //   console.log("id is undefined");
  // };
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
      className={styles.card}
      // onClick={() => onClickHistoryModalHandler(workoutItem)}
    >
      <IonCardHeader>
        <IonCardTitle>{workoutItem.exercise.name}</IonCardTitle>
        {/* <IonCardSubtitle>{`Last Updated: ${workoutItem.date}`}</IonCardSubtitle> */}
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <label className={styles.label}>Reps:</label>
              {workoutItem.reps}
              
          </IonItem>
          <IonItem>
            <label>Sets: </label>
            {workoutItem.sets}
          </IonItem>
          <IonItem>
            <label>Weight: </label>
            {workoutItem.weight}
          </IonItem>
          {/* <IonItem>{`Notes: ${workoutItem.notes}`}</IonItem> */}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default WorkoutCard;
