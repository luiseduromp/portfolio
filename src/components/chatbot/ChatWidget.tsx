'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { RefreshCw, Send, User, X } from 'lucide-react'
import { ChatMessage, useChatStore } from '@/stores/chatStore'
import { chatInit, chatMessage } from '@/lib/chatbot'
import styles from './ChatWidget.module.css'
import { ChatbotIcon, ChatbotOutIcon } from '@/components/icons/chatbotIcons'
import { MarkdownRenderer } from './MarkdownRenderer'

const INIT_MESSAGE = 'Hello, this is my personal chatbot, feel free to ask me anything as if it was me'
const SAMPLE_MESSAGES = [
    'What is your latest project?',
    'What are your strengths?',
    '¿En qué universidad estudiaste?'
]

export const ChatWidget = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const { messages, addMessage, clearHistory } = useChatStore()
    const chatEndRef = useRef<HTMLDivElement>(null)
    const chatExpRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const init = useCallback(async () => {
        if(isActive) return

        setIsLoading(true)
        try {
            const result = await chatInit()
            if(!result.success){
                // TODO: Show error message
                console.log('Chatbot initialization failed', result.message)
                return
            }

            console.log('Authenticated. Chat session started')
            addMessage({ role: 'assistant', content: INIT_MESSAGE })
            setIsActive(true)

            if(chatExpRef.current){
                clearTimeout(chatExpRef.current)
            }

            chatExpRef.current = setTimeout(() => {
                console.log('Chat session expired')
                setIsActive(false)
            }, 30 * 60 * 1000)

        } catch (error) {
            console.log('Chatbot initialization failed', error)

        } finally {
            console.log('Stop loading')
            setIsLoading(false)
        }
    }, [addMessage, isActive])

    useEffect(() => {
        if(isOpen){
            console.log('Init Chat') 
            init()
        }  

        return () => {
            if(chatExpRef.current){
                clearTimeout(chatExpRef.current)
            }
        }
    }, [init, isOpen])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleClear = () => {
        clearHistory()
        addMessage({ role: 'assistant', content: INIT_MESSAGE })
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
        const recentHistory = messages.slice(-3)
        const chatHistory = [...recentHistory, { role: 'user', content: message } as ChatMessage]

        const result = await chatMessage(message, chatHistory)
        if(!result.success){
            console.log('Chatbot message failed', result.message)
            return
        }
        addMessage({ role: 'assistant', content: result.message })
        setIsLoading(false)
    }
      
    return ( 
        <>
            <div className={cn("fixed p-4 flex flex-col transition-all md:rounded-2xl bg-neutral-900 duration-300 overflow-hidden md:border border-neutral-800", 
                "inset-0 md:bottom-6 md:right-6 md:top-auto md:left-auto z-60",
                isOpen ? "visible opacity-100 w-full h-full md:w-md md:h-130": "invisible opacity-0 w-12 h-12 bottom-0 right-0")}
            >
                <div className="absolute right-4 top-4 flex gap-1 items-center">
                    <button onClick={handleClear} className="text-neutral-500 rounded-full py-1 px-2 text-sm hover:text-white cursor-pointer"><RefreshCw size={18}/></button>
                    <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white cursor-pointer"><X size={22}/></button>
                </div>

                <div className="mb-3 flex gap-2 items-center">
                    <div className={cn("size-12 rounded-full flex items-center bg-neutral-700 justify-center", isActive ? "opacity-100" : "opacity-80")}>
                        {isActive ? <ChatbotIcon className="size-7"/> : <ChatbotOutIcon className="size-7"/>}
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-1">Chat with me</h4>
                        <p className="text-xs font-mono text-neutral-500">
                            Personal Chatbot
                            {isActive ? 
                                <span className="ms-2 text-green-500"><span className="size-2 rounded-full bg-green-500 inline-block" /> Online</span> : 
                                <span className="ms-2 text-red-500"><span className="size-2 rounded-full bg-red-500 inline-block" /> Offline</span>
                            }
                        </p>
                    </div>
                </div>
                
                <div className={cn("border relative border-neutral-00 rounded-lg flex-1 p-2 overflow-y-auto mb-3 bg-neutral-950/50", styles.scrollbar)} >
                    
                    {messages.map((message, index) => (
                        <ChatBubble key={index} message={message}/>
                    ))}

                    {isLoading ? (
                        <div className={cn("p-2 flex gap-2 items-end justify-end w-full" )}>
                            <div className={cn("rounded-xl rounded-br-xs py-2 px-3 h-6 bg-neutral-700 text-sm flex items-center justify-center gap-1")}>
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:0ms] [animation-duration:0.5s]" />
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:250ms] [animation-duration:0.5s]" />
                                <span className="size-[5px] bg-neutral-300 rounded-full animate-bounce [animation-delay:500ms] [animation-duration:0.5s]" />
                            </div>
                            <div className="size-9 rounded-full bg-neutral-700 flex items-center justify-center"><ChatbotIcon className="h-5"/></div>
                        </div>
                    ) : null}

                    {(messages.length < 2 && isActive) ? (
                        <div className={cn("mt-2")}>
                            {SAMPLE_MESSAGES.map((message, index) => {
                                return(
                                    <button key={index} 
                                        className={cn("block w-3/4 mx-auto rounded-xl p-1 bg-neutral-800 text-sm text-neutral-300 text-center cursor-pointer mb-2 italic")} 
                                        onClick={() => sendMessage(message)}
                                    >
                                        {message}
                                    </button>
                                )
                            })}
                        </div>
                    ) : null}

                    {(!isActive && !isLoading) ? (
                        <div className={cn("p-2 flex gap-2 items-end w-11/12 ms-auto" )}>
                            <div className={cn("flex-1 rounded-xl rounded-br-xs py-3 px-4 bg-neutral-700 text-sm")}>
                                The session has expired. Do you want to
                                <button onClick={() => init()} className="text-neutral-400 hover:text-white cursor-pointer ms-1">
                                    Restore the session?
                                </button>
                            </div>
                            <div className="size-9 rounded-full bg-red-500 flex items-center justify-center"><ChatbotOutIcon className="h-6"/></div>
                        </div>
                    ) : null}

                    <div ref={chatEndRef} className="w-full h-1 bg-transparent"/>
                </div>


                <form onSubmit={handleSubmit} className={cn("relative flex gap-2 items-center border border-neutral-700 rounded-lg p-2 ps-4 bg-neutral-800")} >
                    <textarea 
                        name="message" 
                        className={cn("text-white flex-1 resize-none overflow-auto focus:outline-none focus:ring-0 focus:border-none focus:shadow-none lg:text-sm",
                            isActive ? "opacity-100" : "opacity-60 cursor-not-allowed"
                        )} 
                        placeholder="Ask me anything" rows={2}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                    <button className={cn("text-white rounded-sm size-12 flex items-center justify-center bg-linear-to-bl from-sky-400 to-emerald-400 cursor-pointer",
                        isActive ? "opacity-100" : "opacity-60 cursor-not-allowed"
                    )} type="submit">
                        <Send size={18}/>
                    </button>
                </form>
            </div>

            <button className={cn("rounded-xl size-12 lg:size-14 flex items-center justify-center cursor-pointer transition-all duration-300 group", 
                "fixed bottom-6 right-6 bg-linear-to-bl from-sky-400 to-emerald-400 text-white z-80",
                "before:absolute before:inset-0 before:bg-linear-to-bl before:from-sky-400 before:to-emerald-400 before:blur-lg ",
                "before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
                isOpen ? "invisible opacity-0" : "visible opacity-100")} 
                onClick={() => setIsOpen(true)}
            >
                <ChatbotIcon className="size-7 lg:size-9 text-neutral-900"/>
                <span className={cn("absolute bottom-14 lg:bottom-16 text-sm right-0 font-semibold bg-linear-to-bl from-sky-400 to-emerald-400 w-30 text-neutral-900",
                    "px-3 py-1 rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-200 group-hover:delay-1000 delay-200")}
                >
                    Chat with Me
                </span>
            </button>

        </>  
    )
}


const ChatBubble = ({ message, ...props }: { message: ChatMessage  } & React.HTMLAttributes<HTMLDivElement>) => {
    const isAssistant = message.role === 'assistant'

    return (
        <div className={cn("p-2 flex gap-2 items-end w-11/12", isAssistant ? "ms-auto" : "")} {...props}>
            {isAssistant ? (
                <>
                    <div className={cn("flex-1 rounded-xl rounded-br-xs py-3 px-4 bg-neutral-700 text-sm")}>
                        <MarkdownRenderer content={message.content} />
                    </div>
                    <div className="size-9 flex-shrink-0 rounded-full bg-neutral-700 flex items-center justify-center"><ChatbotIcon className="size-5"/></div>
                </>
            ) : (
                <>
                    <div className="size-9 flex-shrink-0 rounded-full bg-teal-600 flex items-center justify-center"><User size={18}/></div>
                    <p className={cn("flex-1 rounded-xl rounded-bl-xs py-3 px-4 bg-teal-600 text-sm")}>{message.content}</p>
                </>
            )}
        </div>
    )
}
