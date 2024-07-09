
# Building a PDF Chatbot with Upstash RAGChat

Chatbots are becoming increasingly sophisticated, leveraging advanced AI models to provide human-like interactions. In this project, we combine the power of Upstash RAGChat and OpenAI's GPT-4 to create a chatbot that can process and understand PDF documents.

## Project Overview
### Key Components
1. PDF Upload and Text Extraction
	*  Users start by uploading a PDF.
	* The file is then processed, and its text content is extracted.
	* This extracted information is provided to OpenAI's GPT model.
2. Chat interface
	* A user-friendly chat interface allows users to interact with the extracted content.
	* User messages are sent to the backend, where the RAGChat model processes them and returns responses.

## How It Works
Note: This section doesn't cover the entire codebase. We'll focus on crucial parts of the project to clarify implementation details. For example, we won't discuss design and UI details but will focus on the more functional aspects of the project. For those interested in these details, you can examine the [source code](https://github.com/ErayEroglu/rag-chatbot). 
### 1. RagCHAT Initilizaton
We start by initializing the RAGChat object with an AI model. We chose OpenAI's GPT-4-turbo model. The method is straightforward; we import the required packages and specify the model. Although this is a short piece of code, it's good practice to create a separate file to keep the project organized. Thus, we created the `rag-chat.ts` file.
```typescript
import { RAGChat, openaiModel } from '@upstash/rag-chat'

export const ragChat = new RAGChat({
    model: openaiModel("gpt-4-turbo")
})
```



### 2. Uploading PDF and Text Extraction

The `pdf-extractor.ts` file handles the PDF upload and text extraction process. When a user uploads a PDF, the file is sent to the server where it is parsed, and the text content is extracted. This file creates a response for `/api/pdf-extractor` endpoint. After extracting the text, we provide it to the RAGChat model to process and understand the file's content. To do this, we import the RAGChat object created in the first part. Additionally, to handle requests, we import the necessary Next.js packages.

``` typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { ragChat } from '@/utils/rag-chat'

const pdf = require('pdf-parse')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const data = req.body.data
        const text = await extractTextFromPDF(data)
        ragChat.context.add({
            type: 'text',
            data: text,
        })
        res.status(200).json({
            message: 'PDF extracted successfully',
        })
    } else {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    }
}
```
The `extractTextFromPDF` function is responsible for extracting text from the file. This method uses the `pdf-parse` library to extract the text content from the number array representing the PDF.
``` typescript
async function extractTextFromPDF(data: number[]): Promise<string> {
    // Convert the array of numbers back to a Buffer
    const buffer = Buffer.from(data)
    const pdfData = await pdf(buffer)
    let pdfText = pdfData.text
    // also add number check
    pdfText = pdfText.replace(/[^\p{L}\p{N}]/gu, ' ')
    pdfText = pdfText.replace(/\s+/g, ' ').trim()
    return pdfText
}
```

#### 3. Handling Chat Requests

The `route.ts` file processes chat requests and integrates with the RAGChat model. This file is located in a specific directory, `/api/chat`. This folder location is specifically set by the Vercel AI SDK; following their convention, we can directly send the AI model response to the frontend without dealing with endpoints manually. For this file, we import Upstash's Next.js package for RAGChat and the RAGChat object we created in the first step.
```typescript
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs'
import { ragChat } from '@/utils/rag-chat'

export async function POST(req: Request) {
    try {
        console.log('Request received')
        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1].content
        const response = await ragChat.chat(lastMessage, { streaming: true })
        return aiUseChatAdapter(response)
    } catch (error) {
        console.error('OpeanAI API error :', error)
        return new Response('OpeanAI API error', { status: 500 })
    }
}
```

#### 4.  Building the Chat Interface

The `chat.tsx` file provides a user-friendly chat interface and manages the requests and responses between the frontend and backend. Users can upload PDF files, view the extracted content, and interact with the chatbot. This file imports UI components from other files located in the `/components/ui/` directory. We can break this file into several parts:

1-  This hook is responsible for handling communication with the AI model. It specifies the endpoint for user messages.
```typescript
const { messages, input, handleInputChange, handleSubmit, setMessages } =
        useChat({
            api: '/api/chat',
        })
```

2 - This function sets the file url. It will be used in file upload and text extraction.
```typescript
const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files

        if (files && files.length > 0) {
            const selectedPdf = files[0]
            setFileUrl(URL.createObjectURL(selectedPdf))
        }
    }
  ```
3- This function is the most important one. It handles the file upload and sends the file to the `/api/pdf-extractor` endpoint. After getting the response, it sets the file uploading flag to true and creates a default message for the chatbot. If anything unusual happens, the corresponding error message is shown to the user.
```typescript
 async function handleUpload() {
        if (fileUrl && !isFileUploaded) {
            setMsg('Uploading...')
            
            // Fetch the file and extract the text
            const responseToBlob = await fetch(fileUrl)
            const blob = await responseToBlob.blob()
            const arrayBuffer = await new Response(blob).arrayBuffer()
            const uint8Array = new Uint8Array(arrayBuffer)

            const response = await fetch('/api/pdf-extractor', {
                method: 'POST',
                body: JSON.stringify({ data: Array.from(uint8Array) }),
                headers: {
                    'Content-Type': 'application/json',
                    'req-type': 'fileUpload',
                },
            })

            if (response.ok) {
                setIsFileUploaded(true)
                setMsg('File uploaded successfully')
                setMessages([
                    {
                        id: '-1',
                        role: 'system',
                        content: 'Hi, how can I help you today?',
                    },
                ])
            } else {
                setMsg('Error while uploading file')
                console.log('Error:', response.status)
            }
        } else {
            console.log('No file selected')
        }
    }
```
4- The last part is mostly about UI. It is not a complex design, yet it is effective and useful. 
```typescript
 return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="grid w-full max-w-3xl px-4 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <TextIcon className="w-8 h-8" />
                        <h1 className="text-2xl font-bold tracking-tighter">
                            PDF Chat
                        </h1>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label className="leading-none" htmlFor="upload">
                            Select a PDF to upload
                        </Label>
                        <div className="flex items-center gap-4">
                            <Input
                                accept=".pdf"
                                id="upload"
                                type="file"
                                onChange={handleFileChange}
                                className="max"
                            />
                            <Button
                                className="upload-button"
                                disabled={!fileUrl}
                                type="button"
                                onClick={handleUpload}
                            >
                                Upload
                            </Button>
                        </div>
                        {msg && <span>{msg}</span>}
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label className="leading-none" htmlFor="conversation">
                            Conversation
                        </Label>
                        <div className="border p-4 rounded-lg h-48 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-bubble ${message.role === 'user' ? 'user-message' : 'system-message'}`}
                                >
                                    <div className="chat-content">
                                        <p className="message">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <Textarea
                            id="message"
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message"
                            value={input}
                            disabled={!isFileUploaded}
                        />
                    </div>
                    <div className="flex justify-center">
                        <form onSubmit={handleSubmit}>
                            <Button type="submit" disabled={!isFileUploaded}>
                                Send
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
```

## Functionality of Upstash RAGChat

Upstash's RAGChat provides an efficient way to handle conversational AI by leveraging vector databases for fast retrieval and seamless integration with large language models like GPT-4. At the heart of RAGChat's efficiency is the use of vector databases. Traditional databases are optimized for structured data and specific queries, but they fall short when it comes to unstructured data like natural language. This is where vector databases come into play. They store data in high-dimensional vectors that represent the semantic meaning of text. Whenever a message is processed by RAGChat, it is automatically converted into an embedding. This removes the need for developers to manually handle the conversion process, saving time and reducing potential errors. Developers can focus on building the chatbot's features and logic rather than managing underlying storage mechanisms.

## Conclusion
By utilizing Upstash RAGChat and OpenAI's GPT-4, developers can create advanced, context-aware chatbots with minimal effort. Upstash simplifies the process through automatic embedding generation, efficient data storage and retrieval, and seamless integration with powerful language models. Additionally, hosting your chatbot on Vercel is straightforward, with no extra effort required. Also, you can use the [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction), which offers very helpful tools for AI-powered applications using Next.js. In summary, by utilizing Upstash, OpenAI, and Vercel, you can build and deploy your own RAG chatbot tailored to your specific needs.

If you enjoyed this tutorial, you can check other blogs/tutorials on the [Upstash blog](https://upstash.com/blog). If you have any comments or questions, you can reach out to us from [Discord](https://discord.com/invite/jUxUYE4nEB) or [Twitter](https://twitter.com/upstash). Thanks for reading.