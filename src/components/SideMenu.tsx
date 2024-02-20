import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonList,
  IonMenuToggle,
  IonIcon,
} from "@ionic/react";
import { informationCircle, settings, barbell } from "ionicons/icons";
import { useWorkoutContext } from "../util/WorkoutContext";
import { Dispatch, SetStateAction } from "react";
import { FormType } from "../models/WorkoutModel";

type SideMenuProps = {
  setFormModal: Dispatch<SetStateAction<boolean>>;
};

const SideMenu = (props: SideMenuProps) => {
  const { setFormModal } = props;

  const { setFormStatus } = useWorkoutContext();

  const addExerciseHandler = () => {
    setFormStatus(FormType.Exercise);
    setFormModal(true);
  };

  return (
    <IonMenu type="overlay" side="end" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="inset">
          <IonMenuToggle onClick={addExerciseHandler}>
            <IonItem routerDirection="forward">
              <IonIcon icon={barbell} slot="start" />
              Add Exercise
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerDirection="forward" disabled>
              <IonIcon icon={settings} slot="start" />
              Settings
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerDirection="forward" disabled>
              <IonIcon icon={informationCircle} slot="start" />
              About
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
export default SideMenu;
