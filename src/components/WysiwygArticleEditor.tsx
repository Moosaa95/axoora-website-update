'use client';

import React, { useState, useRef } from 'react';
import { List, Quote, Code, Link2, Eye, Columns, Sparkles, FileText } from 'lucide-react';

interface WysiwygArticleEditorProps {
  content: string;
  onChange: (val: string) => void;
  title?: string;
  category?: string;
  author?: string;
  readTime?: string;
  date?: string;
  summary?: string;
}

export const WysiwygArticleEditor: React.FC<WysiwygArticleEditorProps> = ({
  content,
  onChange,
  title,
  category = 'Engineering',
  author = 'Axoora Editorial Board',
  readTime = '4 min read',
  date = 'Oct 2026',
  summary = '',
}) => {
  const [activeView, setActiveView] = useState<'write' | 'preview' | 'split'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert markdown tokens at cursor or around selected text
  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || defaultPlaceholder;
    const replacement = `${prefix}${textToInsert}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    onChange(newContent);

    // Reposition cursor after update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  // Convert markdown/text to clean HTML elements for live WYSIWYG preview
  const renderFormattedPreview = (rawText: string) => {
    if (!rawText.trim()) {
      return (
        <div className="py-12 text-center text-[#7B9CD2] text-xs italic">
          No body content written yet. Switch to &quot;Write&quot; mode to draft your article.
        </div>
      );
    }

    const lines = rawText.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = (keyPrefix: number) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${keyPrefix}`} className="list-disc list-inside space-y-1.5 my-3 text-sm text-[#CAD5E8] leading-relaxed pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        inList = false;
        listItems = [];
      }
    };

    const formatInline = (text: string): string => {
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      // Bold **text**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
      // Italic *text*
      formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-[#53a8f5]">$1</em>');
      // Inline code `code`
      formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#020F2E] border border-[#162C5B] text-[#53a8f5] font-mono text-xs">$1</code>');
      // Links [text](url)
      formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#53a8f5] hover:underline font-semibold">$1</a>');
      return formatted;
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(trimmed.substring(2));
        return;
      }

      flushList(i);

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg font-bold text-white mt-5 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#0976da]" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(4)) }} />
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl font-extrabold text-[#F2F5F9] mt-6 mb-3 border-b border-[#162C5B] pb-1.5 flex items-center gap-2">
            <span className="w-2 h-5 rounded-full bg-[#043e97]" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(3)) }} />
          </h2>
        );
      } else if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl font-black text-white mt-7 mb-4">
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(2)) }} />
          </h1>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote
            key={i}
            className="my-3 pl-4 border-l-2 border-[#0976da] bg-[#043e97]/10 py-2.5 pr-3 rounded-r-xl italic text-sm text-[#CAD5E8]"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(2)) }}
          />
        );
      } else if (trimmed.startsWith('```')) {
        elements.push(
          <div key={i} className="my-2 py-1 px-3 font-mono text-xs text-[#53a8f5] bg-[#020F2E] rounded border border-[#162C5B]">
            [Code Block]
          </div>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={i} className="my-5 border-[#162C5B]" />);
      } else if (trimmed.length > 0) {
        elements.push(
          <p
            key={i}
            className="my-2.5 text-sm text-[#CAD5E8] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      }
    });

    flushList(lines.length);

    return <div className="space-y-1">{elements}</div>;
  };

  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {/* Top Toolbar Header with View Switcher */}
      <div className="flex items-center justify-between bg-[#071739] border border-[#162C5B] rounded-t-xl px-3 py-2">
        {/* Formatting Buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => insertFormatting('**', '**', 'bold text')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs font-bold text-white border border-[#162C5B] cursor-pointer transition-colors"
            title="Bold (**text**)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('*', '*', 'italic text')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs italic text-white border border-[#162C5B] cursor-pointer transition-colors"
            title="Italic (*text*)"
          >
            I
          </button>
          <div className="h-4 w-px bg-[#162C5B] mx-0.5" />
          <button
            type="button"
            onClick={() => insertFormatting('## ', '', 'Section Heading')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs font-bold text-[#53a8f5] border border-[#162C5B] cursor-pointer transition-colors"
            title="Heading 2 (## Heading)"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('### ', '', 'Sub-heading')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs font-bold text-[#93c5fd] border border-[#162C5B] cursor-pointer transition-colors"
            title="Heading 3 (### Sub-heading)"
          >
            H3
          </button>
          <div className="h-4 w-px bg-[#162C5B] mx-0.5" />
          <button
            type="button"
            onClick={() => insertFormatting('- ', '', 'Bullet item')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs text-white border border-[#162C5B] cursor-pointer flex items-center gap-1 transition-colors"
            title="Bullet list"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('> ', '', 'Important quote or take-away')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs text-white border border-[#162C5B] cursor-pointer flex items-center gap-1 transition-colors"
            title="Quote (> blockquote)"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('`', '`', 'code')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs font-mono text-[#53a8f5] border border-[#162C5B] cursor-pointer transition-colors flex items-center gap-1"
            title="Inline Code (`code`)"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('[', '](https://axoora.ai)', 'Link text')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs text-[#53a8f5] border border-[#162C5B] cursor-pointer flex items-center gap-1 transition-colors"
            title="Insert Link"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('\n---\n')}
            className="px-2.5 py-1 rounded-lg bg-[#020F2E] hover:bg-[#162C5B] text-xs text-[#7B9CD2] border border-[#162C5B] cursor-pointer transition-colors"
            title="Horizontal Divider"
          >
            ―
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#020F2E] p-1 rounded-lg border border-[#162C5B]">
          <button
            type="button"
            onClick={() => setActiveView('write')}
            className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
              activeView === 'write'
                ? 'bg-[#043e97] text-white shadow'
                : 'text-[#A8BBD6] hover:text-white'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveView('preview')}
            className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeView === 'preview'
                ? 'bg-[#0976da] text-white font-bold shadow'
                : 'text-[#A8BBD6] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('split')}
            className={`hidden md:inline-flex px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all items-center gap-1.5 ${
              activeView === 'split'
                ? 'bg-[#162C5B] text-white border border-[#53a8f5]/40'
                : 'text-[#A8BBD6] hover:text-white'
            }`}
            title="Side-by-side editing and live render"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
        </div>
      </div>

      {/* Main Body Area */}
      {activeView === 'write' && (
        <textarea
          ref={textareaRef}
          rows={10}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Draft your full journal article body here using markdown (supports ## Headings, **bold**, lists, and quotes)..."
          className="w-full px-4 py-3 rounded-b-xl bg-[#020F2E] border border-[#162C5B] text-xs font-mono text-white leading-relaxed focus:outline-none focus:border-[#53a8f5] resize-y min-h-[220px]"
        />
      )}

      {activeView === 'preview' && (
        <div className="w-full p-5 rounded-b-xl bg-[#020F2E] border border-[#162C5B] min-h-[220px] max-h-[380px] overflow-y-auto">
          {renderFormattedPreview(content)}
        </div>
      )}

      {activeView === 'split' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <textarea
            ref={textareaRef}
            rows={10}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Draft your article body here..."
            className="w-full px-4 py-3 rounded-b-xl bg-[#020F2E] border border-[#162C5B] text-xs font-mono text-white leading-relaxed focus:outline-none focus:border-[#53a8f5] resize-y min-h-[220px]"
          />
          <div className="w-full p-4 rounded-b-xl bg-[#071739] border border-[#162C5B] min-h-[220px] max-h-[340px] overflow-y-auto">
            <div className="text-[10px] font-mono text-[#53a8f5] uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Real-Time Article Render</span>
            </div>
            {renderFormattedPreview(content)}
          </div>
        </div>
      )}

      {/* Website Card Preview (What it looks like on live website) */}
      {title && (
        <div className="mt-2 p-4 rounded-xl bg-[#071739] border border-[#162C5B] flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#7B9CD2]">
            <span className="uppercase tracking-wider font-semibold text-[#53a8f5] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Website Card Render (WYSIWYG)</span>
            </span>
            <span>{date} • {readTime}</span>
          </div>

          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#043e97]/20 border border-[#043e97]/40 text-[#53a8f5] text-[10px] font-bold uppercase tracking-wider">
                {category}
              </span>
              <span className="text-xs text-[#A8BBD6]">By {author}</span>
            </div>
            <h4 className="text-sm font-bold text-white line-clamp-2">{title}</h4>
            {summary && <p className="text-xs text-[#A8BBD6] line-clamp-2 mt-0.5 leading-relaxed">{summary}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
