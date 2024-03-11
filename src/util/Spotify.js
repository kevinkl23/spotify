const clientId = 'cd19f42e726f450a9f8669572ca6b111';
const redirectUri = 'http://localhost:3000/'
const authEndpoint = 'https://accounts.spotify.com/authorize'
const responseType = 'token'

export const link = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&show_dialog=true`;