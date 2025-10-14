import axios from "axios";
import Config from "../Configs/config";

export default function NewUser() {
    if (localStorage.getItem("token")) {
        axios
            .get(Config.url + "/user", {
                headers: { authorization: "Bearer " + localStorage.getItem("token") },
            })
            .then((response) => {
                if (response.data.message === "Token is not valid") {
                    localStorage.removeItem("token");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    if (!localStorage.getItem("token")) {
        axios
            .post(Config.url + "/user")
            .then((response) => {
                if (response.data.status === "success") {
                    localStorage.setItem("token", response.data.token);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}