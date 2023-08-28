import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonList,
  IonMenuToggle,
  IonIcon,
} from "@ionic/react";
import { archive, informationCircle, swapVertical } from "ionicons/icons";

const SideMenu = () => {
  return (
    <IonMenu type="overlay" side="end" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="inset">
          <IonMenuToggle>
            <IonItem routerLink="/history" routerDirection="forward" disabled>
              <IonIcon icon={archive} slot="start" />
              View History
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerDirection="forward" disabled>
              <IonIcon icon={swapVertical} slot="start" />
              Organize
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerDirection="forward" disabled>
              <IonIcon icon={informationCircle} slot="start" />
              About
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
export default SideMenu;
