import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
} from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Exercise,
  FormType,
  ToastModalState,
  WorkoutExercise,
} from "../models/WorkoutModel";
import { useWorkoutContext } from "../util/WorkoutContext";
import styles from "./Form.module.css";
import {
  addExercise,
  addWorkoutExercise,
  updateWorkoutExercise,
} from "../services/ApiHandler";
type FormProps = {
  ExerciseList: Exercise[];
  cancelHandler: () => void;
  updateID: number;
  setToastModalHandler: Dispatch<SetStateAction<ToastModalState>>;
};

const Form = (props: FormProps) => {
  const { ExerciseList, cancelHandler, updateID, setToastModalHandler } = props;
  const { formStatus, token } = useWorkoutContext();

  const [nameId, setNameId] = useState<number>();
  const [nameOptions, setNameOptions] = useState(ExerciseList);
  const [genreInput, setGenreInput] = useState("All");
  const defaultWorkoutExercise: WorkoutExercise = {
    creationDate: "",
    lastUpdated: "",
    reps: 0,
    sets: 0,
    weight: 0,
  };

  const defaultExercise: Exercise = {
    name: "",
    description: "",
    genre: genreInput,
  };

  const [userInput, setUserInput] = useState<WorkoutExercise | Exercise>(
    formStatus === FormType.Add || formStatus === FormType.Update
      ? defaultWorkoutExercise
      : defaultExercise
  );

  const handleInputChange = (
    event: CustomEvent,
    key: keyof WorkoutExercise | keyof Exercise
  ) => {
    const newValue = event.detail.value;
    setUserInput((prevWorkout) => ({
      ...prevWorkout!,
      [key]: newValue,
    }));
  };
  const handleGenreChange = (event: CustomEvent) => {
    let selectedGenre = event.detail.value;
    setGenreInput(selectedGenre);
    if (isExercise(userInput)) {
      setUserInput((prev) => ({ ...prev, genre: selectedGenre }));
    }
    if (selectedGenre === "All") {
      setNameOptions(ExerciseList);
    } else {
      setNameOptions(
        ExerciseList.filter((exercise) => exercise.genre === selectedGenre)
      );
    }
  };

  const handleNameChange = (event: CustomEvent) => {
    setNameId(event.detail.value);
  };

  const isWorkoutExercise = (
    input: WorkoutExercise | Exercise
  ): input is WorkoutExercise => {
    return "reps" in input;
  };

  const isExercise = (input: WorkoutExercise | Exercise): input is Exercise => {
    return "genre" in input;
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formStatus === FormType.Add && isWorkoutExercise(userInput)) {
      try {
        let response = await addWorkoutExercise(nameId!, userInput, token);
        if (response) {
          cancelHandler();
        }
        console.log(response.data);
      } catch (e: any) {
        setToastModalHandler((prev) => ({
          ...prev,
          message: e,
          isOpen: true,
          error: true,
        }));
        console.error(e);
      }
    } else if (formStatus === FormType.Update && isWorkoutExercise(userInput)) {
      try {
        let response = await updateWorkoutExercise(token, updateID, userInput);
        if (response) {
          cancelHandler();
        }
        console.log(response);
      } catch (e: any) {
        setToastModalHandler((prev) => ({
          ...prev,
          message: e,
          isOpen: true,
          error: true,
        }));

        console.error(e);
      }
    } else if (formStatus === FormType.Exercise && isExercise(userInput)) {
      try {
        let response = await addExercise(userInput, token);
        if (response) {
          cancelHandler();
        }

        console.log(response);
      } catch (e: any) {
        setToastModalHandler((prev) => ({
          ...prev,
          message: e,
          isOpen: true,
          error: true,
        }));
        console.error(e);
      }
    }
  };

  const disableButtonHandler = () => {
    if (isWorkoutExercise(userInput) && formStatus === FormType.Add) {
      return (
        nameId === undefined || userInput.reps === 0 || userInput.sets === 0
      );
    } else if (isExercise(userInput)) {
      return userInput.name === "" || genreInput === "All";
    }

    return false;
  };

  useEffect(() => {
    disableButtonHandler();
    console.log(userInput);
  }, [userInput]);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {formStatus === FormType.Add && (
        <>
          <IonItem lines="none" className={styles.input}>
            <IonSelect
              value={genreInput}
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
      )}
      {formStatus === FormType.Exercise ? (
        <>
          <IonItem lines="none" className={styles.input}>
            <IonSelect
              value={genreInput}
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
            <IonInput
              required
              aria-label="name"
              label="Name"
              type="text"
              labelPlacement="stacked"
              onIonInput={(e) => handleInputChange(e, "name")}
            />
          </IonItem>
          <IonItem className={styles.input}>
            <IonInput
              aria-label="description"
              label="Description (Optional)"
              type="text"
              labelPlacement="stacked"
              onIonInput={(e) => handleInputChange(e, "description")}
            />
          </IonItem>
        </>
      ) : (
        <>
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
        </>
      )}

      <IonButton
        type="submit"
        shape="round"
        expand="full"
        fill="solid"
        disabled={disableButtonHandler()}
      >
        Submit
      </IonButton>
    </form>
  );
};

export default Form;
