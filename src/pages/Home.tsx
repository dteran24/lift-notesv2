import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import WorkoutList from "../components/WorkoutList";
import mockData from '../MockData.json'
import { useEffect, useState } from "react";
import { getWorkoutList} from "../services/ApiHandler";

const Home = () => {
  const [workoutList, setWorkoutList] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getWorkoutList().then(response => setWorkoutList(response.data)).catch(error => console.error(error))
    setLoading(false)
  },[])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? <div>Loading...</div>:  <WorkoutList data={workoutList} /> }
      </IonContent>
    </IonPage>
  );
};
export default Home;
