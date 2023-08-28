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
import { useWorkoutContext } from "../../util/WorkoutContext";
import { Exercise } from "../../models/WorkoutModel";
import "./HistoryModal.css"
interface HistoryCardModalProps {
  workoutItem: Exercise;
}
const HistoryModal = (props: HistoryCardModalProps) => {
  const { workoutItem } = props;
  const { historyModal, setHistoryModal } = useWorkoutContext();

  const historyList = workoutItem.history || [];
  return (
    <IonModal isOpen={historyModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setHistoryModal(false)}>Close</IonButton>
          </IonButtons>
          <IonTitle class="ion-text-center">History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {historyList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(historyList[0]).map((label, index) => {
                  return <th className="table_header" key={index}>{label.toUpperCase()}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(item).map((value, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No history available.</p>
        )}
      </IonContent>
    </IonModal>
  );
};
export default HistoryModal;
