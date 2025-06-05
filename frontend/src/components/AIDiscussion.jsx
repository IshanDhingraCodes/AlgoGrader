import React, { useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useAIDiscussionStore } from "../store/useAIDiscussionStore";

const AIDiscussion = ({ problemId }) => {
  const { messages, isLoading, sendMessage, addUserMessage, clearMessages } =
    useAIDiscussionStore();

  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    clearMessages();
  }, [problemId, clearMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    addUserMessage(userMessage);
    await sendMessage(problemId, userMessage);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">
              Ask me anything about this problem!
            </p>
            <p className="text-sm mt-2">
              I can help you understand the problem, suggest approaches, or
              explain concepts.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-content"
                    : "bg-base-200"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 bg-base-100 p-4 border-t border-base-300"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the problem..."
            className="flex-1 input input-bordered"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIDiscussion;
