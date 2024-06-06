"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { StoreApi, create, useStore } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useAlertService } from ".";
import { useFetch } from "@/app/_helpers/client";
import React from "react";

// interfaces

export interface IServiceUser {
	name: string;
	email: string;
	uuid: string;
	position: string;
	createdat:string;
}
interface IMightBeTeacher{
	isTeacher?:Boolean;
}
interface IServiceUserStoreData {
	users?: IServiceUser[];
	user?: IServiceUser;
	currentUser?: IServiceUser&IMightBeTeacher;
	nextPage?:string
}
interface IServiceUserStore extends IServiceUserStoreData {
	setUser: (newuser: IServiceUser) => void;
	setCurrentUser: (currentUser: IServiceUser | undefined) => void;
    paginationEnded?:Boolean;
}
interface IUserService extends IServiceUserStoreData {
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (user: IServiceUser) => Promise<void>;
    clearPage:()=>Promise<void>
	getPaginated: (props:{limit:number,next?:string|undefined,query?:string}) => Promise<IServiceUser[] | undefined>;
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

	const userStoreValues = useStore(userStore);
	const { users, user, currentUser, setUser, setCurrentUser }=userStoreValues;

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

		getPaginated: async (props) => {
            let {limit,query}=props
            if(props.next===""){
                userStore.setState({users:[],nextPage:undefined})
                userStoreValues.users=[]
                userStoreValues.nextPage=undefined
            }
            let {results,next}:{next:string, results:IServiceUser[] }=await fetch.post('/api/user/getpaginated',
                {
                    limit,
                    next:props.next??userStoreValues.nextPage,
                    query:query
                }
            )
            if(results.length==0){
                userStore.setState({paginationEnded:true})
            } else{
		        userStore.setState({ 
                    users: [...(userStoreValues.users??[]),...results]
                        .sort(
                            (a,b)=>(a.uuid>b.uuid?1:0)
                        ).reduce((pre,cur)=>{
                            if(pre.length==0||pre[pre.length-1].uuid!=cur.uuid){
                                pre.push(cur);
                            }
                            return pre;
                        },[] as IServiceUser[]),
                    nextPage:next 
                });
                // subjectInstanceStore.setState({ 
                //     subjectinstances: Array.from(new Set([...(subjectInstanceStoreValues.subjectinstances??[]),...results])),
                //     nextPage:next 
                // });
            }
            return results;
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
		},
		clearPage: async ()=>{
            userStore.setState({users:[],nextPage:undefined})
            userStoreValues.nextPage=undefined
            userStoreValues.users=[]
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
