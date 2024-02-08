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
import { addWorkoutExercise, updateWorkoutExercise } from "../services/ApiHandler";
type FormProps = {
  ExerciseList: Exercise[];
  cancelHandler: () => void;
  updateID: number;
};

const Form = (props: FormProps) => {
  const { ExerciseList, cancelHandler, updateID } = props;
  const { formStatus, token } = useWorkoutContext();
  const [genre, setGenre] = useState("All");
  const [nameId, setNameId] = useState<number>();
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

  const handleNameChange = (event: CustomEvent) => {
    setNameId(event.detail.value);
  };
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formStatus === "add") {
      try {
        let response = await addWorkoutExercise(nameId!, workoutExercise, token);
        cancelHandler();
        // clearValues();

        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    } else if (formStatus === "update") {
      try {
        let response = await updateWorkoutExercise(token, updateID, workoutExercise);
        cancelHandler();
        console.log(response);
      }
      catch (e) {
        console.error(e);
      }
    };
  }
  
  const clearValues = () => {
    setGenre("All");
    setWorkoutExercise({ weight: 0, sets: 0, reps: 0 });
  };
  console.log(formStatus)
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {formStatus === "add" ? (
        <>
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
          <IonItem className={styles.input}>
            <IonSelect
              aria-label="genre"
              label="Name"
              value={nameId}
              onIonChange={handleNameChange}
            >
              {nameOptions.map((exercise) => {
                return (
                  <IonSelectOption key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </>
      ) : (
        ""
      )}

      <IonItem className={styles.input}>
        <IonInput
          required
          aria-label="sets"
          label="Sets"
          type="number"
          labelPlacement="stacked"
          onIonInput={(e) => handleInputChange(e, "sets")}
        />
      </IonItem>
      <IonItem className={styles.input}>
        <IonInput
          required
          aria-label="reps"
          label="Reps"
          type="number"
          labelPlacement="stacked"
          onIonInput={(e) => handleInputChange(e, "reps")}
        />
      </IonItem>

      <IonItem className={styles.input}>
        <IonInput
          required
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
