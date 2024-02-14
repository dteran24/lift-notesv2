import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getWorkoutExerciseById } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";

const Information = () => {
  const [loading, setLoading] = useState(true);

  const match = useRouteMatch<{ id: string }>({
    path: "/information/:id",
    exact: true,
  });
  const id = match?.params.id;

  console.log(match?.params);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      if (id && token) {
        try {
          let response = await getWorkoutExerciseById(token, parseInt(id));
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <IonPage>
      <IonContent>info here</IonContent>
    </IonPage>
  );
};
export default Information;
