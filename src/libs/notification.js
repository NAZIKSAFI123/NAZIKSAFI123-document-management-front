import Swal from 'sweetalert2';

export const alertSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    }).then(() => { });
};

export const alertError = (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    }).then(() => { });
};

export const alertInfo = (message) => {
    return Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
    }).then(() => { });
};

export const deleteConfirmation = async () => {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this document!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    });
};

export const logOutConfirmation = async () => {
    return Swal.fire({
        title: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "Cancel",
    });
};

export const accessDenied = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: message,
    }).then(() => { });
};

// You can define more types of notifications as needed

