'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

interface MenuBarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  title: string;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title
  }: ToolbarButtonProps) => (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded transition-colors text-sm font-medium ${
        active ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
      }`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  const setLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2 flex items-center gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <span className="font-bold">B</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <span className="italic">I</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline"
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={setLink}
        active={editor.isActive('link')}
        title="Link"
      >
        🔗
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading"
      >
        Heading
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Subheading"
      >
        Subheading
      </ToolbarButton>

      <div className="flex-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        ⬅️
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        ↔️
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        ➡️
      </ToolbarButton>
    </div>
  );
};

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function ContentEditor({
  content,
  onChange
}: ContentEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose max-w-none focus:outline-none min-h-[250px] px-6 py-4 text-gray-700'
      }
    }
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <label className="text-lg font-semibold text-gray-900">Content</label>
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
