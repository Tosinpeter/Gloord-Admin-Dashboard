import React from 'react'



const Questionnaire = () => {
    const questionnaire = [
        {
            id: 1,
            question: "What is your primary skin concern?",
            answer: "Acne and hyperpigmentation"
        },
        {
            id: 2,
            question: "How would you describe your skin type?",
            answer: "Combination (oily T-zone, dry cheeks)"
        },
        {
            id: 3,
            question: "Do you have any known allergies?",
            answer: "None"
        },
        {
            id: 4,
            question: "Are you currently using any skincare products?",
            answer: "Basic cleanser and moisturizer"
        },
        {
            id: 5,
            question: "How much time can you dedicate to skincare routine?",
            answer: "10-15 minutes daily"
        },
    ]
    return (
        <div className="flex flex-col gap-5">
            {questionnaire.map(({ id, question, answer }) => (
                <div key={id} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-normal">{question}</p>
                        <h4 className='font-medium text-base'>{answer}</h4>
                    </div>
                    {id < questionnaire.length && (
                        <div className="bg-sec h-[1px] w-full" />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Questionnaire
