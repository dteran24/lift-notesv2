import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";

const Settings = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonToggle justify="space-between">Dark Mode</IonToggle>
        </IonItem>

        <IonButton routerLink="/home" shape="round" expand="full" fill="solid">
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Settings;
