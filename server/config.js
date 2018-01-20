module.exports = {
  facebook: {
    clientId: '180949189168618',
    clientSecret: '730462a2b256000ee4f6ab1da4b132ca',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    validateUrl: 'https://graph.facebook.com/me'
  },
  google: {
    client_id: '1089959983020-u8m1st89h7r4psfk2n4tdeq8ugkb7g62.apps.googleusercontent.com',
    consumerSecret: 'l0fbTrNXska5E0dbfbIJl4M1',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    validateUrl: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
  },
}
