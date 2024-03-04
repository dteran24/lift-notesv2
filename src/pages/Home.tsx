import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { sadOutline, addCircleOutline, searchOutline } from "ionicons/icons";
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
  const tokenStorage = localStorage.getItem('token');
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
    if (tokenStorage) {
      fetchData(tokenStorage);
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

  const queryHandler = async (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) {
      query = target.value!.toLowerCase();
    }

    if (query==="") {
      // Fetch the original workout list and update the state
      setLoading(true);
      try {
        let response = await getWorkoutExerciseList(token);
        if (response) {
          setUserWorkouts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      // Apply the filter when the query is not empty
      setUserWorkouts((prev) =>
        prev.filter(
          (exercise) => exercise.exercise.name.toLowerCase().indexOf(query) > -1
        )
      );
    }
  };

  return (
    <>
      {tokenStorage && <SideMenu setFormModal={setFormModal} />}
      <IonPage id="main-content">
        <IonContent class="ion-padding">
          {loading && tokenStorage ? (
            <div className={styles.spinnerContainer}>
              <IonSpinner name="dots" color="primary"></IonSpinner>
            </div>
          ) : (
            ""
          )}
          {!tokenStorage ? (
            <div className={styles.loginGroup}>
              <h1 className={styles.header}>Lift Notes</h1>
              <div className={styles.buttonGroup}>
                <IonButton routerLink="/signin">Sign In</IonButton>
                <IonButton>Demo Account</IonButton>
              </div>
            </div>
          ) : userWorkouts.length > 0 ? (
            <>
              <IonList lines="none">
                {userWorkouts.map((exercise) => {
                  return (
                    <WorkoutCard
                      key={exercise.id}
                      workoutItem={exercise}
                      setFormModal={setFormModal}
                      setUpdateID={setUpdateID}
                    />
                  );
                })}
              </IonList>
            </>
          ) : (
            <div className={styles.iconContainer}>
              <IonIcon
                icon={sadOutline}
                aria-hidden="true"
                color="danger"
              ></IonIcon>
              <span>There are no workouts!</span>
            </div>
          )}
        </IonContent>
        <FormModal
          formModal={formModal}
          setFormModal={setFormModal}
          updateID={updateID}
        />
        {tokenStorage && (
          <IonFooter className="ion-no-border">
            <IonToolbar>
              <IonSearchbar
                className={styles.customSearchbar}
                onIonInput={(ev) => queryHandler(ev)}
                debounce={500}
              ></IonSearchbar>
              <IonButtons slot="primary" className={styles.buttons}>
                <IonButton onClick={modalHandler}>
                  <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                </IonButton>
                <IonButton>
                  <IonMenuButton autoHide={false}></IonMenuButton>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonFooter>
        )}
      </IonPage>
    </>
  );
};
export default Home;
