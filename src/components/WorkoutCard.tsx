import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonList,
} from "@ionic/react";
import { WorkoutItem } from "../models/WorkoutModel";

interface WorkoutCardProps {
  workoutItem: WorkoutItem;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { workoutItem } = props;
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{workoutItem.WorkoutName}</IonCardTitle>
        <IonCardSubtitle>{`Last Updated: ${workoutItem.Date}`}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>{`Reps: ${workoutItem.Reps}`}</IonItem>
          <IonItem>{`Sets: ${workoutItem.Sets}`}</IonItem>
          <IonItem>{`Weight: ${workoutItem.Weight}`}</IonItem>
          <IonItem>{`Notes: ${workoutItem.Notes}`}</IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default WorkoutCard;
