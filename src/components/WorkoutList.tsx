import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
} from "@ionic/react";
import "./workoutList.css"
import WorkoutCard from "./WorkoutCard";
import { WorkoutCategory } from "../models/WorkoutModel";

interface WorkoutListProps {
  data: WorkoutCategory[];
}

const WorkoutList = (props: WorkoutListProps) => {
  const { data } = props;
  return (
    <IonAccordionGroup>
      {data.map((workout, index) => {
        return (
          <IonAccordion value={index.toString()} key={index}>
            <IonItem slot="header" color="light">
              <IonLabel>{workout.genre}</IonLabel>
            </IonItem>
            {workout.workouts.map((workoutItem) => {
              return (
                <div className="card-container" slot="content" key={workoutItem.id}>
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
