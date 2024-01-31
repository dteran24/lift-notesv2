import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import WorkoutList from "../components/WorkoutList";
import {
  personCircle,
  add,
} from "ionicons/icons";
import { useWorkoutContext } from "../util/WorkoutContext";
import AddModal from "../components/Modals/AddModal";
import SideMenu from "../components/SideMenu";
import styles from "./Home.module.css"

const Home = () => {
  const { workoutListData, isLoading, setAddModal } = useWorkoutContext();



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
          <div className={styles.buttonGroup}>
            <IonButton routerLink="/signin">Sign In</IonButton>
            <IonButton>Demo Account</IonButton>
          </div>

          {/* {isLoading ? (
            <IonLoading message="Loading workouts..." />
          ) : (
            <WorkoutList data={workoutListData} />
          )} */}
        </IonContent>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          {/* <IonFabButton onClick={() => setAddModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton> */}
        </IonFab>
        <AddModal />
      </IonPage>
    </>
  );
};
export default Home;
