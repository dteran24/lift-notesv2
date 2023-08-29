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
  IonList,
  useIonToast,
} from "@ionic/react";
import EditModal from "./Modals/EditModal";
import "./workoutCard.css";
import { createOutline, trash, checkmarkCircleOutline } from "ionicons/icons";
import { Exercise } from "../models/WorkoutModel";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { removeWokout } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";
interface WorkoutCardProps {
  workoutItem: Exercise;
  setSelectedCard: Dispatch<SetStateAction<Exercise>>;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem, setSelectedCard } = props;
  const { setIsDeleted, setEditModal, setHistoryModal } = useWorkoutContext();

  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [present] = useIonToast();

  const onClickEditModalHandler = (workout: Exercise) => {
    setSelectedCard(workout);
    setEditModal(true);
    if (slidingRef.current) {
      slidingRef.current.close();
    }
  };
  const onClickHistoryModalHandler = (workout: Exercise) => {
    setSelectedCard(workout);
    setHistoryModal(true);
    if (slidingRef.current) {
      slidingRef.current.close();
    }
  };
  const onClickDeleteHandler = (id: string | undefined) => {
    if (id !== undefined) {
      removeWokout(id)
        .then((response) => {
          console.log(response.data);
          if (slidingRef.current) {
            slidingRef.current.close();
          }
          setIsDeleted(true);
        })
        .catch((err) => console.log(err))
        .finally(() => presentToast("bottom"));
    }
    console.log("id is undefined");
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

  return (
    <>
      <IonList lines="none" className="sliding-options">
        <IonItemSliding ref={slidingRef}>
          <IonItemOptions side="start">
            <IonItemOption
              color="danger"
              onClick={() => onClickDeleteHandler(workoutItem.id)}
            >
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => onClickEditModalHandler(workoutItem)}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItem lines="none">
            <IonCard
              className="card"
              onClick={() => onClickHistoryModalHandler(workoutItem)}
            >
              <IonCardHeader>
                <IonCardTitle>{workoutItem.name}</IonCardTitle>
                <IonCardSubtitle>{`Last Updated: ${workoutItem.date}`}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="card-content">
                <IonList className="ion-list" lines="full">
                  <IonItem>{`Reps: ${workoutItem.reps}`}</IonItem>
                  <IonItem>{`Sets: ${workoutItem.sets}`}</IonItem>
                  <IonItem>{`Weight: ${workoutItem.weight}`}</IonItem>
                  <IonItem>{`Notes: ${workoutItem.notes}`}</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonItem>
        </IonItemSliding>
      </IonList>
    </>
  );
};
export default WorkoutCard;
