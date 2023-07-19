import { surpriseMePrompt } from '../constants';

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompt.length);
    const randomPrompt = surpriseMePrompt[randomIndex];
    
    if(prompt === randomPrompt) return getRandomPrompt(prompt);

    return randomPrompt;
}