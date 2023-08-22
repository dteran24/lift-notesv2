import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useWorkoutContext } from "../util/WorkoutContext";
import { useState } from "react";
import { Exercise } from "../models/WorkoutModel";
import { addWorkout } from "../services/ApiHandler";
import { key } from "ionicons/icons";

const AddModal = () => {
  const { addModal, setAddModal, setIsAdded } = useWorkoutContext();
  const [workout, setWorkout] = useState<Exercise>();
  const submitHandler = () => {
    addWorkout(workout!)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setAddModal(false);
          setIsAdded(true);
          setWorkout(prev => ({...prev!, [key]: "",}))
      });
  };
  const handleInputChange = (event: CustomEvent, key: keyof Exercise) => {
    const newValue = event.detail.value;
    setWorkout((prevWorkout) => ({
      ...prevWorkout!,
      [key]: newValue,
    }));
  };
  return (
    <IonModal isOpen={addModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setAddModal(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => submitHandler()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
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
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              aria-label="name"
              type="text"
              placeholder="Name"
              value={workout?.name} // Convert to string for IonInput
              onIonChange={(e) => handleInputChange(e, "name")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Reps</IonLabel>
            <IonInput
              aria-label="reps"
              type="number"
              placeholder="Reps"
              value={workout?.reps} // Convert to string for IonInput
              onIonChange={(e) => handleInputChange(e, "reps")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Sets</IonLabel>
            <IonInput
              aria-label="sets"
              type="number"
              placeholder="Sets"
              value={workout?.sets} // Convert to string for IonInput
              onIonChange={(e) => handleInputChange(e, "sets")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Weight</IonLabel>
            <IonInput
              aria-label="weight"
              type="number"
              placeholder="Weight"
              value={workout?.weight} // Convert to string for IonInput
              onIonChange={(e) => handleInputChange(e, "weight")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput
              aria-label="notes"
              type="text"
              placeholder="Notes"
              value={workout?.notes}
              onIonChange={(e) => handleInputChange(e, "notes")}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonModal>
  );
};
export default AddModal;
