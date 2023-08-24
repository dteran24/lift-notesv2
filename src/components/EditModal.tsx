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
import { useEffect, useState } from "react";
import { editWorkout } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";

interface EditCardModalProps {
  workoutItem: Exercise | null;
}

const EditModal = (props: EditCardModalProps) => {
  const { setIsSubmitted, editModal, setEditModal } = useWorkoutContext();
  const { workoutItem: initialWorkoutItem } = props;

  // Use state to track the current workoutItem being edited
  const [workoutItem, setWorkoutItem] = useState<Exercise | null>(
    initialWorkoutItem
  );

  useEffect(() => {
    setWorkoutItem(initialWorkoutItem);
    setReps(initialWorkoutItem?.reps || 0);
    setSets(initialWorkoutItem?.sets || 0);
    setWeight(initialWorkoutItem?.weight || 0);
    setNotes(initialWorkoutItem?.notes || "");
  }, [initialWorkoutItem]);
  // Separate state variables for each input
  const [name, setName] = useState<string>(workoutItem?.name || "");
  const [reps, setReps] = useState<number>(workoutItem?.reps || 0);
  const [sets, setSets] = useState<number>(workoutItem?.sets || 0);
  const [weight, setWeight] = useState<number>(workoutItem?.weight || 0);
  const [notes, setNotes] = useState<string>(workoutItem?.notes || "");

  const submitHandler = () => {
    console.log(workoutItem)
    if (!workoutItem) {
      // Handle the case when workoutItem is null (initial state)
      return;
    }
    const updatedWorkout: Exercise = {
      ...workoutItem,
      name: name,
      reps: reps,
      sets: sets,
      weight: weight,
      notes: notes,
    };
    console.log("updated: ", updatedWorkout);
    
    editWorkout(updatedWorkout.id, updatedWorkout)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      })
      .finally(() => {
        setIsSubmitted(true);
        setEditModal(false);
        setReps(0);
        setSets(0);
        setWeight(0);
        setNotes("");
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
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              aria-label="name"
              type="text"
              placeholder="Name"
              value={name} // Convert to string for IonInput
              onIonInput={(e) => setName(e.detail.value || "")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Reps</IonLabel>
            <IonInput
              aria-label="reps"
              type="number"
              placeholder="Reps"
              value={reps} // Convert to string for IonInput
              onIonChange={(e) => setReps(parseInt(e.detail.value || "0", 10))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sets</IonLabel>
            <IonInput
              aria-label="sets"
              type="number"
              placeholder="Sets"
              value={sets} // Convert to string for IonInput
              onIonInput={(e) => setSets(parseInt(e.detail.value || "0", 10))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Weight</IonLabel>
            <IonInput
              aria-label="weight"
              type="number"
              placeholder="Weight"
              value={weight} // Convert to string for IonInput
              onIonInput={(e) =>
                setWeight(parseInt(e.detail.value || "0", 10))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput
              aria-label="notes"
              type="text"
              placeholder="Notes"
              value={notes}
              onIonInput={(e) => setNotes(e.detail.value || "")}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
