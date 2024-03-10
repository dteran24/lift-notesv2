import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useWorkoutContext } from "../../util/WorkoutContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormType, ToastModalState } from "../../models/WorkoutModel";

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
  const [modalToastHandler, setModalToastHandler] = useState<ToastModalState>({
    isOpen: false,
    message: "",
    error: false,
  });

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
          <IonTitle>
            {formStatus === FormType.Add
              ? "Add Workout"
              : formStatus === FormType.Update
              ? "Update Workout"
              : "Add Exercise"}
          </IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Form
          ExerciseList={exerciseList}
          cancelHandler={cancelHandler}
          updateID={updateID}
          setToastModalHandler ={setModalToastHandler}
        />
        <IonToast
          swipeGesture="vertical"
          isOpen={modalToastHandler.isOpen}
          message={modalToastHandler.message}
          onDidDismiss={() => setModalToastHandler((prev) => ({...prev, isOpen: false}))}
          duration={500}
          color={modalToastHandler.error ? "danger": "success"}
        ></IonToast>
      </IonContent>
    </IonModal>
  );
};
export default FormModal;
