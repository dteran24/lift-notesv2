import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import WorkoutList from "../components/WorkoutList";
import mockData from '../MockData.json'

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
              <WorkoutList data={mockData} />
      </IonContent>
    </IonPage>
  );
};
export default Home;
