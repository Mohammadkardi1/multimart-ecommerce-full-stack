import { toast } from 'react-toastify'

export const showToastSuccess = (message, options = {}) => {
    const {
        position = "top-right",  // Toast position
        autoClose = 3000,       // Auto close duration (in ms)
        hideProgressBar = false, // Option to show/hide progress bar
        closeOnClick = true,    // Close toast when clicked
        pauseOnHover = false,    // Pause timer when hovered
        draggable = true,       // Allow toast dragging
        theme = "dark",        // Theme: 'light', 'dark', or 'colored'
    } = options

    toast.success(message, {position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, theme,})
}


export const showToastFailure = (message, options = {}) => {
    const {
        position = "top-right",
        autoClose = 3000,
        hideProgressBar = false,
        closeOnClick = true,
        pauseOnHover = false,
        draggable = true,
        theme = "dark",
    } = options

    toast.error(message, {position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, theme})
}