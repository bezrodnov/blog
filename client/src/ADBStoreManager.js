import StoreManager from "./crud/StoreManager";
import settingsReducer from "./reducers/settingsReducer";

const ADBStoreManager = new StoreManager();
ADBStoreManager.addEntity({
  name: "settings",
  reducer: settingsReducer
});
ADBStoreManager.addModel({ name: "antibiotic" });
ADBStoreManager.addModel({ name: "antibioticType" });
ADBStoreManager.addModel({ name: "department" });

export default ADBStoreManager;
