import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import WorkoutList from "../components/WorkoutList";
import { personCircle, add } from "ionicons/icons";
import { useWorkoutContext } from "../util/WorkoutContext";
import AddModal from "../components/Modals/AddModal";
import SideMenu from "../components/SideMenu";
import styles from "./Home.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { getExerciseList, getWorkoutExerciseList } from "../services/ApiHandler";
import WorkoutCard from "../components/WorkoutCard";
import { Exercise, WorkoutExerciseList } from "../models/WorkoutModel";
import { formToJSON } from "axios";

const Home = () => {
  const { token, exerciseList, userWorkouts, setUserWorkouts} =
    useWorkoutContext();
    const [addModal, setAddModal] = useState(false);
  
  useEffect(() => {
    const fetchData = async (token: string) => {
      let response = await getWorkoutExerciseList(token);
      setUserWorkouts(response.data);
      console.log(response.data);
    }
    if (token) {
      fetchData(token);
    }
  
  },[token, addModal])
  
  
  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton routerLink="/profile">
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
        <IonContent>
          {!token ? <div className={styles.buttonGroup}>
            <IonButton routerLink="/signin">Sign In</IonButton>
            <IonButton>Demo Account</IonButton>
          </div> : userWorkouts ? (
            userWorkouts.map(excercise => {
              return (
                <WorkoutCard workoutItem={excercise} key={excercise.id} />
              )
            })
          ):"No items Found" 
        }
        </IonContent>
        {token ? (
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={() => setAddModal(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        ) : (
          ""
        )}
        <AddModal addModal={addModal} setAddModal={setAddModal} />
      </IonPage>
    </>
  );
};
export default Home;
