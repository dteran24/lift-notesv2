import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import styles from "./About.module.css";
import { useHistory } from "react-router-dom";
const About = () => {
  let history = useHistory();
  const buttonHandler = () => {
    history.push("/");
  };
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>What is LiftNotes?</h1>
        <p>
          LiftNotes is an app where you can keep track of your lifts! Add,
          update and delete your lifts will allow you to keep track of your own
          goals!
        </p>
        <h1>Why LiftNotes?</h1>
        <p>
          I am a full-stack developer that likes creating projects. I use Google
          Keep to keep track of my lifts and decided why not create an app for
          me?
        </p>
        <IonList>
          <IonListHeader>
            <IonLabel className={styles.listHeader}>Future Updates</IonLabel>
          </IonListHeader>
          <IonItem>Ability to remove custom exercises</IonItem>
          <IonItem>New Design</IonItem>
          <IonItem>Optional way to add weight by plates</IonItem>
          <IonItem>Add muscle targets for each exercise</IonItem>
          <IonItem>Oauth / Sign in with google account</IonItem>
          <IonItem>Customize list order</IonItem>
        </IonList>

        <IonButton className={styles.backBttn} onClick={buttonHandler}>
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default About;
