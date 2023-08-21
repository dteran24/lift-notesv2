import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Exercise } from "../models/WorkoutModel";
import { useState } from "react";
import { editWorkout } from "../services/ApiHandler";
interface editCardModalProps {
  isOpen: boolean;
  setOpenModal: any;
  workoutItem: Exercise;
}

const EditModal = (props: editCardModalProps) => {
  const { workoutItem, isOpen, setOpenModal } = props;
  const [workout, setWorkout] = useState<Exercise>(workoutItem);

  const submitHandler = () => {
    editWorkout(workout.id, workout)
      .catch((error) => console.error(error));
    setOpenModal(false);
  };
  const handleInputChange = (
    event: CustomEvent<InputChangeEventDetail>,
    propertyName: string
  ) => {
    const { value } = event.detail;
    setWorkout((prevExercise) => ({
      ...prevExercise,
      [propertyName.toLowerCase()]:
        propertyName === "Reps" ||
        propertyName === "Sets" ||
        propertyName === "Weight"
          ? parseInt(value || "0", 10)
          : value,
    }));
  };
  

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setOpenModal(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => submitHandler()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
          <IonItem>
            <IonLabel position="stacked">Reps</IonLabel>
            <IonInput
              type="number"
              placeholder="Reps"
              value={workout.reps}
              onIonChange={(e) => handleInputChange(e, "Reps")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sets</IonLabel>
            <IonInput
              type="number"
              placeholder="Sets"
              value={workout.sets}
              onIonChange={(e) => handleInputChange(e, "Sets")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Weight</IonLabel>
            <IonInput
              type="number"
              placeholder="Weight"
              value={workout.weight}
              onIonChange={(e) => handleInputChange(e, "Weight")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput
              type="text"
              placeholder="Notes"
              value={workout.notes}
              onIonChange={(e) => handleInputChange(e, "Notes")}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonModal>
  );
};
export default EditModal;
