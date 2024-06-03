'use client'
import { MRT_RowData, MRT_TableOptions, MaterialReactTable, MaterialReactTableProps, useMaterialReactTable,MRT_ColumnFiltersState,MRT_SortingState } from "material-react-table"
import { useState,useEffect,type UIEvent } from "react";
import { useFetch } from "../_helpers/client";
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export function PaginatedTable<TData extends MRT_RowData>(
    {tableProps,pagination}:{
        tableProps: Omit<MRT_TableOptions<TData>,"data">,
        // getPaginated: (props:{limit: number, next?: string | undefined,query?:string|undefined}) => Promise<TData[] | undefined>
        pagination: {
            getPaginated:(props:{limit: number,next?: string | undefined,query?:string|undefined}) => Promise<TData[] | undefined>,
            data?:TData[],
        }
    }
){
    const {getPaginated}=pagination;
    const [isFetching, setIsFetching] = useState(false);
	const [data, setData]=useState<TData[]>([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // const [pagination, setPagination] = useState<{limit: number, next?: string | undefined}>({limit:20});
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const fetch=useFetch();
    useEffect(()=>{
        if(pagination.data){
            setData(pagination.data)
        }
    },[pagination.data])
	const fetchNextPage = (containerRefElement?: HTMLDivElement | null) => {
		if (containerRefElement) {
			const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
			if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching) {
				setIsFetching(true)
				getPaginated({limit:20,...(globalFilter&&{query:globalFilter})}).then(
					()=>{
						setIsFetching(false)
					}
				)
			}
		}
	}
    const fetchData = async () => {
        if (!data.length) {
          setIsLoading(true);
        } else {
          setIsFetching(true);
        }

        try {
            console.log("okkk");
            const response=await getPaginated(
                {limit:20,next:"",...(globalFilter&&{query:globalFilter})}
            )
        } catch (error) {
          setIsError(true);
          console.error(error);
          return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsFetching(false);
    };
    useEffect(()=>{
        fetchData();
    },[])
    useEffect(() => {
        fetchData();
      }, [
        globalFilter, 
        sorting,
      ]);
    const table=useMaterialReactTable({
        enablePagination:false,
        enableRowNumbers:true,
        manualFiltering: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
        ? {
            color: 'error',
            children: 'Error loading data',
          }
  
        : undefined,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        muiTableContainerProps:
            {
                sx:{
                    maxHeight:"20rem"
                },
                onScroll:(event: UIEvent<HTMLDivElement>)=>fetchNextPage(event.target as HTMLDivElement)
            }
        ,
        state: {
            globalFilter,
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
      
          },
        ...tableProps,
        data:data,
    })
    return(
        <MaterialReactTable table={table} />
    )
}