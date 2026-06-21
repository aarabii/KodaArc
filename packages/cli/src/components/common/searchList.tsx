import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  TextAttributes,
  type InputRenderable,
  type ScrollBoxRenderable,
} from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useKeyboardLayer, useTheme } from "../../hooks";

const MAX_VISIBLE_ITEMS = 5;

type SearchListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  onHighlight?: (item: T) => void;
  onDelete?: (item: T) => void;
  filterFn: (item: T, q: string) => boolean;
  renderItem: (item: T, isSelected: boolean) => ReactNode;
  getKey: (item: T) => string;
  placeholder?: string;
  emptyText?: string;
};

export function SearchList<T>({
  items,
  onSelect,
  onHighlight,
  onDelete,
  filterFn,
  renderItem,
  getKey,
  placeholder = "Search",
  emptyText = "No results",
}: SearchListProps<T>) {
  const { colors } = useTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<InputRenderable>(null);
  const scrollRef = useRef<ScrollBoxRenderable>(null);
  const { isTopLayer } = useKeyboardLayer();

  const handleContentChange = useCallback(() => {
    const text = inputRef.current?.value ?? "";
    setSearchValue(text);
    setSelectedIdx(0);

    const scrollbox = scrollRef.current;
    if (scrollbox) {
      scrollbox.scrollTo(0);
    }
  }, []);

  const filtered = searchValue
    ? items.filter((item) => filterFn(item, searchValue))
    : items;

  useEffect(() => {
    if (selectedIdx >= filtered.length && filtered.length > 0) {
      setSelectedIdx(filtered.length - 1);
    }
  }, [filtered.length, selectedIdx]);

  const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);

  useKeyboard((key) => {
    if (!isTopLayer("dialog")) return;

    if (key.name === "return" || key.name === "enter") {
      const item = filtered[selectedIdx];
      if (item) {
        onSelect(item);
      }
    } else if (key.name === "delete") {
      const item = filtered[selectedIdx];
      if (item && onDelete) {
        onDelete(item);
      }
    } else if (key.name === "up") {
      setSelectedIdx((i) => {
        const newIdx = Math.max(0, i - 1);
        const sb = scrollRef.current;

        if (sb && newIdx < sb.scrollTop) {
          sb.scrollTo(newIdx);
        }

        const item = filtered[newIdx];
        if (item && onHighlight) onHighlight(item);
        return newIdx;
      });
    } else if (key.name === "down") {
      setSelectedIdx((i) => {
        const newIdx = Math.min(filtered.length - 1, i + 1);
        const sb = scrollRef.current;

        if (sb) {
          const viewPortHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewPortHeight - 1;

          if (newIdx > visibleEnd) {
            sb.scrollTo(newIdx - viewPortHeight + 1);
          }
        }

        const item = filtered[newIdx];
        if (item && onHighlight) onHighlight(item);

        return newIdx;
      });
    }
  });

  return (
    <box flexDirection="column" gap={1}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        focused
        onContentChange={handleContentChange}
      />
      {filtered.length === 0 ? (
        <text fg={colors.text.muted}>{emptyText}</text>
      ) : (
        <scrollbox ref={scrollRef} height={visibleHeight}>
          {filtered.map((item, i) => {
            const isSelected = i === selectedIdx;
            return (
              <box
                key={getKey(item)}
                flexDirection="row"
                height={1}
                overflow="hidden"
                backgroundColor={isSelected ? colors.selection.bg : undefined}
                onMouseMove={() => {
                  setSelectedIdx(i);
                  if (onHighlight) onHighlight(item);
                }}
                onMouseDown={() => onSelect(item)}
              >
                {renderItem(item, isSelected)}
              </box>
            );
          })}
        </scrollbox>
      )}
    </box>
  );
}
