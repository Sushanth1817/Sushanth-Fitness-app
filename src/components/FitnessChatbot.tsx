import { useState, useCallback, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useConversation } from "@elevenlabs/react";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fitness-chat`;

const FitnessChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Sushanth's AI assistant. Ask me anything about personal training, pricing, or services! 💪" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [voiceConfigured, setVoiceConfigured] = useState(false);
  const [agentId, setAgentId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => console.log("Voice connected"),
    onDisconnect: () => console.log("Voice disconnected"),
    onError: (error) => console.error("Voice error:", error),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(updatedMessages.filter(m => m.role !== "assistant" || updatedMessages.indexOf(m) !== 0));
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process that. Please try again or contact Sushanth directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoice = useCallback(async () => {
    if (!agentId) {
      setVoiceConfigured(false);
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-voice-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ agentId }),
      });

      const data = await resp.json();
      if (!data.token) {
        console.error("No token received");
        return;
      }

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Voice start failed:", error);
    }
  }, [conversation, agentId]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform",
          isOpen && "hidden"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Fitness Assistant</h3>
                <p className="text-xs opacity-80">Ask me anything!</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setMode("text")}
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors",
                mode === "text" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              💬 Text Chat
            </button>
            <button
              onClick={() => setMode("voice")}
              className={cn(
                "flex-1 py-2 text-sm font-medium transition-colors",
                mode === "voice" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
              )}
            >
              🎙️ Voice
            </button>
          </div>

          {/* Content */}
          {mode === "text" ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                        : "bg-secondary text-secondary-foreground mr-auto rounded-bl-md"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Typing...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about training, pricing..."
                    className="flex-1 bg-secondary border-0"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            /* Voice Mode */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {!voiceConfigured ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Voice Agent Setup</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your ElevenLabs Agent ID to enable voice chat
                    </p>
                    <Input
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                      placeholder="ElevenLabs Agent ID"
                      className="mb-3 bg-secondary"
                    />
                    <Button onClick={() => agentId && setVoiceConfigured(true)} disabled={!agentId}>
                      Enable Voice
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all",
                    conversation.status === "connected"
                      ? conversation.isSpeaking
                        ? "bg-primary animate-pulse"
                        : "bg-primary/80"
                      : "bg-secondary"
                  )}>
                    {conversation.status === "connected" ? (
                      conversation.isSpeaking ? (
                        <Volume2 className="w-10 h-10 text-primary-foreground" />
                      ) : (
                        <Mic className="w-10 h-10 text-primary-foreground" />
                      )
                    ) : (
                      <MicOff className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {conversation.status === "connected"
                        ? conversation.isSpeaking
                          ? "Assistant speaking..."
                          : "Listening..."
                        : "Voice chat ready"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {conversation.status === "connected"
                        ? "Speak naturally to chat"
                        : "Click to start voice conversation"}
                    </p>
                  </div>

                  {conversation.status === "connected" ? (
                    <Button variant="destructive" onClick={stopVoice}>
                      <MicOff className="w-4 h-4 mr-2" />
                      End Voice Chat
                    </Button>
                  ) : (
                    <Button onClick={startVoice}>
                      <Mic className="w-4 h-4 mr-2" />
                      Start Voice Chat
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FitnessChatbot;
