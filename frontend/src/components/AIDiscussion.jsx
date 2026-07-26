import React, { useRef, useEffect, useState } from "react";
import {
  Send,
  Bot,
  User,
  Clock,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Brain,
  Zap,
  Lightbulb,
  Code2,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAIDiscussionStore } from "../store/useAIDiscussionStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";

const SUGGESTED_CATEGORIES = [
  {
    icon: Lightbulb,
    title: "Concept",
    question: "Can you explain the main concept behind this problem in simple terms?",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Zap,
    title: "Complexity",
    question: "What is the optimal time and space complexity for solving this?",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Code2,
    title: "Strategy",
    question: "Can you provide a step-by-step approach without giving away the complete code?",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Terminal,
    title: "Edge Cases",
    question: "What tricky edge cases should I test for this problem?",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

const LOADING_STEPS = [
  "Analyzing problem statement & constraints...",
  "Formulating step-by-step reasoning...",
  "Generating optimal explanations & code snippets...",
  "Finalizing response...",
];

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-lg overflow-hidden border border-base-content/10 shadow-lg bg-base-300">
      <div className="flex items-center justify-between px-3 py-1.5 bg-base-300 border-b border-base-content/10 text-xs font-mono text-base-content/70">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-primary" />
          <span>{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-primary transition-colors py-0.5 px-1.5 rounded hover:bg-base-200"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "plaintext"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "0.875rem",
          fontSize: "0.85rem",
          lineHeight: "1.5",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const AIDiscussion = ({ problemId, selectedLanguage }) => {
  const { messages, isLoading, sendMessage, clearMessages, currentProblemId } =
    useAIDiscussionStore();

  const [input, setInput] = useState("");
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
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
  }, [messages, isLoading]);

  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await sendMessage(problemId, userMessage, selectedLanguage);
  };

  const handleSuggestionClick = async (question) => {
    if (isLoading) return;
    await sendMessage(problemId, question, selectedLanguage);
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessageContent = (content) => {
    const hasCode = content.includes("```");
    if (!hasCode) {
      return <p className="whitespace-pre-wrap leading-relaxed">{content}</p>;
    }

    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const codeBlock = part.slice(3, -3).trim();
        const firstLineEnd = codeBlock.indexOf("\n");
        let language = "plaintext";
        let codeContent = codeBlock;

        if (firstLineEnd !== -1) {
          const potentialLang = codeBlock.slice(0, firstLineEnd).trim();
          if (potentialLang && !potentialLang.includes(" ")) {
            language = potentialLang;
            codeContent = codeBlock.slice(firstLineEnd + 1);
          }
        }

        return <CodeBlock key={index} language={language} code={codeContent} />;
      }
      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-base-100/50 backdrop-blur-sm relative overflow-hidden">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-base-content/10 bg-base-200/40 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-md shadow-primary/20">
            <div className="w-full h-full bg-base-100 rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-1.5">
              AlgoGrader AI Tutor
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-base-content/60">
              Target Language: <span className="font-semibold text-primary">{selectedLanguage || "Python"}</span>
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => clearMessages()}
            className="btn btn-ghost btn-xs gap-1 text-base-content/60 hover:text-error hover:bg-error/10 transition-colors"
            title="Reset discussion"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-6 text-center max-w-xl mx-auto"
          >
            <div className="relative mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/5 to-secondary/20 flex items-center justify-center border border-primary/20 shadow-xl shadow-primary/10">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-base-100"
              />
            </div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-base-content via-base-content to-primary bg-clip-text text-transparent mb-1">
              Ask AI Anything
            </h3>
            <p className="text-sm text-base-content/70 mb-6 max-w-md">
              Need a hint, an optimal approach, or help analyzing time complexity? Select a prompt or type your question below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTED_CATEGORIES.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(item.question)}
                    className="flex items-start gap-3 p-3.5 text-left rounded-xl bg-base-200/50 hover:bg-base-200 border border-base-content/5 hover:border-primary/30 transition-all group shadow-sm"
                  >
                    <div className={`p-2 rounded-lg border ${item.color} shrink-0 mt-0.5`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold opacity-75">{item.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs font-medium text-base-content/80 line-clamp-2 mt-0.5">
                        {item.question}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm text-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-content rounded-tr-none"
                    : "bg-base-200/80 border border-base-content/10 rounded-tl-none"
                }`}
              >
                {renderMessageContent(message.content)}
                <div
                  className={`flex items-center gap-1 mt-2.5 text-[11px] ${
                    message.role === "user" ? "text-primary-content/70" : "text-base-content/50"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(message.timestamp || new Date())}</span>
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 text-primary-content shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))
        )}

        {/* Dynamic AI Loading state with shimmer and glowing steps */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/40 flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-4 h-4 text-primary animate-pulse" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
              </div>

              <div className="bg-base-200/90 border border-primary/30 rounded-2xl rounded-tl-none p-4 min-w-[260px] shadow-lg relative overflow-hidden">
                {/* Glowing subtle background gradient pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 animate-pulse" />

                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Assistant thinking...</span>
                  </div>

                  <p className="text-xs text-base-content/70 font-mono transition-all duration-300">
                    {LOADING_STEPS[loadingStepIndex]}
                  </p>

                  {/* Pulsing Loading Dots & Shimmer Bar */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Sticky Input Form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 bg-base-100/90 backdrop-blur-md p-3.5 border-t border-base-content/10 z-10"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about hints, approach, or complexity..."
            className="flex-1 input input-bordered input-sm sm:input-md text-sm rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm sm:btn-md rounded-xl px-4 gap-1.5 shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs sm:loading-sm" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">Send</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIDiscussion;

