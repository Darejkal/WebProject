"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { StoreApi, create, useStore } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useAlertService } from ".";
import { useFetch } from "@/app/_helpers/client";
import React from "react";

// interfaces

interface IServiceUser {
	name: string;
	password: string;
	email: string;
	uuid: string;
	position: string;
}
interface IMightBeTeacher{
	isTeacher?:Boolean;
}
interface IServiceUserStoreData {
	users?: IServiceUser[];
	user?: IServiceUser;
	currentUser?: IServiceUser&IMightBeTeacher;
}
interface IServiceUserStore extends IServiceUserStoreData {
	setUser: (newuser: IServiceUser) => void;
	setCurrentUser: (currentUser: IServiceUser | undefined) => void;
}
interface IUserService extends IServiceUserStoreData {
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (user: IServiceUser) => Promise<void>;
	getPaginated: (
		limit: number,
		next?: string
	) => Promise<IServiceUser[] | undefined>;
	getByUUID: (id: string) => Promise<IServiceUser | undefined>;
	getCurrent: (redirect?: Boolean) => Promise<IServiceUser | undefined>;
	currentHasTeacherRole:()=>Promise<Boolean>;
	updateCurrent:(params:any)=>Promise<void>;
	// create: (user: IServiceUser) => Promise<void>,
	// update: (id: string, params: Partial<IServiceUser>) => Promise<void>,
	// delete: (id: string) => Promise<void>
}
const defaultInitState = {
	users: undefined,
	user: undefined,
	currentUser: undefined,
};
const createUserStore = (
	initState: IServiceUserStoreData = defaultInitState
) => {
	return create<IServiceUserStore>(
		(set, get) => ({
			...initState,
			setUser: (newuser: IServiceUser) => {
				set({ user: newuser });
			},
			setCurrentUser: (newuser: IServiceUser | undefined) => {
				set({ currentUser: newuser });
			},
		}));
};

export function useUserService(): IUserService {
	const alertService = useAlertService();
	const fetch = useFetch();
	const router = useRouter();
	const searchParams = useSearchParams();
	const userStore = useContext(UserStoreContext);

	if (!userStore) {
		throw new Error(`userservice must be inside an user context provider`);
	}

	const { users, user, currentUser, setUser, setCurrentUser } =
		useStore(userStore);

	return {
		users,
		user,
		currentUser,
		login: async (email, password) => {
			try {
				const newUser = await fetch.post("/api/user/login", {
					email,
					password,
				});
				setCurrentUser(newUser);
				console.log(currentUser);
				// get return url from query parameters or default to '/'
				const returnUrl = searchParams.get("returnUrl") || "/";
				router.push(returnUrl);
			} catch (error: any) {
				throw "Login failed";
			}
		},
		logout: async () => {
			await fetch.post("/api/user/logout");
			setCurrentUser(undefined);
			router.push("/login");
		},
		register: async (user) => {
			try {
				await fetch.post("/api/user/signup", user);
				alertService.success("Registration successful", true);
				router.push("/login");
			} catch (error: any) {
				alertService.error(error);
			}
		},

		getPaginated: async (limit, next) => {
			userStore.setState({
				users: await fetch.post("/api/user/getpaginated", { limit, next }),
			});
			return users;
		},
		getByUUID: async (uuid: string) => {
			userStore.setState({ user: undefined });
			try {
				userStore.setState({ user: await fetch.get(`/api/users/${uuid}`) });
			} catch (error: any) {
				alertService.error(error);
			}
			return user;
		},
		getCurrent: async (redirect = true) => {
			console.log("getcurrent");
			console.log(currentUser);
			if (!currentUser) {
				try {
					setCurrentUser(await fetch.get("/api/user/current"));
				} catch (error: any) {
					alertService.error(error);
					setCurrentUser(undefined);
					if (redirect) {
						router.push("/login");
					}
				}
			}
			console.log("aftergetcurrent");
			console.log(currentUser)
			return currentUser;
		},
		currentHasTeacherRole:async()=>{
			if(!currentUser){
				return false;
			}
			if(!("isTeacher" in currentUser) ){
				try{
					userStore.setState({currentUser:{...currentUser,isTeacher:await fetch.get("/api/user/hasrole/teacher")}})
				} catch(e){
					userStore.setState({currentUser:{...currentUser,isTeacher:false}})
				}
			}
			return currentUser.isTeacher?true:false;
		},
		updateCurrent: async (params)=>{
			await fetch.post("/api/user/update",params)
		}
	};
}

export const UserStoreContext = createContext<
	StoreApi<IServiceUserStore> | undefined
>(undefined);

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
	const storeRef = useRef<StoreApi<IServiceUserStore>>();
	// console.log("storeRef current")
	// console.log(storeRef.current)
	// React.useEffect(() => {
	// 	if (!storeRef.current) {
	// 		const user = localStorage.getItem("user");
	// 		if (user) {
	// 			storeRef.current=createUserStore(JSON.parse(user));
	// 		} else{
	// 			storeRef.current = createUserStore()
	// 		}
	// 		console.log("recreated userstore")
	// 	}
	// 	// hydrate on mount

	// }, []);
	if (!storeRef.current) {
		storeRef.current = createUserStore();
	}
	return (
		<UserStoreContext.Provider value={storeRef.current}>
			{children}
		</UserStoreContext.Provider>
	);
};
