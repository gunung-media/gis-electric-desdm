import Swal from "sweetalert2"

export const swalError = (error?: string) => {
    if (!error) return;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
    });
}

export const swalSuccess = (successMsg: string = "Sukses Menambah") => {
    Swal.fire({
        icon: "success",
        title: "Sukses",
        text: successMsg,
    });
}
