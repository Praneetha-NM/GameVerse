import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoggedIn: false,
            
            // Set user details properly
            setDetails: ({ user, token }) => {
                console.log("🚀 Zustand setDetails received:", { user, token });
                if (!token) {
                    console.error("❌ setDetails received an undefined token!");
                    return;
                }
                set({ user, token, isLoggedIn: true });
            },

            // Fetch user details and update Zustand state
            getUser: async (token) => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-detail`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // ✅ Fixed incorrect token format
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch user");
                    }

                    const data = await response.json();
                    set((state) => ({
                        user: data,
                        token: state.token, // Preserve existing token
                        isLoggedIn: true,
                    }));
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            },

            clearUser: () => {
                console.log("🔄 Clearing user state");
                set({ user: null, token: null, isLoggedIn: false });
            },
        
        }),
        {
            name: "user-store",
            getStorage: () => localStorage, // ✅ Name of localStorage key
        }
    )
);

export default useUserStore;
