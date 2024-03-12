import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useWorkoutContext } from "../util/WorkoutContext";
import styles from "./Settings.module.css";
const Settings = () => {
  const { setDarkMode, darkMode } = useWorkoutContext();

  const toggleChange = (ev: ToggleCustomEvent) => {
    setDarkMode(ev.detail.checked);
    localStorage.setItem("darkMode", ev.detail.checked.toString());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonToggle
            justify="space-between"
            checked={darkMode}
            onIonChange={toggleChange}
          >
            Dark Mode
          </IonToggle>
        </IonItem>

        <IonButton className={styles.button} routerLink="/home" expand="full" fill="solid">
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Settings;
