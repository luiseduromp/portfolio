'use client'

import React, { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Bot, RefreshCw, Send, User, X } from 'lucide-react'
import { Message, useChatStore } from '@/stores/chatStore'
import { chatInit, chatMessage } from '@/lib/chatbot'
import styles from './ChatWidget.module.css'

export const ChatWidget = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { messages, addMessage, clearHistory } = useChatStore()
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const init = async () => {
            const result = await chatInit()
            if(!result.success){
                console.log(result.message)
                return
            }
            console.log('Authenticated')
            addMessage({ role: 'assistant', content: 'Hello, this is my personal chatbot, feel free to ask me anything as it it was me' })
        }

        init()
    }, [])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        if(messages.length > 0){
            console.log('New Chat')
        }
    }, [messages])

    const handleClear = () => {
        clearHistory()
        addMessage({ role: 'assistant', content: 'Hello, this is my personal chatbot, feel free to ask me anything as it it was me' })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = e.currentTarget.message.value
        if(message.trim() === '') return
        sendMessage(message)
        e.currentTarget.reset()
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.form
            const message = form?.message.value
            if(message.trim() === '') return
            sendMessage(message)
            form?.reset()
        }
    }

    const sendMessage = async (message: string) => {
        setIsLoading(true)
        addMessage({ role: 'user', content: message })
        const recentHistory = messages.slice(-5)
        const chatHistory = [...recentHistory, { role: 'user', content: message } as Message]

        console.log('sendMessage->message', message)
        console.log('sendMessage->chatHistory', chatHistory)

        const result = await chatMessage(message, chatHistory)
        if(!result.success){
            console.log(result.message)
            return
        }
        addMessage({ role: 'assistant', content: result.message })
        setIsLoading(false)
    }
      
    return ( 
        <div className={cn("fixed bottom-0 right-0 md:bottom-6 md:right-6 z-40")}
        >
            <div className={cn("relative p-4 flex flex-col transition-all rounded-2xl bg-neutral-900 duration-300 overflow-hidden border border-neutral-800", 
                isOpen ? "visible opacity-100 w-full h-140 sm:w-md sm:h-130": "invisible opacity-0 w-12 h-12")}
            >
                <div className="flex gap-2 items-center justify-between mb-1">
                    <h4 className="text-xl font-bold">Chat with me</h4>
                    <div className="flex gap-1 items-center">
                        <button onClick={handleClear} className="text-neutral-500 rounded-full py-1 px-2 text-sm hover:text-white cursor-pointer">
                            <RefreshCw size={18}/>
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white cursor-pointer"><X size={22}/></button>
                    </div>
                </div>
                <p className="text-xs font-mono text-neutral-500 mb-3">Personal RAG Chatbot.</p>
                
                <div className={cn("border border-neutral-00 rounded-lg flex-1 p-2 overflow-y-auto mb-3 bg-neutral-950/50", styles.scrollbar)} >
                    {messages.map((message, index) => {
                        if(message.role === 'assistant'){
                            return(
                                <div key={index} className={cn("p-2 flex gap-2 items-end w-11/12 ms-auto" )}>
                                    <p className={cn("flex-1 rounded-xl rounded-br-xs py-2 px-3 bg-neutral-700 text-sm")}>{message.content}</p>
                                    <div className="size-9 rounded-full bg-neutral-700 flex items-center justify-center"><Bot size={18}/></div>
                                </div>
                            )
                        }
                        return(
                            <div key={index} className={cn("p-2 flex gap-2 items-end w-11/12" )}>
                                <div className="size-9 rounded-full bg-teal-600 flex items-center justify-center"><User size={18}/></div>
                                <p className={cn("flex-1 rounded-xl rounded-bl-xs py-2 px-3 bg-teal-600 text-sm")}>{message.content}</p>
                            </div>
                        )
                    })}
                    {isLoading && (
                        <div className={cn("p-2 flex gap-2 items-end justify-end w-full" )}>
                            <div className={cn("rounded-xl rounded-br-xs py-2 px-3 h-6 bg-neutral-700 text-sm flex items-center justify-center gap-1")}>
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:0ms] [animation-duration:0.5s]" />
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:250ms] [animation-duration:0.5s]" />
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:500ms] [animation-duration:0.5s]" />
                            </div>
                            <div className="size-9 rounded-full bg-neutral-700 flex items-center justify-center"><Bot size={18}/></div>
                        </div>
                    )}

                    <div ref={chatEndRef} className="w-full h-1 bg-transparent"/>
                </div>


                <form onSubmit={handleSubmit} className="relative flex gap-2 items-center border border-neutral-700 rounded-lg p-2 ps-3 bg-neutral-800">
                    <textarea 
                        name="message" 
                        className={cn("text-white text-sm flex-1 resize-none overflow-auto focus:outline-none focus:ring-0 focus:border-none focus:shadow-none ")} 
                        placeholder="Ask me anything" rows={2}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <button className="text-white rounded-sm size-10 flex items-center justify-center bg-linear-to-bl from-sky-400 to-emerald-400 cursor-pointer" type="submit">
                        <Send size={18}/>
                    </button>
                </form>
            </div>

            <button className={cn("rounded-xl size-12 xl:size-14 flex items-center justify-center cursor-pointer transition-all duration-300 group", 
                "absolute bottom-4 right-4 md:bottom-0 md:right-0 bg-linear-to-bl from-sky-400 to-emerald-400 text-white",
                "before:absolute before:inset-0 before:bg-linear-to-bl before:from-sky-400 before:to-emerald-400 before:blur-lg ",
                "before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
                isOpen ? "invisible opacity-0" : "visible opacity-100")} 
                onClick={() => setIsOpen(true)}
            >
                <Bot size={28} className="size-7 xl:size-8"/>
                <span className={cn("absolute bottom-14 xl:bottom-16 right-0 text-sm font-semibold bg-linear-to-bl from-sky-400 to-emerald-400 w-30 text-neutral-900",
                    "px-3 py-1 rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-200 group-hover:delay-1000 delay-200")}
                >
                    Chat with Me
                </span>
            </button>

        </div>
            
            
    )
}
