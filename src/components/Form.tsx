import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import { Exercise } from "../models/WorkoutModel";
import { useWorkoutContext } from "../util/WorkoutContext";
import "./Form.css";
interface FormProps {
  workout: Exercise;
  setWorkout: Dispatch<SetStateAction<Exercise>>;
}

const Form = (props: FormProps) => {
  const { setWorkout, workout } = props;
  const { addModal } = useWorkoutContext();
  const handleInputChange = (event: CustomEvent, key: keyof Exercise) => {
    const newValue = event.detail.value;
    setWorkout((prevWorkout) => ({
      ...prevWorkout!,
      [key]: newValue,
    }));
  };
  return (
    <form>
      {addModal ? (
        <IonItem>
          <IonSelect
            aria-label="genre"
            placeholder="Select genre"
            onIonChange={(e) => handleInputChange(e, "genre")}
          >
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

      <IonItem>
        <IonInput
          aria-label="name"
          label="Name"
          type="text"
          labelPlacement="floating"
          fill="solid"
          value={workout.name}
          onIonInput={(e) => handleInputChange(e, "name")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          aria-label="reps"
          label="Reps"
          type="number"
          labelPlacement="floating"
          fill="solid"
          value={workout.reps}
          onIonInput={(e) => handleInputChange(e, "reps")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          aria-label="sets"
          label="Sets"
          type="number"
          labelPlacement="floating"
          fill="solid"
          value={workout.sets}
          onIonInput={(e) => handleInputChange(e, "sets")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          aria-label="weight"
          label="Weight"
          type="number"
          labelPlacement="floating"
          fill="solid"
          value={workout.weight}
          onIonInput={(e) => handleInputChange(e, "weight")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          aria-label="notes"
          label="Notes"
          type="text"
          labelPlacement="floating"
          fill="solid"
          value={workout.notes}
          onIonInput={(e) => handleInputChange(e, "notes")}
          counter={true}
          maxlength={20}   
        />
      </IonItem>
    </form>
  );
};

export default Form;
