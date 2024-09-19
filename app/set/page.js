'use client'

import { useState } from "react";
import { setPaste, encrypt } from "@/lib/backend";

import Link from "next/link";

export default function GetPastes() {
    const [inputValue, setInputValue] = useState('');
    const [encryptKey, setEncryptKey] = useState('');
    const [encryptOn, setEncryptOn] = useState(false);

    async function onPaste() {
        let text = inputValue;

        if (encryptOn && encryptKey.length !== 0) {
            text = await encrypt(text, encryptKey)
        }

        await setPaste(text);

        window.location.href = '/';
    }

    async function onEncrypt() {
        setEncryptOn(!encryptOn);
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
                <div className="card-footer text-body-secondary row g-0">
                    <div className="col d-flex">
                        <button className="btn btn-outline-secondary"
                            onClick={onEncrypt}>
                            <i className="bi bi-key-fill"></i>
                        </button >
                        {encryptOn
                            ? <div className="ms-1">
                                <input className="form-control"
                                    onChange={(e) => setEncryptKey(e.target.value)} />
                            </div>
                            : <div />
                        }

                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-success"
                            onClick={onPaste}>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}