import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
} from "@ionic/react";
import mockData from "../MockData.json";
import WorkoutCard from "./WorkoutCard";

const WorkoutList = () => {
  return (
    <IonAccordionGroup>
      {mockData.Workouts.map((workout, index) => {
        return (
          <IonAccordion value={index.toString()}>
            <IonItem slot="header" color="light">
              <IonLabel>{workout.Category}</IonLabel>
            </IonItem>
            {workout.Exercises.map((workoutItem) => {
              return (
                <div className="ion-padding" slot="content">
                  <WorkoutCard workoutItem={workoutItem}/>
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
