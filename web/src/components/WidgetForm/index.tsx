import { useState } from "react";

import bugImage from '../../assets/bug.svg'
import ideaImage from '../../assets/idea.svg'
import thoughtImage from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImage,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImage,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImage,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent? 
                    <FeedbackSuccessStep 
                        onFeedbackRestarRequested={handleRestartFeedback}
                    />
                :
                <>
                    { !feedbackType? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep feedbackType={feedbackType}
                            onFeedbackRestarRequested={handleRestartFeedback} 
                            onFeedbackSent={setFeedbackSent}/>
                    ) }
                </>
}
            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
            </footer>
        </div>
    )
}