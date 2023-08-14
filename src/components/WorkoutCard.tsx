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
import { WorkoutItem } from "../models/WorkoutModel";
import { createOutline, trash } from "ionicons/icons";

interface WorkoutCardProps {
  workoutItem: WorkoutItem;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  return (
    <IonList lines="none">
      <IonItemSliding>
        <IonItemOptions side="start">
          <IonItemOption color="danger">
            <IonIcon slot="icon-only" icon={trash}></IonIcon>
          </IonItemOption>
        </IonItemOptions>
        <IonItemOptions side="end">
          <IonItemOption>
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
  );
};
export default WorkoutCard;
