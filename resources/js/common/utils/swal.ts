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
export const swalToast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
