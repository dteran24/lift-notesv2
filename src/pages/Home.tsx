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
import AddModal from "../components/Modals/FormModal";
import SideMenu from "../components/SideMenu";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getWorkoutExerciseList } from "../services/ApiHandler";
import WorkoutCard from "../components/WorkoutCard";
import FormModal from "../components/Modals/FormModal";

const Home = () => {
  const { token, userWorkouts, setUserWorkouts, setFormStatus } =
    useWorkoutContext();
  const [formModal, setFormModal] = useState(false);
  const [updateID, setUpdateID] = useState(0);

  useEffect(() => {
    const fetchData = async (token: string) => {
      let response = await getWorkoutExerciseList(token);
      setUserWorkouts(response.data);
    };
    if (token) {
      fetchData(token);
    }
  }, [token, formModal]);

  const modalHandler = () => {
    setFormModal((prevAddModal) => {
      // Toggle the previous value
      const newFormModal = !prevAddModal;

      // Set form status based on the new value
      setFormStatus(newFormModal ? "add" : "");

      return newFormModal;
    });
  };

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
          {!token ? (
            <div className={styles.buttonGroup}>
              <IonButton routerLink="/signin">Sign In</IonButton>
              <IonButton>Demo Account</IonButton>
            </div>
          ) : userWorkouts ? (
            userWorkouts.map((excercise) => {
              return (
                <WorkoutCard
                  workoutItem={excercise}
                  key={excercise.id}
                  setFormModal={setFormModal}
                  setUpdateID={setUpdateID}
                />
              );
            })
          ) : (
            "No items Found"
          )}
        </IonContent>
        {token ? (
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={modalHandler}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        ) : (
          ""
        )}
        <FormModal formModal={formModal} setFormModal={setFormModal} updateID={updateID} />
      </IonPage>
    </>
  );
};
export default Home;
