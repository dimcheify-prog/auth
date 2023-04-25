import Auth from "./auth";

class AppStore {
    auth = new Auth(this);
}

export default AppStore;