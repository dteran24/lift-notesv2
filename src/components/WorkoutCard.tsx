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

interface WorkoutCardProps {
  workoutItem: Exercise;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  const [openModal, setOpenModal] = useState(false);
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const onclickHandler = () => {
    setOpenModal(true);
    if (slidingRef.current) {
      slidingRef.current.close();
    }
  };

  return (
    <>
      <IonList lines="none">
        <IonItemSliding ref={slidingRef}>
          <IonItemOptions side="start">
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => onclickHandler()}>
              <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
          <IonItem>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{workoutItem.WorkoutName}</IonCardTitle>
                <IonCardSubtitle>{`Last Updated: ${workoutItem.Date}`}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList className="ion-padding-bottom">
                  <IonItem>{`Reps: ${workoutItem.Reps}`}</IonItem>
                  <IonItem>{`Sets: ${workoutItem.Sets}`}</IonItem>
                  <IonItem>{`Weight: ${workoutItem.Weight}`}</IonItem>
                  <IonItem>{`Notes: ${workoutItem.Notes}`}</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonItem>
        </IonItemSliding>
      </IonList>
      <EditModal
        setOpenModal={setOpenModal}
        isOpen={openModal}
        workoutItem={workoutItem}
      />
    </>
  );
};
export default WorkoutCard;
