import { ReactNode, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function CustomInfiniteScroll<Value>({
	pagination: { getPaginated, data },
    renderItem
}: {
	pagination: {
		getPaginated: (props: {
			limit: number;
			next?: string;
			query?: string;
		}) => Promise<Value[]>;
		data: Value[];
	},
    renderItem:(props:{data:Value,index:number})=>ReactNode
}) {
	const [currentData, setCurrentData] = useState<Value[]>([]);
	const [hasMore, setHasMore] = useState(true);
	useEffect(() => {
		loadMoreData();
	}, []);
	useEffect(() => {
            setCurrentData(data);
		if(data&&data.length){
			setHasMore(true);
        }
	}, [data]);
	const loadMoreData = async () => {
		const newData = await getPaginated({limit:20});
		if (newData.length === 0) {
			setHasMore(false);
		} else {
			if(typeof data!=="undefined"){
				setCurrentData((prevData) => [...prevData, ...newData]);
			}
		}
	};

	return (
		<InfiniteScroll
			dataLength={data.length}
			next={loadMoreData}
			hasMore={hasMore}
			loader={
				<h4 className="text-muted" style={{ textAlign: "center", padding: "1rem" }}>Loading...</h4>
			}
			endMessage={
				<p className="text-muted" style={{ textAlign: "center", padding: "1rem" }}>End of data</p>
			}
		>
			{currentData.map((data, index) => {
				return <>{renderItem({data,index})}</>
            })}
		</InfiniteScroll>
	);
}
