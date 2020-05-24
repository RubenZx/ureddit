export const routes = {
  home: '/',
  submit: '/submit',
  validateAccount: '/validate-account',
  validateWithCode: '/validate-account/:code',
  resetPassword: '/reset-password/:code',
  profile: 'u/:username',
  editProfile: '/u/:username/edit',
  post: '/comments/:postid',
} as const
