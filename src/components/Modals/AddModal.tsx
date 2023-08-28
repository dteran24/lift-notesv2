import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useWorkoutContext } from "../../util/WorkoutContext";
import { useState } from "react";
import { Exercise } from "../../models/WorkoutModel";
import { addWorkout } from "../../services/ApiHandler";
import Form from "../Form";

const AddModal = () => {
  const { addModal, setAddModal, setIsAdded } = useWorkoutContext();
  const [workout, setWorkout] = useState<Exercise>({});
  const submitHandler = () => {
    addWorkout(workout)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setAddModal(false);
          setIsAdded(true);
        setWorkout({})
        console.log('reset',workout)
      });
  };
  const cancelHandler = () => {
    setAddModal(false);
    setWorkout({});
  }
  return (
    <IonModal isOpen={addModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => cancelHandler()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => submitHandler()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Form workout={workout} setWorkout={setWorkout} />
      </IonContent>
    </IonModal>
  );
};
export default AddModal;
