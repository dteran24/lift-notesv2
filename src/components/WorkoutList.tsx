import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
  IonIcon,
} from "@ionic/react";
import { sadOutline } from "ionicons/icons";
import "./workoutList.css";
import WorkoutCard from "./WorkoutCard";
import { Exercise, WorkoutCategory } from "../models/WorkoutModel";
import EditModal from "./Modals/EditModal";
import { useState } from "react";
import HistoryModal from "./Modals/HistoryModal";

interface WorkoutListProps {
  data: WorkoutCategory[];
}

const WorkoutList = (props: WorkoutListProps) => {
  const { data } = props;
  const [selectedCard, setSelectedCard] = useState<Exercise>({});

  return (
    <IonAccordionGroup>
      {data.map((workout, index) => {
        return (
          <IonAccordion value={index.toString()} key={index}>
            <IonItem slot="header" color="light">
              <IonLabel>{workout.genre}</IonLabel>
            </IonItem>
            {workout.workouts.length > 0 ? (
              workout.workouts.map((workoutItem) => {
                return (
                  <div
                    className="card-container"
                    slot="content"
                    key={workoutItem.id}
                  >
                    <WorkoutCard
                      workoutItem={workoutItem}
                      setSelectedCard={setSelectedCard}
                    />
                  </div>
                );
              })
            ) : (
              <div className="no-data-container" slot="content">
                <IonIcon icon={sadOutline} size="large" aria-label="sad" />
                <span>No Workouts here!</span>
              </div>
            )}
          </IonAccordion>
        );
      })}
      <EditModal workoutItem={selectedCard} />
      <HistoryModal workoutItem={selectedCard} />
    </IonAccordionGroup>
  );
};
export default WorkoutList;
