import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, sadOutline } from "ionicons/icons";
import { useWorkoutContext } from "../util/WorkoutContext";
import SideMenu from "../components/SideMenu";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getWorkoutExerciseList } from "../services/ApiHandler";
import WorkoutCard from "../components/WorkoutCard";
import FormModal from "../components/Modals/FormModal";
import { FormType } from "../models/WorkoutModel";

const Home = () => {
  const { token, userWorkouts, setUserWorkouts, setFormStatus } =
    useWorkoutContext();
  const [formModal, setFormModal] = useState(false);
  const [updateID, setUpdateID] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        let response = await getWorkoutExerciseList(token);
        if (response) {
          setUserWorkouts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
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
      setFormStatus(newFormModal ? FormType.Add : FormType.Default);

      return newFormModal;
    });
  };
  if (loading && token) {
    return (
      <div className={styles.spinnerContainer}>
        <IonSpinner name="dots" color="primary"></IonSpinner>
      </div>
    );
  }

  return (
    <>
      {token && <SideMenu setFormModal={setFormModal} />}
      <IonPage id="main-content">
        {token && (
          <IonHeader>
            <IonToolbar>
              <IonTitle>Home</IonTitle>
              <IonButtons slot="primary">
                <IonMenuButton />
              </IonButtons>
            </IonToolbar>

            {/* <IonToolbar>
            
              <IonSearchbar></IonSearchbar>
            </IonToolbar> */}
          </IonHeader>
        )}
        <IonContent class="ion-padding">
          {!token ? (
            <div className={styles.loginGroup}>
              <h1 className={styles.header}>Lift Notes</h1>
              <div className={styles.buttonGroup}>
                <IonButton routerLink="/signin">Sign In</IonButton>
                <IonButton>Demo Account</IonButton>
              </div>
            </div>
          ) : userWorkouts.length > 0 ? (
            <IonList lines="none">
              {userWorkouts.map((excercise) => {
                return (
                  <WorkoutCard
                    key={excercise.id}
                    workoutItem={excercise}
                    setFormModal={setFormModal}
                    setUpdateID={setUpdateID}
                  />
                );
              })}
            </IonList>
          ) : (
            <div className={styles.iconContainer}>
              <IonIcon icon={sadOutline} aria-hidden="true" color="danger"></IonIcon>
              <span>There are no workouts!</span>
            </div>
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
        <FormModal
          formModal={formModal}
          setFormModal={setFormModal}
          updateID={updateID}
        />
      </IonPage>
    </>
  );
};
export default Home;
