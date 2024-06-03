'use client'
import { MRT_RowData, MRT_TableOptions, MaterialReactTable, MaterialReactTableProps, useMaterialReactTable,MRT_ColumnFiltersState,MRT_SortingState } from "material-react-table"
import { useState,useEffect,type UIEvent } from "react";
import { useFetch } from "../_helpers/client";
export function PaginatedTable<TData extends MRT_RowData>(
    {tableProps,getPaginated}:{
        tableProps: MRT_TableOptions<MRT_RowData>,
        getPaginated: (props:{limit: number, next?: string | undefined}) => Promise<TData[] | undefined>
    }
){
    const [isFetching, setIsFetching] = useState(false);
	const [data, setData]=useState<TData[]>([])
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<{limit: number, next?: string | undefined}>({limit:20});
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const fetch=useFetch();
	const fetchNextPage = (containerRefElement?: HTMLDivElement | null) => {
		if (containerRefElement) {
			const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
			if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching) {
				setIsFetching(true)
				getPaginated({...pagination,...(globalFilter&&{query:globalFilter})}).then(
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
            const response=await getPaginated(
                {...pagination,...(globalFilter&&{query:globalFilter})}
            )
            if(response){
                setData(response);
            } else{
                setData([]);
            }
        } catch (error) {
          setIsError(true);
          console.error(error);
          return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsFetching(false);
    };
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