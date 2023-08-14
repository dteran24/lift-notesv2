import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import WorkoutList from "../components/WorkoutList";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <WorkoutList />
      </IonContent>
    </IonPage>
  );
};
export default Home;
