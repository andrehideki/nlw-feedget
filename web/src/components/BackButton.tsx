import { ArrowLeft } from "phosphor-react";

interface BackButtonProps {
    onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
    return (
        <button 
            onClick={onClick}
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" title="Voltar para o fomulário de tipo feedback"
        >
            <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>
    )
}