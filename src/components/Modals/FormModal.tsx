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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  alertCircleOutline,
  checkboxOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import Form from "../Form";

type AddModalProps = {
  formModal: boolean;
  setFormModal: Dispatch<SetStateAction<boolean>>;
  updateID: number;
};

const FormModal = (props: AddModalProps) => {
  const { formModal, setFormModal, updateID } = props;
  const { exerciseList, formStatus } = useWorkoutContext();

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
    setFormModal(false);
  };
  // const [present] = useIonToast();

  // const presentToast = (position: "top" | "middle" | "bottom") => {
  //   if (valid) {
  //     present({
  //       message: "Workout Added!",
  //       duration: 1500,
  //       position: position,
  //       icon: checkmarkCircleOutline,
  //       color: "success",
  //       animated: true
  //     });
  //   } else {
  //     present({
  //       message: "Missing Information!",
  //       duration: 1500,
  //       position: position,
  //       icon: alertCircleOutline,
  //       color: "danger",
  //       animated: true
  //     });
  //   }
  // };
  // function isWorkoutValid(workout: Exercise) {
  //   return (
  //     workout.name !== undefined &&
  //     workout.reps !== undefined &&
  //     workout.weight !== undefined &&
  //     workout.sets !== undefined &&
  //     workout.genre !== undefined
  //   );
  // }
  // useEffect(() => {
  //   setValid(isWorkoutValid(workout));
  // }, [workout]);

  return (
    <IonModal isOpen={formModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => cancelHandler()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">
            {formStatus === "add" ? "Add Workout" : "Update Workout"}
          </IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Form ExerciseList={exerciseList} cancelHandler={cancelHandler} updateID={updateID} />
      </IonContent>
    </IonModal>
  );
};
export default FormModal;
