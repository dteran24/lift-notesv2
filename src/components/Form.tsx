import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
} from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Exercise, WorkoutExercise } from "../models/WorkoutModel";
import { useWorkoutContext } from "../util/WorkoutContext";
import styles from "./Form.module.css";
type FormProps = {
  ExerciseList: Exercise[];
};

const Form = (props: FormProps) => {
  const { ExerciseList } = props;
  const { addModal } = useWorkoutContext();
  const [genre, setGenre] = useState("All");
  const [nameOptions, setNameOptions] = useState(ExerciseList);
  const [workoutExercise, setWorkoutExercise] = useState<WorkoutExercise>({
    reps: 0,
    sets: 0,
    weight: 0,
  });
  const handleInputChange = (
    event: CustomEvent,
    key: keyof WorkoutExercise
  ) => {
    const newValue = event.detail.value;
    setWorkoutExercise((prevWorkout) => ({
      ...prevWorkout!,
      [key]: newValue,
    }));
  };
  const handleGenreChange = (event: CustomEvent) => {
    let selectedGenre = event.detail.value;
    if (selectedGenre === "All") {
      setNameOptions(ExerciseList);
    } else {
      setGenre(selectedGenre);
      setNameOptions(
        ExerciseList.filter((exercise) => exercise.genre === selectedGenre)
      );
    }
  };
  const submitHandler = async(event: React.FormEvent) => {
    event.preventDefault();
    
  }

  return (
    <form className={styles.form}>
      {addModal ? (
        <IonItem lines="none" className={styles.input}>
          <IonSelect
            value={genre}
            onIonChange={handleGenreChange}
            aria-label="genre"
            label="Select a Genre"
          >
            <IonSelectOption value="All">All</IonSelectOption>
            <IonSelectOption value="Chest">Chest</IonSelectOption>
            <IonSelectOption value="Legs">Legs</IonSelectOption>
            <IonSelectOption value="Arms">Arms</IonSelectOption>
            <IonSelectOption value="Back">Back</IonSelectOption>
            <IonSelectOption value="Shoulders">Shoulders</IonSelectOption>
          </IonSelect>
        </IonItem>
      ) : (
        ""
      )}

      <IonItem className={styles.input}>
        <IonSelect aria-label="genre" label="Name">
          {nameOptions.map((exercise) => {
            return (
              <IonSelectOption key={exercise.id} value={exercise.name}>
                {exercise.name}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
      <IonItem className={styles.input}>
        <IonInput
          aria-label="sets"
          label="Sets"
          type="number"
          labelPlacement="stacked"
          onIonInput={(e) => handleInputChange(e, "sets")}
        />
      </IonItem>
      <IonItem className={styles.input}>
        <IonInput
          aria-label="reps"
          label="Reps"
          type="number"
          labelPlacement="stacked"
          onIonInput={(e) => handleInputChange(e, "reps")}
        />
      </IonItem>

      <IonItem className={styles.input}>
        <IonInput
          aria-label="weight"
          label="Weight"
          type="number"
          labelPlacement="stacked"
          onIonInput={(e) => handleInputChange(e, "weight")}
        />
      </IonItem>
      <IonButton type="submit" shape="round" expand="full" fill="solid">
        Submit
      </IonButton>
    </form>
  );
};

export default Form;
