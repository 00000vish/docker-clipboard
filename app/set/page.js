'use client'

import { useState } from "react";
import { setPaste } from "@/lib/backend";
import Link from "next/link";

export default function GetPastes() {
    const [inputValue, setInputValue] = useState('');

    async function onPaste() {
        await setPaste(inputValue);

        window.location.href = '/';
    }

    return (
        <div className="container mt-5">
            <div className="card ">
                <div className="card-header d-flex">
                    <Link href="/" className="me-2">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Link>
                    Paste below
                </div>
                <div className="card-body">
                    <textarea className="form-control"
                        onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div className="card-footer text-body-secondary text-end">
                    <button className="btn btn-success"
                        onClick={onPaste}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}