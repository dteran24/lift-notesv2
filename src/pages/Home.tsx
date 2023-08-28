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

const Home = () => {
  const { workoutListData, isLoading, setAddModal } = useWorkoutContext();

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton disabled>
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
        <IonContent>
          {isLoading ? (
            <IonLoading message="Loading workouts..." />
          ) : (
            <WorkoutList data={workoutListData} />
          )}
        </IonContent>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => setAddModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <AddModal />
      </IonPage>
    </>
  );
};
export default Home;
