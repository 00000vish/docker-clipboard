'use client';

import { useEffect, useState } from "react";
import { getPastes, deleteItem, getItem } from "@/lib/backend";
import Link from "next/link";

export default function GetPastes() {
	const [pasteValues, setPasteValues] = useState([]);

	async function onDelete(id) {
		deleteItem(id);

		await onUseEffect();
	}

	async function onCopy(id) {
		var text = await getItem(id);

		const type = "text/plain";
		const blob = new Blob([text], { type });
		const data = [new ClipboardItem({ [type]: blob })];

		await navigator.clipboard.write(data);
	}

	async function onUseEffect() {
		var pastes = await getPastes();
		
		setPasteValues(pastes);
	}

	useEffect(() => {
		onUseEffect();
	}, [])

	return (
		<div>
			<div>
				<div className="alert alert-dark row g-0" role="alert">
					<div className="col d-flex justify-content-start align-items-center">
						{pasteValues.length === 0 ? (
							<span>
								Nothing pasted yet.
							</span>
						) : (
							<span>
								{pasteValues.length} pasted.
							</span>
						)}
					</div>
					<div className="col d-flex justify-content-end">
						<Link type="button"
							href="/set"
							className="btn btn-success rounded me-2">
							<i className="bi bi-plus-circle-fill"></i>
						</Link>
					</div>
				</div>
			</div>
			{
				pasteValues.map(x => (
					<div className="card mb-1" key={x.id}>
						<div className="card-body">
							<textarea className="form-control" disabled rows={1} value={x.data} />
						</div>
						<div className="card-footer text-body-secondary">
							<div className="row g-0">
								<div className="col">
									<button className="btn btn-outline-danger ms-1"
										onClick={() => onDelete(x.id)}>
										<i className="bi bi-trash-fill"></i>
									</button>
								</div>
								<div className="col d-flex justify-content-end">
									<button className="btn btn-primary"
										onClick={() => onCopy(x.id)}>
										<i className="bi bi-clipboard-check-fill"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))
			}
		</div>
	);
}