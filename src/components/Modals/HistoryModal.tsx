import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
import "./HistoryModal.css";
import { sadOutline, chevronBackOutline } from "ionicons/icons";
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
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton className="ios-back-bttn" onClick={() => setHistoryModal(false)} fill="clear">Back
              <IonIcon slot="start" icon={chevronBackOutline} />
              </IonButton>
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
                  return (
                    <th className="table-header" key={index}>
                      {label.toUpperCase()}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, rowIndex) => (
                <tr className="table-row" key={rowIndex}>
                  {Object.values(item).map((value, columnIndex) => (
                    <td key={columnIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data-container">
            <IonIcon icon={sadOutline} size="large" />
            No History!
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};
export default HistoryModal;
