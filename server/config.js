module.exports = {
  facebook: {
    clientId: '180949189168618',
    clientSecret: '730462a2b256000ee4f6ab1da4b132ca',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    validateUrl: 'https://graph.facebook.com/me'
  },
  google: {
    consumerKey: '1006414047628-c0nojgcen4mkc0s2onokisg4e5r4omv2.apps.googleusercontent.com',
    consumerSecret: 'wr70u2MU-OjO9PkgBPLpmZfa',
    callbackURL: 'http://localhost:3006/auth/google/callback'
  },
}
