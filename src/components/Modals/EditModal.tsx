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

import { Exercise } from "../../models/WorkoutModel";
import { useEffect, useState } from "react";
import { editWorkout } from "../../services/ApiHandler";
import { useWorkoutContext } from "../../util/WorkoutContext";

interface EditCardModalProps {
  workoutItem: Exercise;
}

const EditModal = (props: EditCardModalProps) => {
  const { setIsSubmitted, editModal, setEditModal } = useWorkoutContext();
  const { workoutItem } = props;
  const [updatedWorkout, setUpdatedWorkout] = useState<Exercise>(workoutItem);
  const submitHandler = () => {
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
      });
  };
  useEffect(() => {
    setUpdatedWorkout(workoutItem);
  }, [workoutItem]);

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
              value={updatedWorkout.name} // Convert to string for IonInput
              onIonInput={(e) =>
                setUpdatedWorkout({
                  ...updatedWorkout,
                  name: e.detail.value || "",
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Reps</IonLabel>
            <IonInput
              aria-label="reps"
              type="number"
              placeholder="Reps"
              value={updatedWorkout.reps} // Convert to string for IonInput
              onIonInput={(e) =>
                setUpdatedWorkout({
                  ...updatedWorkout,
                  reps: Number(e.detail.value || 0),
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sets</IonLabel>
            <IonInput
              aria-label="sets"
              type="number"
              placeholder="Sets"
              value={updatedWorkout.sets} // Convert to string for IonInput
              onIonInput={(e) =>
                setUpdatedWorkout({
                  ...updatedWorkout,
                  sets: Number(e.detail.value || 0),
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Weight</IonLabel>
            <IonInput
              aria-label="weight"
              type="number"
              placeholder="Weight"
              value={updatedWorkout.weight} // Convert to string for IonInput
              onIonInput={(e) =>
                setUpdatedWorkout({
                  ...updatedWorkout,
                  weight: Number(e.detail.value || 0),
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput
              aria-label="notes"
              type="text"
              placeholder="Notes"
              value={updatedWorkout.notes}
              onIonInput={(e) =>
                setUpdatedWorkout({
                  ...updatedWorkout,
                  notes: e.detail.value || "",
                })
              }
            />
          </IonItem>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
