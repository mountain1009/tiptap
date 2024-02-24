"use client";

import "./style.scss";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import YoutubeExtension from "@tiptap/extension-youtube";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Minus,
  UnderlineIcon,
  Youtube,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Tiptap = () => {
  const extensions = [StarterKit, Underline, TextAlign, YoutubeExtension];
  const content = "<p>Hello World! 🌎️</p>";

  return (
    <div className="max-w-[1200px] border w-full rounded-lg">
      <ToolBar />
      <EditorProvider
        slotBefore={<ToolBar />}
        extensions={extensions}
        content={content}
      >
        <div className="1"></div>
      </EditorProvider>
    </div>
  );
};

export const ToolBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const headingValue = useMemo(() => {
    if (editor.isActive("heading", { level: 1 })) {
      return "h1";
    }
    if (editor.isActive("heading", { level: 2 })) {
      return "h2";
    }
    if (editor.isActive("heading", { level: 3 })) {
      return "h3";
    }
    if (editor.isActive("heading", { level: 4 })) {
      return "h4";
    }
    if (editor.isActive("heading", { level: 5 })) {
      return "h5";
    }
    if (editor.isActive("paragraph")) {
      return "p";
    }
  }, [editor.state]);

  return (
    <div className="flex items-center p-4 border-b gap-3 flex-wrap">
      <Select
        onValueChange={(e: "h1" | "h2" | "h3" | "h4" | "h5" | "p") => {
          console.log(e);
          if (e === "h1") {
            editor.commands.toggleHeading({ level: 1 });
          }
          if (e === "h2") {
            editor.commands.toggleHeading({ level: 2 });
          }
          if (e === "h3") {
            editor.commands.toggleHeading({ level: 3 });
          }
          if (e === "h4") {
            editor.commands.toggleHeading({ level: 4 });
          }
          if (e === "h5") {
            editor.commands.toggleHeading({ level: 5 });
          }
          if (e === "p") {
            editor.commands.setParagraph();
          }
        }}
        value={headingValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="       " />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="h1" className="text-[24px]">
            見出し1
          </SelectItem>
          <SelectItem value="h2" className="text-[20px]">
            見出し2
          </SelectItem>
          <SelectItem value="h3" className="text-[16px]">
            見出し3
          </SelectItem>
          <SelectItem value="h4" className="text-[14px]">
            見出し4
          </SelectItem>
          <SelectItem value="h5" className="text-[12px]">
            見出し5
          </SelectItem>
          <SelectItem value="p" className="text-[14px]">
            段落
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={!editor.can().chain().focus().toggleBold().run()}
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-gray-200" : ""}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>太字</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-gray-200" : ""}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>斜体</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "bg-gray-200" : ""}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>下線</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().setTextAlign("left").run()
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
                }
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>左揃え</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().setTextAlign("center").run()
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
                }
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>中央揃え</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().setTextAlign("right").run()
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
                }
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>右揃え</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().setHorizontalRule().run()
                }
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className={editor.isActive("bold") ? "bg-gray-200" : ""}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>区切り線</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().toggleBulletList().run()
                }
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>リスト</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  !editor.can().chain().focus().toggleOrderedList().run()
                }
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>番号付きリスト</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon" onClick={addYoutubeVideo}>
                <Youtube className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Youtube動画</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
