import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonList,
  useIonToast,
  IonActionSheet,
  useIonRouter,
} from "@ionic/react";

import {
  informationCircleOutline,
  colorWandOutline,
  trashOutline
} from "ionicons/icons";
import { FormType, WorkoutExerciseList } from "../models/WorkoutModel";
import styles from "./workoutCard.module.css";
import { removeWorkoutExercise } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";
import { Dispatch, SetStateAction } from "react";

interface WorkoutCardProps {
  workoutItem: WorkoutExerciseList;
  setFormModal: Dispatch<SetStateAction<boolean>>;
  setUpdateID: Dispatch<SetStateAction<number>>;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem, setFormModal, setUpdateID } = props;
  const { token, setUserWorkouts, setFormStatus } = useWorkoutContext();
  const router = useIonRouter();

  const editHandler = () => {
    setFormStatus(FormType.Update);
    setUpdateID(workoutItem.id);
    setFormModal(true);
  };

  const deleteHandler = async (id: number) => {
    if (id !== undefined) {
      let response = await removeWorkoutExercise(id, token);
      setUserWorkouts((prev) => prev.filter((workout) => workout.id !== id));
      console.log(response.data);
    }
  };

  const informationHandler = () => {
    router.push(`/information/${workoutItem.id.toString()}`)
  }

  return (
    <IonCard id={workoutItem.id.toString()} className={styles.card}>
      <IonCardHeader>
        <IonCardTitle className={styles.title}>
          {workoutItem.exercise.name}
        </IonCardTitle>
        {workoutItem.lastUpdated && (
          <IonCardSubtitle>{`Last Updated: ${workoutItem.lastUpdated}`}</IonCardSubtitle>
        )}
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
        </IonList>
      </IonCardContent>
      <IonActionSheet
        trigger={workoutItem.id.toString()}
        header="Card Actions"
        buttons={[
          {
            icon: trashOutline,
            text: "Delete",
            role: "destructive",
            data: {
              action: "delete",
            },
            handler: () => deleteHandler(workoutItem.id),
          },
          {
            icon: colorWandOutline,
            text: "Update",
            data: {
              action: "update",
            },
            handler: () => editHandler(),
          },
          {
            icon:informationCircleOutline,
            text: "Information",
            data: {
              action: "information",
            },
            handler: () => informationHandler()
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
