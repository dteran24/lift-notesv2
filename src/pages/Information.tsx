import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
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
import styles from "./Information.module.css";

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
      <IonContent class="ion-padding">
        {selectedSegment === "history" && history.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                {Object.keys(history[0]).map((label) => {
                  if (label === "creationDate") {
                    label = "Date"
                  }

              
                  return <th>{label.toUpperCase()}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                return (
                  <tr key={item.id}>
                    {Object.values(item).map((value) => {
                      return <td>{value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : selectedSegment === "history" ? (
          "No Data!"
        ) : (
          ""
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
