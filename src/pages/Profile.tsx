import {
  IonBackButton,
  IonButtons,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import User from "../components/User";
const Profile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton defaultHref=""></IonBackButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <User/>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
