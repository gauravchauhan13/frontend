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

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Common responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return `Hello ${userData.name}! How can I assist you with your ${userRole === "admin" ? "administrative tasks" : userRole === "parent" ? "child's academic information" : "academic needs"} today?`;
    }

    // Role-specific responses
    switch (userRole) {
      case "student":
        if (lowerMessage.includes("attendance")) {
          return "Your current overall attendance is 85%. Would you like to see subject-wise breakdown or set attendance reminders?";
        }
        if (lowerMessage.includes("grades") || lowerMessage.includes("marks")) {
          return "Your current CGPA is 8.7. Your latest semester grades show excellent performance in most subjects. Would you like detailed grade reports?";
        }
        if (lowerMessage.includes("counseling") || lowerMessage.includes("counselling")) {
          return "I can help you book a session with Dr. Sarah Johnson, your academic counselor. Her next available slot is tomorrow at 2 PM. Shall I book it for you?";
        }
        if (lowerMessage.includes("reports")) {
          return "You have 4 reports available: Mid-Term Report, Assignment Grades, Attendance Report, and Performance Analytics. Which one would you like to download?";
        }
        break;

      case "parent":
        if (lowerMessage.includes("grades") || lowerMessage.includes("marks")) {
          return "Your child's current CGPA is 8.7 with good performance across subjects. The latest semester shows particular strength in Computer Science subjects.";
        }
        if (lowerMessage.includes("fees") || lowerMessage.includes("payment")) {
          return "All fee installments are up to date. The next payment of ₹62,500 is due on December 15, 2024. Would you like to view the detailed fee structure?";
        }
        if (lowerMessage.includes("attendance")) {
          return "Your child's overall attendance is 85%. There are 2 subjects with attendance below 80%. Would you like me to show the detailed breakdown?";
        }
        if (lowerMessage.includes("counselor") || lowerMessage.includes("teacher")) {
          return "You can contact Dr. Sarah Johnson (Academic Counselor) at s.johnson@upes.ac.in or schedule a parent-teacher meeting through the portal.";
        }
        break;

      case "admin":
        if (lowerMessage.includes("attendance")) {
          return "Today's overall attendance is 78% across all classes. 23 students are absent today. Would you like the detailed class-wise breakdown?";
        }
        if (lowerMessage.includes("fees") || lowerMessage.includes("pending")) {
          return "Currently, 45 students have pending fee payments totaling ₹28,12,500. 12 students have overdue payments. Shall I generate the defaulter list?";
        }
        if (lowerMessage.includes("report") || lowerMessage.includes("analytics")) {
          return "I can generate various reports: Academic Performance, Attendance Analytics, Fee Status, or Custom Reports. Which type do you need?";
        }
        if (lowerMessage.includes("students")) {
          return "Total enrolled students: 1,247. Active students: 1,203. Would you like specific information about any student or class?";
        }
        break;
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about that. Let me help you find the right information. Could you be more specific?",
      "That's a great question! I'd be happy to help. Can you provide more details about what you're looking for?",
      "I'm here to assist you. While I work on getting better responses, you can also contact support for immediate help."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response delay with typing indicator
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateBotResponse(inputValue),
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