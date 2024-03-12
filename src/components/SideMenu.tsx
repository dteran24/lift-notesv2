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
import { informationCircle, settings, barbell, enterOutline } from "ionicons/icons";
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

  const signOutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();

  }

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
            <IonItem>
              <IonIcon icon={barbell} slot="start" />
              Add Exercise
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/settings">
              <IonIcon icon={settings} slot="start" />
              Settings
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>
              <IonIcon icon={informationCircle} slot="start" />
              About
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle onClick={signOutHandler}>
            <IonItem>
              <IonIcon icon={enterOutline} slot="start" />
              Sign Out
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
export default SideMenu;
