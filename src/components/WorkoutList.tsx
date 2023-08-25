import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCard,
} from "@ionic/react";
import "./workoutList.css";
import WorkoutCard from "./WorkoutCard";
import { Exercise, WorkoutCategory } from "../models/WorkoutModel";
import EditModal from "./Modals/EditModal";
import { useEffect, useState } from "react";
import HistoryModal from "./Modals/HistoryModal";

interface WorkoutListProps {
  data: WorkoutCategory[];
}

const WorkoutList = (props: WorkoutListProps) => {
  const { data } = props;
  const [selectedCard, setSelectedCard] = useState<Exercise>({
    id: "",
    name: "",
    genre: "",
    notes: "",
    date: "",
    weight: 0,
    sets: 0,
    reps: 0,
    history:[],
  });

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
              <div slot="content">No Data!!</div>
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
