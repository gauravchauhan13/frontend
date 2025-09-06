import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";
import { UserRole } from "./Login";

interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  userRole: UserRole;
  userData: any;
}

export function Chatbot({ userRole, userData }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize welcome message on first load
  useEffect(() => {
    if (!hasInitialized && userData.name) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        message: `Hello ${userData.name}! I'm your EvolvEd assistant. How can I help you today?`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setHasInitialized(true);
    }
  }, [userData.name, hasInitialized]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    if (hasInitialized) {
      const savedMessages = localStorage.getItem(`chatbot-messages-${userRole}-${userData.id || 'default'}`);
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (error) {
          console.warn('Failed to load chat history:', error);
        }
      }
    }
  }, [userRole, userData.id, hasInitialized]);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 1) { // Don't save if only welcome message exists
      localStorage.setItem(
        `chatbot-messages-${userRole}-${userData.id || 'default'}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, userRole, userData.id]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close chatbot
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      // Ctrl/Cmd + / to toggle chatbot
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Show typing indicator effect
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Clear chat history function (can be called externally)
  const clearChatHistory = () => {
    localStorage.removeItem(`chatbot-messages-${userRole}-${userData.id || 'default'}`);
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      message: `Hello ${userData.name}! I'm your EvolvEd assistant. How can I help you today?`,
      sender: "bot",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const getQuickActions = () => {
    switch (userRole) {
      case "student":
        return [
          "What's my attendance?",
          "Show my grades",
          "Book counseling session",
          "View my reports"
        ];
      case "parent":
        return [
          "What are my child's grades?",
          "Check fee status",
          "View attendance",
          "Contact counselor"
        ];
      case "admin":
        return [
          "Today's attendance report",
          "Students with pending fees",
          "Generate grade report",
          "View system analytics"
        ];
      default:
        return [];
    }
  };

  let input=useRef("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/123");
    setSocket(ws);
    

     ws.onmessage = (event) => {
      input.current =event.data ;
    };
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  },[]);
   
  



  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    socket.send(inputValue);


    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response delay with typing indicator
    setTimeout(() => {
      ;
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: input.current,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: action,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response delay with typing indicator
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateBotResponse(action),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-primary hover:bg-gradient-primary-hover glow-hover transition-all duration-300 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-80 h-96 bg-card/95 backdrop-blur-sm border-border/50 glow shadow-2xl">
            <CardHeader className="pb-3 bg-gradient-primary rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  EvolvEd Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white/80 text-xs">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Support
              </p>
            </CardHeader>
            
            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-gradient-primary" 
                        : "bg-secondary"
                    }`}>
                      {message.sender === "user" ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-gradient-primary text-white"
                          : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      <p>{message.message}</p>
                      <span className={`text-xs opacity-70 ${
                        message.sender === "user" ? "text-white" : "text-muted-foreground"
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary">
                      <Bot className="h-3 w-3 text-foreground" />
                    </div>
                    <div className="bg-secondary/50 text-foreground px-3 py-2 rounded-lg text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-1">
                    {getQuickActions().map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="text-xs h-8 border-border/50 hover:bg-accent/50 text-left justify-start p-2"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="h-8 text-sm border-border/50 bg-input/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="h-8 w-8 p-0 bg-gradient-primary hover:bg-gradient-primary-hover"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}