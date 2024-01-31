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
  useIonToast,
} from "@ionic/react";
import { useWorkoutContext } from "../../util/WorkoutContext";
import { useEffect, useState } from "react";
import { Exercise } from "../../models/WorkoutModel";
// import { addWorkout } from "../../services/ApiHandler";
import {
  alertCircleOutline,
  checkboxOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import Form from "../Form";

const AddModal = () => {
  const { addModal, setAddModal, setIsAdded } = useWorkoutContext();
  const [workout, setWorkout] = useState<Exercise>({});
  const [valid, setValid] = useState<boolean>(false);
  // const submitHandler = () => {
  //   if (valid) {
  //     addWorkout(workout)
  //       .then((response) => console.log(response.data))
  //       .catch((error) => console.log(error))
  //       .finally(() => {
  //         setAddModal(false);
  //         setIsAdded(true);
  //         setWorkout({});
  //         setValid(false);
  //         presentToast("bottom");
  //       });
  //   } else {
  //     presentToast("bottom");
  //   }
  // };
  const cancelHandler = () => {
    setAddModal(false);
    setWorkout({});
  };
  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom") => {
    if (valid) {
      present({
        message: "Workout Added!",
        duration: 1500,
        position: position,
        icon: checkmarkCircleOutline,
        color: "success",
        animated: true
      });
    } else {
      present({
        message: "Missing Information!",
        duration: 1500,
        position: position,
        icon: alertCircleOutline,
        color: "danger",
        animated: true
      });
    }
  };
  function isWorkoutValid(workout: Exercise) {
    return (
      workout.name !== undefined &&
      workout.reps !== undefined &&
      workout.weight !== undefined &&
      workout.sets !== undefined &&
      workout.genre !== undefined
    );
  }
  useEffect(() => {
    setValid(isWorkoutValid(workout));
  }, [workout]);
  return (
    <IonModal isOpen={addModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => cancelHandler()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">Add Workout</IonTitle>
          <IonButtons slot="end">
            {/* <IonButton strong={true} onClick={() => submitHandler()} color="primary">
              Confirm
            </IonButton> */}
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
