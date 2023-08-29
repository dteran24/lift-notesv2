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
  useIonToast,
} from "@ionic/react";

import { Exercise } from "../../models/WorkoutModel";
import { useEffect, useState } from "react";
import { editWorkout } from "../../services/ApiHandler";
import { useWorkoutContext } from "../../util/WorkoutContext";
import { checkmarkCircleOutline } from "ionicons/icons";
import Form from "../Form";

interface EditCardModalProps {
  workoutItem: Exercise;
}

const EditModal = (props: EditCardModalProps) => {
  const { setIsSubmitted, editModal, setEditModal } = useWorkoutContext();
  const { workoutItem } = props;
  const [updatedWorkout, setUpdatedWorkout] = useState<Exercise>(workoutItem);

  const submitHandler = () => {
    if (updatedWorkout.id) {
      editWorkout(updatedWorkout.id, updatedWorkout)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsSubmitted(true);
          setEditModal(false);
          presentToast("bottom");
        });
    }
  };
  const cancelHandler = () => {
    setEditModal(false);
    setUpdatedWorkout(workoutItem);
  };
  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Workout Updated!",
      duration: 1500,
      position: position,
      icon: checkmarkCircleOutline,
      color: "success",
      animated: true,
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
            <IonButton onClick={() => cancelHandler()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">Edit Workout</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => submitHandler()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Form workout={updatedWorkout} setWorkout={setUpdatedWorkout} />
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
