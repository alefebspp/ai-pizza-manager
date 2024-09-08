"use server"
import { cookies } from "next/headers";
import { ChatInfos, Message } from "~/types";

const baseUrl = "https://api.dify.ai/v1"

export async function sendMessage({message}: {message: string;}){
    const conversation_id = cookies().get("conversation_id")?.value ?? ""
    const response = await fetch(`${baseUrl}/chat-messages`, {
        method: "POST",
        body: JSON.stringify({
            inputs: {},
            user: "customer",
            query: message,
            response_mode: "blocking",
            conversation_id
        }),
        headers: {
            Authorization: `Bearer ${process.env.DIFY_AI_KEY}`,
            'Content-Type': 'application/json',
        }
    })

    const data: {answer: string, conversation_id: string, message_id: string} = await response.json()

    if(!cookies().has("conversation_id")){
        cookies().set("conversation_id", data.conversation_id)
    }

    return data
}   

export async function getChatInfos(){
    const conversation_id = cookies().get("conversation_id")?.value ?? ""
    const response = await fetch(`${baseUrl}/messages?user=customer&conversation_id=${conversation_id}`, 
        {
            headers: {
                Authorization: `Bearer ${process.env.DIFY_AI_KEY}`
            }
        }    
    )

    const responseData: {
        limit: number;
        has_more: boolean;
        data: {
        query: string;
        answer: string;
        id: string;
        }[];
        status?: number
    } = await response.json()

    const chatMessages: Message[] = []

    if(responseData.status === 404){
        return {
            limit: 0,
            has_more: false,
            data: []
        }
    }

    if(responseData.data && responseData.data.length > 0){
        responseData.data.forEach(({query, answer, id}) => {
            chatMessages.push({user: "customer", message: query, id: `customer-${id}`})
            chatMessages.push({user: "bot", message: answer, id: `bot-${id}`})
        })
    }

    const chatInfos: ChatInfos = {
        ...responseData,
        data: chatMessages
    }

    return chatInfos
}