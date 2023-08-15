import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
} from "@ionic/react";

import WorkoutCard from "./WorkoutCard";
import { WorkoutData } from "../models/WorkoutModel";

interface WorkoutListProps {
  data: WorkoutData;
}

const WorkoutList = (props: WorkoutListProps) => {
  const { data } = props;
  return (
    <IonAccordionGroup>
      {data.Workouts.map((workout, index) => {
        return (
          <IonAccordion value={index.toString()} key={index}>
            <IonItem slot="header" color="light">
              <IonLabel>{workout.Category}</IonLabel>
            </IonItem>
            {workout.Exercises.map((workoutItem) => {
              return (
                <div className="ion-padding" slot="content" key={workoutItem.id}>
                  <WorkoutCard workoutItem={workoutItem} />
                </div>
              );
            })}
          </IonAccordion>
        );
      })}
    </IonAccordionGroup>
  );
};
export default WorkoutList;
