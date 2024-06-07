export default function AppFooter() {
	return (
		<div style={{maxHeight:"5rem",marginTop:"auto",width:"100vw"}}>
			<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" style={{padding:"0 4rem"}}>
                <div className="col-md-4 d-flex align-items-center">
					<span className=" mb-md-0 text-muted">© 2024, Web Nhom 1 Team</span>
				</div>

				<ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
					<li className="ms-3">
						<a className="text-muted" href="/aboutus">
							About Us
						</a>
					</li>
				</ul>
			</footer>
		</div>
	);
}
