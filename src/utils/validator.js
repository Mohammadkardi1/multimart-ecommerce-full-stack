export const usernameValidator =  {
    required: "Enter your name",
    minLength: {
        value: 4,
        message: "Your name must be at least 4 characters long"
    },
        pattern: {
            value: /^[a-zA-Z0-9\s]+$/,
            message: "Your name must be alphanumeric"
        }
}

  
export const emailValidator = {
    required:"Enter your email",
    pattern: {
        value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        message: "Enter a Valid Email"
    }
}
  
  
export const passwordValidator = (value) => {
    if (!value) {
      return "Enter your password"
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number"
    }
    if (!/[$-/:-?{-~@#!"^_`\[\]]/.test(value)) {
      return "Password must contain at least one symbol"
    }
    return null
}
  
export const imageTypeValidator = (value) => {
      
    if (!value[0]) {
        return true
    }
  
    const file = value[0]
    const types = ['image/jpg', 'image/png', "image/jpeg"]
  
    if ( !types.includes(file.type)  ) {
      return 'Please select a valid photo JPG, PNG or JPEG';
    }
  
    return true
}

// const validateImageType = (value) => {
//     if (!value[0]) {
//       // No file selected
//         return true;
//     }
//     const file = value[0];
//     const types = ['image/jpeg', 'image/png']
//     if ( ! types.includes(file.type)  ) {
//       // Invalid file type
//     return 'Please upload a valid image file JPG or PNG';
//     }
//     // Valid file type
//     return true;
// }

export const productPriceValidator = {
  min: {
    value: 0.01, 
    message: "Ticket price must be at least $0.01",
  },
  max: {
    value: 10000,
    message: "Ticket price must not exceed $10,000",
  },
  pattern: {
    value: /^\d+(\.\d{1,2})?$/,
    message: "Enter a valid price (e.g., 10 or 10.99)",
  },
}
