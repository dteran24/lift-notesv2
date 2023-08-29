import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import user from "../util/mockData.json";
import { personCircleOutline } from "ionicons/icons";
import "./User.css"
const User = () => {
  return (
    <IonCard>
      <div className="avatar-container">
        <IonIcon className="avatar" icon={personCircleOutline}/>
      </div>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel>Name:</IonLabel>
            {user.name}
          </IonItem>
          <IonItem>
            <IonLabel>Age:</IonLabel>
            {user.age}
          </IonItem>
          <IonItem>
            <IonLabel>Weight:</IonLabel>
            {user.weight}
          </IonItem>
          <IonItem>
            <IonLabel>Height:</IonLabel>
            {user.height}
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
export default User;
