import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonToast,
} from "@ionic/react";

import {
  createOutline,
  trash,
  checkmarkCircleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Exercise, WorkoutExerciseList } from "../models/WorkoutModel";
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Navigation } from 'swiper/modules';
import styles from "./workoutCard.module.css";
interface WorkoutCardProps {
  workoutItem: WorkoutExerciseList;
  // setSelectedCard: Dispatch<SetStateAction<Exercise>>;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  // const { setIsDeleted, ,  } = useWorkoutContext();

  const [present] = useIonToast();

  // const onClickEditModalHandler = (workout: Exercise) => {
  //   setSelectedCard(workout);
  //   setEditModal(true);
  //   if (slidingRef.current) {
  //     slidingRef.current.close();
  //   }
  // };
  // const onClickHistoryModalHandler = (workout: Exercise) => {
  //   setSelectedCard(workout);
  //   setHistoryModal(true);
  //   if (slidingRef.current) {
  //     slidingRef.current.close();
  //   }
  // };
  // const onClickDeleteHandler = (id: string | undefined) => {
  //   if (id !== undefined) {
  //     removeWokout(id)
  //       .then((response) => {
  //         console.log(response.data);
  //         if (slidingRef.current) {
  //           slidingRef.current.close();
  //         }
  //         setIsDeleted(true);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => presentToast("bottom"));
  //   }
  //   console.log("id is undefined");
  // };
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Workout Deleted!",
      duration: 1500,
      position: position,
      icon: checkmarkCircleOutline,
      color: "success",
      animated: true,
    });
  };
  console.log(workoutItem);
  return (
        <IonCard
          className={styles.card}
          // onClick={() => onClickHistoryModalHandler(workoutItem)}
        >
          <IonCardHeader>
            <IonCardTitle className={styles.title}>
              {workoutItem.exercise.name}
              <IonIcon
                icon={informationCircleOutline}
                size="medium"
                color="medium"
              ></IonIcon>
            </IonCardTitle>
            {/* <IonCardSubtitle>{`Last Updated: ${workoutItem.date}`}</IonCardSubtitle> */}
          </IonCardHeader>
          <IonCardContent className={styles.content}>
            <IonList lines="none" className={styles.list}>
              <IonItem className="ion-no-padding">
                <div className={styles.item}>
                  <label className={styles.label}>Reps</label>
                  {workoutItem.reps}
                </div>
              </IonItem>
              <IonItem className="ion-no-padding">
                <div className={styles.item}>
                  <label>Sets</label>
                  {workoutItem.sets}
                </div>
              </IonItem>
              <IonItem className="ion-no-padding">
                <div className={styles.item}>
                  <label>Weight</label>
                  {workoutItem.weight}
                </div>
              </IonItem>
              {/* <IonItem>{`Notes: ${workoutItem.notes}`}</IonItem> */}
            </IonList>
          </IonCardContent>
        </IonCard>
  );
};
export default WorkoutCard;
