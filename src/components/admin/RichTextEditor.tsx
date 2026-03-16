import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Undo, 
  Redo 
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      disabled: !editor.can().chain().focus().toggleBold().run()
    },
    {
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run()
    },
    {
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run()
    },
    { divider: true },
    {
      icon: <Heading1 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 })
    },
    {
      icon: <Heading2 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 })
    },
    {
      icon: <span className="font-bold text-sm h-4 leading-4">P</span>,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph')
    },
    { divider: true },
    {
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList')
    },
    {
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList')
    },
    {
      icon: <Quote size={16} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote')
    },
    { divider: true },
    {
      icon: <Undo size={16} />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      isActive: false
    },
    {
      icon: <Redo size={16} />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
      isActive: false
    },
  ];

  return (
    <div className="border-b border-green-800/10 bg-green-50/30 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10 rounded-t-xl">
      {buttons.map((btn, index) => {
        if (btn.divider) {
          return <div key={`divider-${index}`} className="w-px h-6 bg-green-800/10 mx-1"></div>;
        }
        
        return (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              btn.onClick();
            }}
            disabled={btn.disabled}
            className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
              btn.isActive 
                ? 'bg-green-800 text-brand-primary' 
                : 'text-green-800/70 hover:bg-green-800/5 hover:text-green-800'
            } ${btn.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            type="button"
          >
            {btn.icon}
          </button>
        );
      })}
    </div>
  );
};

const RichTextEditor = ({ content, onChange, placeholder = "Write something amazing..." }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        }
      })
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 lg:p-6 text-green-800 max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-green-800/10 rounded-xl overflow-hidden bg-white focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-colors hover:border-green-800/20">
      <MenuBar editor={editor} />
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
