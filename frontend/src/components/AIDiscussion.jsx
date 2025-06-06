import React, { useRef, useEffect } from "react";
import { Send, Bot, User, Clock, HelpCircle } from "lucide-react";
import { useAIDiscussionStore } from "../store/useAIDiscussionStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SUGGESTED_QUESTIONS = [
  "Can you explain the problem in simpler terms?",
  "What's the time complexity of the optimal solution?",
  "Can you provide a step-by-step approach?",
  "What are the edge cases I should consider?",
  "Can you explain the key algorithm/data structure needed?",
];

const AIDiscussion = ({ problemId, selectedLanguage }) => {
  const { messages, isLoading, sendMessage, clearMessages, currentProblemId } =
    useAIDiscussionStore();

  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentProblemId !== problemId) {
      clearMessages();
    }
  }, [clearMessages, currentProblemId, problemId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    await sendMessage(problemId, userMessage, selectedLanguage);
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = (message) => {
    const hasCode = message.content.includes("```");
    if (!hasCode) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    const parts = message.content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).trim();
        const language = code.split("\n")[0];
        const codeContent = code.split("\n").slice(1).join("\n");
        return (
          <SyntaxHighlighter
            key={index}
            language={language || "plaintext"}
            style={vscDarkPlus}
            className="rounded-md my-2"
          >
            {codeContent}
          </SyntaxHighlighter>
        );
      }
      return (
        <p key={index} className="whitespace-pre-wrap">
          {part}
        </p>
      );
    });
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
            <p className="text-sm mt-2 mb-6">
              I can help you understand the problem, suggest approaches, or
              explain concepts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    scrollToBottom();
                  }}
                  className="flex items-center gap-2 p-3 text-left bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">{question}</span>
                </button>
              ))}
            </div>
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
                {renderMessage(message)}
                <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                  <Clock className="w-3 h-3" />
                  <span>
                    {formatTimestamp(message.timestamp || new Date())}
                  </span>
                </div>
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
