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

// You can define more types of notifications as needed
