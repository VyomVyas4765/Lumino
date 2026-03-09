import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/Projects/StudentDashboard/components/ui/button';
import { Input } from '@/Projects/StudentDashboard/components/ui/input';
import { cn } from '@/Projects/StudentDashboard/lib/utils';
import { useLearning } from '@/Projects/StudentDashboard/contexts/LearningContext';
import { getSessionUser } from '@/lib/auth';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

const now = () => new Date().toISOString();

const buildInitialMessage = (firstName: string): Message => ({
  id: 'welcome',
  role: 'assistant',
  content:
    `Hi ${firstName}! I am Lumio AI. Ask me to explain concepts, recommend lessons, create a quiz, or give a study plan.`,
  timestamp: now(),
});

const buildQuiz = (topic: string) => {
  const t = topic || 'your current topic';
  return [
    `Quick quiz on ${t}:`,
    `1) What is the core idea behind ${t}?`,
    `2) Give one real-world use case of ${t}.`,
    `3) What is one common mistake learners make with ${t}?`,
    `Reply with your answers and I will give feedback.`,
  ].join('\n');
};

const normalize = (value: string) => value.trim().toLowerCase();

const extractTopic = (text: string) => {
  const clean = text.trim();
  const match = clean.match(/(?:about|on|for)\s+(.+)$/i);
  return (match?.[1] || clean).replace(/[?.!]+$/, '').trim();
};

const looksLikeMathQuestion = (text: string) => {
  const lower = normalize(text);
  return (
    /\d/.test(lower) ||
    /(what is|calculate|solve|times|multiplied|plus|minus|divided|power)/.test(lower)
  );
};

const toMathExpression = (text: string) => {
  let expr = normalize(text)
    .replace(/what is|calculate|solve|answer|equals|=|\?/g, ' ')
    .replace(/to the power of|power of/g, '^')
    .replace(/multiplied by|times/g, '*')
    .replace(/divided by|over/g, '/')
    .replace(/plus/g, '+')
    .replace(/minus/g, '-')
    .replace(/x/g, '*')
    .replace(/\s+/g, ' ')
    .trim();

  // Keep only safe math characters.
  expr = expr.replace(/[^0-9+\-*/().^ ]/g, '').replace(/\s+/g, '');
  return expr;
};

const evaluateMathExpression = (expression: string): number | null => {
  if (!expression) return null;
  if (!/^[0-9+\-*/().^]+$/.test(expression)) return null;

  const tokens = expression.match(/\d+(?:\.\d+)?|[()+\-*/^]/g);
  if (!tokens) return null;

  const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
  const rightAssociative = new Set(['^']);
  const output: string[] = [];
  const ops: string[] = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (/^\d/.test(token)) {
      output.push(token);
      continue;
    }

    if (token === '(') {
      ops.push(token);
      continue;
    }

    if (token === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') {
        output.push(ops.pop() as string);
      }
      if (!ops.length) return null;
      ops.pop();
      continue;
    }

    if (precedence[token] !== undefined) {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top === '(') break;
        const currentPrec = precedence[token];
        const topPrec = precedence[top];
        if (
          topPrec > currentPrec ||
          (topPrec === currentPrec && !rightAssociative.has(token))
        ) {
          output.push(ops.pop() as string);
        } else {
          break;
        }
      }
      ops.push(token);
      continue;
    }

    return null;
  }

  while (ops.length) {
    const op = ops.pop() as string;
    if (op === '(' || op === ')') return null;
    output.push(op);
  }

  const stack: number[] = [];
  for (const token of output) {
    if (/^\d/.test(token)) {
      stack.push(Number(token));
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();
    if (a === undefined || b === undefined) return null;

    let result = 0;
    if (token === '+') result = a + b;
    else if (token === '-') result = a - b;
    else if (token === '*') result = a * b;
    else if (token === '/') {
      if (b === 0) return null;
      result = a / b;
    } else if (token === '^') result = a ** b;
    else return null;

    stack.push(result);
  }

  if (stack.length !== 1 || !Number.isFinite(stack[0])) return null;
  return stack[0];
};

const generateTutorResponse = (input: string, context: {
  firstName: string;
  streak: number;
  inProgress: { title: string; progress: number }[];
  notStarted: { title: string; category: string }[];
}) => {
  const lower = normalize(input);

  if (!lower) {
    return 'Send a question and I will help right away.';
  }

  if (looksLikeMathQuestion(input)) {
    const expression = toMathExpression(input);
    const result = evaluateMathExpression(expression);
    if (result !== null) {
      const cleanResult = Number.isInteger(result) ? String(result) : result.toFixed(6).replace(/\.?0+$/, '');
      return `The answer is ${cleanResult}.`;
    }
  }

  if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi' || lower === 'hey') {
    return `Hi ${context.firstName}. You are on a ${context.streak}-day streak. Want a 20-minute study plan for today?`;
  }

  if (lower.includes('progress') || lower.includes('streak')) {
    const active = context.inProgress[0];
    if (active) {
      return `You are on a ${context.streak}-day streak. Your top in-progress lesson is "${active.title}" at ${active.progress}%. Finish that first, then start one new lesson.`;
    }
    return `You are on a ${context.streak}-day streak. You currently have no in-progress lessons, so start one new lesson to keep momentum.`;
  }

  if (lower.includes('recommend') || lower.includes('next lesson') || lower.includes('what should i study')) {
    const picks = context.notStarted.slice(0, 3);
    if (picks.length === 0) {
      return 'You have already started all available lessons. Continue your active lesson and review completed ones for mastery.';
    }

    const lines = picks.map((lesson, index) => `${index + 1}. ${lesson.title} (${lesson.category})`);
    return ['Recommended next lessons:', ...lines, 'Pick one and I will make a mini study plan.'].join('\n');
  }

  if (lower.includes('quiz')) {
    const topic = extractTopic(input.replace(/quiz me/i, '').replace(/quiz/i, '').trim());
    return buildQuiz(topic || 'this topic');
  }

  if (lower.startsWith('summarize:') || lower.startsWith('summarise:')) {
    const text = input.split(':').slice(1).join(':').trim();
    if (!text) return 'Add text after "summarize:" and I will condense it.';

    const words = text.split(/\s+/).filter(Boolean);
    const short = words.slice(0, 36).join(' ');
    return `Summary: ${short}${words.length > 36 ? '...' : ''}`;
  }

  if (lower.includes('explain')) {
    const topic = extractTopic(input.replace(/explain/i, '').trim());
    const t = topic || 'this concept';
    return [
      `Simple explanation of ${t}:`,
      `- What it is: the main idea in one line.`,
      `- Why it matters: where you use it in real problems.`,
      `- How to apply it: follow example -> practice -> self-test.`,
      `If you share the exact chapter/question, I will tailor this.`
    ].join('\n');
  }

  return [
    'I can help with:',
    '- "recommend next lesson"',
    '- "quiz me on linear equations"',
    '- "explain recursion"',
    '- "summarize: <your text>"',
    '- "show my progress"',
  ].join('\n');
};

export function AIChatbot() {
  const { lessons, userProgress } = useLearning();
  const sessionUser = getSessionUser();
  const firstName = sessionUser?.name?.trim().split(/\s+/)[0] || 'Learner';

  const storageKey = useMemo(
    () => `lumio_chat_v1_${sessionUser?.id || 'guest'}`,
    [sessionUser?.id]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([buildInitialMessage(firstName)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const inProgress = useMemo(
    () => lessons.filter((l) => l.progress > 0 && !l.isCompleted).map((l) => ({ title: l.title, progress: l.progress })),
    [lessons]
  );

  const notStarted = useMemo(
    () => lessons.filter((l) => l.progress === 0).map((l) => ({ title: l.title, category: l.category })),
    [lessons]
  );

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      setMessages([buildInitialMessage(firstName)]);
      return;
    }

    try {
      const saved = JSON.parse(raw) as Message[];
      if (Array.isArray(saved) && saved.length > 0) {
        setMessages(saved);
      } else {
        setMessages([buildInitialMessage(firstName)]);
      }
    } catch {
      setMessages([buildInitialMessage(firstName)]);
    }
  }, [firstName, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText,
      timestamp: now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    window.setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: generateTutorResponse(userText, {
          firstName,
          streak: userProgress.streak,
          inProgress,
          notStarted,
        }),
        timestamp: now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 650);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary transition-all duration-300 hover:scale-110 z-40',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageSquare className="w-6 h-6 text-primary-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
      </button>

      <div
        className={cn(
          'fixed bottom-6 right-6 w-[22rem] sm:w-96 h-[32rem] glass-card rounded-2xl shadow-elevated flex flex-col overflow-hidden transition-all duration-300 z-50',
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        )}
      >
        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Lumio AI</h3>
                <p className="text-xs text-muted-foreground">Your learning assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex gap-3 animate-fade-in', message.role === 'user' && 'flex-row-reverse')}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  message.role === 'assistant' ? 'bg-gradient-primary' : 'bg-gradient-xp'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <User className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap',
                  message.role === 'assistant'
                    ? 'bg-muted text-foreground rounded-tl-sm'
                    : 'bg-gradient-primary text-primary-foreground rounded-tr-sm'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-primary hover:opacity-90 shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
