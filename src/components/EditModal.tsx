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
import { useWorkoutContext } from "../util/WorkoutContext";

interface EditCardModalProps {
  workoutItem: Exercise;
}

const EditModal = (props: EditCardModalProps) => {
  const { workoutItem } = props;
  const { setIsSubmitted, editModal, setEditModal } = useWorkoutContext();

  // Separate state variables for each input
  const [reps, setReps] = useState<number>(workoutItem.reps);
  const [sets, setSets] = useState<number>(workoutItem.sets);
  const [weight, setWeight] = useState<number>(workoutItem.weight);
  const [notes, setNotes] = useState<string>(workoutItem.notes);

  const submitHandler = () => {
    const updatedWorkout: Exercise = {
      ...workoutItem,
      reps: reps,
      sets: sets,
      weight: weight,
      notes: notes,
    };

    editWorkout(updatedWorkout.id, updatedWorkout)
      .then((response) => {
        console.log("API Response:", response.data);
        setIsSubmitted(true);
        setEditModal(false);
        
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  return (
    <IonModal isOpen={editModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setEditModal(false)}>Cancel</IonButton>
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
              label=""
              type="number"
              placeholder="Reps"
              value={reps.toString()} // Convert to string for IonInput
              onIonChange={(e) => setReps(parseInt(e.detail.value || "0", 10))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sets</IonLabel>
            <IonInput
              label=""
              type="number"
              placeholder="Sets"
              value={sets.toString()} // Convert to string for IonInput
              onIonChange={(e) => setSets(parseInt(e.detail.value || "0", 10))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Weight</IonLabel>
            <IonInput
              label=""
              type="number"
              placeholder="Weight"
              value={weight.toString()} // Convert to string for IonInput
              onIonChange={(e) =>
                setWeight(parseInt(e.detail.value || "0", 10))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput
              label=""
              type="text"
              placeholder="Notes"
              value={notes}
              onIonChange={(e) => setNotes(e.detail.value!)}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
