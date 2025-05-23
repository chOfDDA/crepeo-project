import axios from "axios";
import { toast } from "vue-sonner";
import { handleUnauthorized } from "@/utils/authUtils";
import { useUserStore } from "@/stores/user";

const api = axios.create();

api.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        if (error.config.url.includes("/auth/login")) {
          toast.error("Wrong email or password.");
        } else {
          toast.error("Unauthorized. Please log in again.");
          handleUnauthorized();
        }
        break;
      case 403:
        toast.error("Access denied.");
        break;
      case 404:
        if (
          error.config.url.includes("/api/profile") ||
          error.config.url.includes("/api/users")
        ) {
          break;
        }

        toast.error("Resource not found.");
        break;
      case 409:
        if (error.config.url.includes("/auth/register")) {
          const message = error.response.data.message?.toLowerCase();

          if (message?.includes("email")) {
            toast.error("User with this email alredy exists");
          } else if (message?.includes("username")) {
            toast.error("User with this username alredy exists");
          } else {
            toast.error("User already exists");
          }
        } else {
          toast.error("Conflict error.");
        }
        break;
      case 422:
        toast.error(error.response.data.message || "Validation error.");
        break;
      case 500:
        toast.error("Server error. Try again later.");
        break;
      default:
        toast.error(
          error.response.data.message || "An unexpected error occurred."
        );
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
