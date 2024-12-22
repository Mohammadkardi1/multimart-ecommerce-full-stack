const decodeJWT = (token) => {
    try {
      // Split the token into its three parts (header, payload, signature)
      const [header, payload, signature] = token.split('.')
  
      // Decode the base64-encoded header and payload
      const decodedHeader = JSON.parse(atob(header))
      const decodedPayload = JSON.parse(atob(payload))
  
      // Return the decoded payload
      return decodedPayload
    } catch (error) {
      console.log('Failed to decode token:', error)
      return null
    }
  }

  export default decodeJWT