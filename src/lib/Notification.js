import { toast } from "react-toastify";

//position : toast.POSITION.TOP_LEFT
//pauseOnHover : true
//autoClose : 6000

const options = {
    autoClose: 5000,
    pauseOnHover: true,
};

export function successMsg(message, option = options) {
    toast.success(message, option)
}
export function errorMsg(message, option = options) {
    toast.error(message, option)
}
export function infoMsg(message, option = options) {
    toast.info(message, option)
}
export function clearMsg() {
    toast.dismiss()
}