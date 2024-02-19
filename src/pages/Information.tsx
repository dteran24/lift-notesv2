import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  getHistoryByUserId,
  getWorkoutExerciseById,
} from "../services/ApiHandler";
import {
  ExerciseHistory,
  WorkoutExerciseAndExercise,
} from "../models/WorkoutModel";

const Information = () => {
  const match = useRouteMatch<{ id: string }>({
    path: "/information/:id",
    exact: true,
  });
  const id = match?.params.id;
  const [selectedSegment, setSelectedSegment] = useState<string>("history");
  const [data, setData] = useState<WorkoutExerciseAndExercise>();
  const [history, setHistory] = useState<ExerciseHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      if (id && token && !data) {
        try {
          let response = await getWorkoutExerciseById(token, parseInt(id));
          let responseHistory = await getHistoryByUserId(token);
          console.log(responseHistory);

          setData(response.data);

          setHistory(responseHistory.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);
  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value || "history");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
            <IonSegmentButton value="history">
              <IonLabel>History</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="exercise">
              <IonLabel>Exercise</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedSegment === "history" && history.length > 0 ? (
          <IonList>
            {history.map((item) => {
              return (
                <IonItem key={item.id}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{item.creationDate}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>

                    </IonCardContent>
                  </IonCard>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          "No History!"
        )}

        {selectedSegment === "exercise" && (
          <div>
            <h2>{data?.exercise.name}</h2>
            <p>{data?.exercise.description}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default Information;
