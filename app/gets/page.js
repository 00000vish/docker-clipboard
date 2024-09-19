'use client';

import { useEffect, useState } from "react";
import { getPastes, deletePaste } from "@/lib/backend";

import Paste from "@/components/paste";
import Link from "next/link";

export default function GetPastes() {
	const [pasteValues, setPasteValues] = useState([]);

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
						<Link href="/set"
							className="btn btn-primary rounded ms-2">
							<i className="bi bi-clipboard-plus"></i>
						</Link>
					</div>
				</div>
			</div>
			{
				pasteValues.map(x => (
					<div className="mb-1" key={x.id}>
						<Paste data={x}/>
					</div>
				))
			}
		</div>
	);
}