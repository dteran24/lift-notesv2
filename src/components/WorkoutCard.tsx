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
  IonList,
} from "@ionic/react";
import EditModal from "./EditModal";
import { createOutline, trash } from "ionicons/icons";
import { Exercise } from "../models/WorkoutModel";
import { useRef, useState } from "react";
import { removeWokout } from "../services/ApiHandler";
import { useWorkoutContext } from "../util/WorkoutContext";
interface WorkoutCardProps {
  workoutItem: Exercise;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  const {setIsDeleted } = useWorkoutContext();
  const [openModal, setOpenModal] = useState(false);
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const onClickModalHandler = () => {
    setOpenModal(true);
    if (slidingRef.current) {
      slidingRef.current.close();
    }
  };
  const onClickDeleteHandler = (id: string) => {
    removeWokout(id)
      .then((response) => {
        console.log(response.data);
        if (slidingRef.current) {
          slidingRef.current.close();
        }
        setIsDeleted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IonList lines="none">
        <IonItemSliding ref={slidingRef}>
          <IonItemOptions side="start">
            <IonItemOption
              color="danger"
              onClick={() => onClickDeleteHandler(workoutItem.id)}
            >
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => onClickModalHandler()}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItem>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{workoutItem.name}</IonCardTitle>
                <IonCardSubtitle>{`Last Updated: ${workoutItem.date}`}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList className="ion-padding-bottom">
                  <IonItem>{`Reps: ${workoutItem.reps}`}</IonItem>
                  <IonItem>{`Sets: ${workoutItem.sets}`}</IonItem>
                  <IonItem>{`Weight: ${workoutItem.weight}`}</IonItem>
                  <IonItem>{`Notes: ${workoutItem.notes}`}</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonItem>
        </IonItemSliding>
      </IonList>
      <EditModal
        workoutItem={workoutItem}
      />
    </>
  );
};
export default WorkoutCard;
