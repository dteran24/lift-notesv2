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
import { FormType} from "../../models/WorkoutModel";

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

  const cancelHandler = () => {
    setFormModal(false);
  };


  return (
    <IonModal isOpen={formModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => cancelHandler()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle className="ion-text-center">
            {formStatus === FormType.Add ? "Add Workout" : formStatus === FormType.Update ? "Update Workout": "Add Exercise"}
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
