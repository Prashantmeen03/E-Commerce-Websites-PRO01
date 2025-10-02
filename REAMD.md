# REAMD: Fix Login and Signup Errors

## Completed
- [x] Identified the issue: Vite proxy targeting wrong port (8000 instead of 5000)
- [x] Updated frontend/vite.config.js to proxy /api to http://localhost:5000
- [x] Updated frontend/src/axios.js to use baseURL: "/api" to work with the proxy
- [x] Fixed password hashing conflict in signup controller (removed manual hashing, let model hook handle it)
- [x] Removed age field from getProfile response (not in user model)

## Pending Tasks
- [ ] Restart the frontend development server to apply the Vite config changes
- [ ] Ensure the backend server is running on port 5000
- [ ] Test the login functionality by attempting to log in with valid credentials
- [ ] Test the signup functionality by creating a new user account
- [ ] Verify that authentication cookies are set correctly after login/signup
- [ ] Check browser console and backend logs for any remaining errors
- [ ] Confirm that protected routes work after authentication
